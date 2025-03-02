import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Early Detection Saves Lives
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Our AI-powered skin cancer detection tool helps identify potential skin conditions with advanced image analysis technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/detect" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
              Try Skin Cancer Detection
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-gray-50 transition-colors shadow-lg">
              Learn More
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Fast Analysis</h3>
              <p className="text-gray-600 text-center">
                Get results in seconds with our advanced AI model trained on thousands of clinical images.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Detailed Information</h3>
              <p className="text-gray-600 text-center">
                Receive comprehensive information about detected skin conditions and recommended next steps.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Private & Secure</h3>
              <p className="text-gray-600 text-center">
                Your images are processed securely and never stored without your permission.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

