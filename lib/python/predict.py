import sys
import torch
import json
from model_utils import get_model_instance

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Invalid arguments. Usage: predict.py <model_path> <image_path> [metadata_json]"}))
        return
    
    model_path = sys.argv[1]
    image_path = sys.argv[2]
    
    # Parse metadata if provided
    metadata = None
    if len(sys.argv) > 3:
        try:
            metadata = json.loads(sys.argv[3])
        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid metadata JSON format"}))
            return
    
    try:
        # Load image
        with open(image_path, 'rb') as f:
            image_bytes = f.read()
        
        # Get model instance
        print("Loading model...", file=sys.stderr)
        model = get_model_instance(model_path)
        print("Model loaded successfully", file=sys.stderr)
        
        # Check if model supports metadata
        metadata_supported = hasattr(model, 'uses_metadata') and model.uses_metadata
        print(f"Model metadata support: {metadata_supported}", file=sys.stderr)
        
        # Make prediction
        print("Making prediction...", file=sys.stderr)
        result = model.predict(image_bytes, metadata)
        print("Prediction completed", file=sys.stderr)
        
        # Add metadata support info to result
        if isinstance(result, dict) and not 'error' in result:
            result['metadata_supported'] = metadata_supported
        
        # Return result as JSON
        print(json.dumps(result))
    except Exception as e:
        print(f"Error during prediction: {e}", file=sys.stderr)
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main() 