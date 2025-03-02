import ImageUploader from '@/components/ImageUploader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function DetectPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Skin Cancer Detection Tool</h1>
            <p className="text-gray-700 mb-6">
              Upload an image of a skin lesion to get an AI-powered prediction about the likelihood of melanoma and other skin cancer types.
              This tool is for educational purposes only and should not replace professional medical advice.
            </p>
            
            <div className="p-4 bg-blue-50 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-2 text-blue-800">How to Use</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Upload a clear image of the skin lesion</li>
                <li>Optionally include patient metadata for more accurate results</li>
                <li>Click "Analyze Image" to get predictions</li>
                <li>Review the results and detailed information about detected conditions</li>
              </ol>
            </div>
          </div>
          
          <ImageUploader />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 