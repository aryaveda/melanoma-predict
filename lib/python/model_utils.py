import torch
import torchvision.transforms as transforms
from PIL import Image
import os
import sys
import io
import numpy as np

# Swish activation function dari kode pelatihan
class Swish(torch.autograd.Function):
    @staticmethod
    def forward(ctx, i):
        result = i * torch.sigmoid(i)
        ctx.save_for_backward(i)
        return result
    
    @staticmethod
    def backward(ctx, grad_output):
        i = ctx.saved_variables[0]
        sigmoid_i = torch.sigmoid(i)
        return grad_output * (sigmoid_i * (1 + i * (1 - sigmoid_i)))

swish = Swish.apply

class Swish_module(torch.nn.Module):
    def forward(self, x):
        return swish(x)

# Coba import geffnet, jika tidak ada gunakan model lain
try:
    import geffnet
    has_geffnet = True
except ImportError:
    has_geffnet = False
    print("Warning: geffnet not found, using fallback model loading method", file=sys.stderr)

# Definisi nama kelas untuk model
CLASS_NAMES = ["BKL", "DF", "melanoma", "nevus", "SCC", "VASC", "AK", "BCC", "unknown"]

class MelanomaModel:
    def __init__(self, model_path):
        """
        Inisialisasi model melanoma
        
        Args:
            model_path: Path ke file model yang akan diload
        """
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = self.load_model(model_path)
        self.transform = self.get_transforms()
        self.uses_metadata = False  # Will be set in load_model
        
        # Daftar lokasi anatomi yang mungkin
        self.anatom_sites = [
            'head/neck', 'oral/genital', 'palms/soles', 
            'torso', 'upper extremity', 'lower extremity',
            'unknown'
        ]

    def load_model(self, model_path):
        """
        Load model dari path yang diberikan
        """
        if has_geffnet:
            # Jika geffnet tersedia, gunakan cara yang sama dengan kode pelatihan
            from torch import nn
            
            class enetv2(nn.Module):
                def __init__(self, backbone, out_dim, n_meta_features=0):
                    super(enetv2, self).__init__()
                    self.n_meta_features = n_meta_features
                    self.enet = geffnet.create_model(backbone.replace('-', '_'), pretrained=False)
                    self.dropout = nn.Dropout(0.5)
                    in_ch = self.enet.classifier.in_features
                    if n_meta_features > 0:
                        self.meta = nn.Sequential(
                            nn.Linear(n_meta_features, 512),
                            nn.BatchNorm1d(512),
                            Swish_module(),
                            nn.Dropout(p=0.3),
                            nn.Linear(512, 128),
                            nn.BatchNorm1d(128),
                            Swish_module(),
                        )
                        in_ch += 128
                    self.myfc = nn.Linear(in_ch, out_dim)
                    self.enet.classifier = nn.Identity()

                def extract(self, x):
                    x = self.enet(x)
                    return x

                def forward(self, x, x_meta=None):
                    x = self.extract(x).squeeze(-1).squeeze(-1)
                    if self.n_meta_features > 0 and x_meta is not None:
                        x_meta = self.meta(x_meta)
                        x = torch.cat((x, x_meta), dim=1)
                    x = self.myfc(self.dropout(x))
                    return x
            
            # Coba load model dengan metadata terlebih dahulu
            try:
                # Buat model dengan metadata
                model = enetv2('efficientnet-b3', out_dim=len(CLASS_NAMES), n_meta_features=11)
                state_dict = torch.load(model_path, map_location=self.device)
                model.load_state_dict(state_dict)
                self.uses_metadata = True
                print("Loaded model with metadata support", file=sys.stderr)
                return model.to(self.device)
            except Exception as e:
                print(f"Failed to load model with metadata: {e}", file=sys.stderr)
                print("Trying to load model without metadata...", file=sys.stderr)
                
                # Jika gagal, coba load model tanpa metadata
                model = enetv2('efficientnet-b3', out_dim=len(CLASS_NAMES), n_meta_features=0)
                state_dict = torch.load(model_path, map_location=self.device)
                model.load_state_dict(state_dict)
                self.uses_metadata = False
                print("Loaded model without metadata support", file=sys.stderr)
                return model.to(self.device)
        else:
            # Fallback: load model langsung
            model = torch.load(model_path, map_location=self.device)
            # Cek apakah model memiliki atribut n_meta_features
            if hasattr(model, 'n_meta_features') and model.n_meta_features > 0:
                self.uses_metadata = True
            return model
    
    def prepare_metadata(self, metadata):
        """
        Menyiapkan metadata untuk input model
        
        Args:
            metadata: Dictionary dengan metadata (sex, age_approx, anatom_site_general)
            
        Returns:
            Tensor metadata yang siap digunakan model
        """
        # Default values
        sex = -1  # -1 for unknown, 0 for female, 1 for male
        age_approx = 0  # normalized by 90
        n_images = 1  # log1p of number of images
        image_size = 0  # log of image size (we'll use a default value)
        
        # Parse metadata
        if metadata:
            if 'sex' in metadata:
                if metadata['sex'].lower() == 'male':
                    sex = 1
                elif metadata['sex'].lower() == 'female':
                    sex = 0
            
            if 'age_approx' in metadata and metadata['age_approx']:
                try:
                    age = float(metadata['age_approx'])
                    age_approx = min(age / 90.0, 1.0)  # normalize by 90 as in training
                except (ValueError, TypeError):
                    pass
        
        # One-hot encoding untuk anatom_site
        anatom_site_onehot = [0] * len(self.anatom_sites)
        
        if metadata and 'anatom_site_general' in metadata and metadata['anatom_site_general']:
            site = metadata['anatom_site_general'].lower()
            if site in self.anatom_sites:
                anatom_site_onehot[self.anatom_sites.index(site)] = 1
            else:
                # If not found, mark as unknown
                anatom_site_onehot[self.anatom_sites.index('unknown')] = 1
        else:
            # If no metadata, mark anatom_site as unknown
            anatom_site_onehot[self.anatom_sites.index('unknown')] = 1
        
        # Combine all features sesuai urutan training
        meta_features = [sex, age_approx, n_images, image_size] + anatom_site_onehot
        
        return torch.tensor([meta_features], dtype=torch.float32).to(self.device)
    
    def predict(self, image_bytes, metadata=None):
        """
        Make prediction on an image with optional metadata
        
        Args:
            image_bytes: Image as bytes
            metadata: Optional dictionary with metadata (sex, age_approx, anatom_site_general)
            
        Returns:
            Dictionary with prediction results
        """
        try:
            # Open image from bytes
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            
            # Apply transformations
            image_tensor = self.transform(image).unsqueeze(0).to(self.device)
            
            # Prepare metadata if provided and model supports it
            meta_tensor = None
            if self.uses_metadata and metadata:
                meta_tensor = self.prepare_metadata(metadata)
            
            # Make prediction
            with torch.no_grad():
                if self.uses_metadata and meta_tensor is not None:
                    outputs = self.model(image_tensor, meta_tensor)
                else:
                    outputs = self.model(image_tensor)
                
                # Untuk model multi-class (9 kelas sesuai kode pelatihan)
                if isinstance(outputs, torch.Tensor):
                    # Gunakan softmax untuk multi-class
                    probabilities = torch.nn.functional.softmax(outputs, dim=1).cpu().numpy()[0]
                    
                    # Ambil indeks melanoma (sesuai dengan mel_idx di kode pelatihan)
                    # Berdasarkan kode pelatihan, melanoma adalah salah satu kelas
                    mel_idx = CLASS_NAMES.index("melanoma")
                    
                    melanoma_prob = float(probabilities[mel_idx])
                    prediction = "Melanoma" if melanoma_prob > 0.5 else "Non-Melanoma"
                    confidence = melanoma_prob if melanoma_prob > 0.5 else 1 - melanoma_prob
                    
                    # Buat dictionary untuk semua kelas
                    all_probs = {CLASS_NAMES[i]: float(probabilities[i]) for i in range(len(CLASS_NAMES))}
                    
                    # Temukan kelas dengan probabilitas tertinggi
                    max_prob_idx = np.argmax(probabilities)
                    max_prob_class = CLASS_NAMES[max_prob_idx]
                    
                    # Jika kelas dengan probabilitas tertinggi bukan melanoma, gunakan itu sebagai prediksi
                    if max_prob_idx != mel_idx and probabilities[max_prob_idx] > 0.5:
                        prediction = max_prob_class.upper()
                        confidence = float(probabilities[max_prob_idx])
                    
                    return {
                        "prediction": prediction,
                        "confidence": float(confidence),
                        "probabilities": {
                            "melanoma": float(melanoma_prob),
                            "non_melanoma": float(1 - melanoma_prob)
                        },
                        "all_probabilities": all_probs,
                        "metadata_used": self.uses_metadata and metadata is not None
                    }
        except Exception as e:
            return {"error": str(e)}

# Singleton instance
_model_instance = None

def get_model_instance(model_path=None):
    """
    Get or create the model instance
    """
    global _model_instance
    
    if _model_instance is None and model_path is not None:
        _model_instance = MelanomaModel(model_path)
    
    return _model_instance 