import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Main Content */}
      <main className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About the Developer</h1>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:shrink-0 bg-blue-100 flex items-center justify-center p-6">
                <div className="w-48 h-48 rounded-full bg-blue-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Name</h2>
                <p className="text-gray-600 mb-4">AI & Healthcare Enthusiast | Computer Science Student</p>
                
                <p className="text-gray-700 mb-4">
                  I'm passionate about leveraging artificial intelligence to solve healthcare challenges. 
                  This skin cancer detection tool represents my effort to create accessible technology 
                  that can potentially help with early detection of skin conditions.
                </p>
                
                <div className="flex gap-4">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">About This Project</h3>
              <p className="text-gray-700 mb-4">
                This skin cancer detection tool was developed as part of my final year project at [Your University]. 
                It uses deep learning techniques to analyze images of skin lesions and provide predictions about 
                potential skin conditions.
              </p>
              <p className="text-gray-700">
                The model was trained on the ISIC 2020 dataset, which contains over 33,000 dermoscopic images of 
                skin lesions, labeled with diagnoses. The application uses an EfficientNet-B3 architecture, which 
                provides a good balance between accuracy and computational efficiency.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Technologies Used</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span><strong>Frontend:</strong> Next.js, React, TailwindCSS</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span><strong>Backend:</strong> Python, FastAPI</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span><strong>AI Model:</strong> PyTorch, EfficientNet-B3</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span><strong>Data Visualization:</strong> Chart.js</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span><strong>Deployment:</strong> Vercel</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Disclaimer</h3>
            <p className="text-gray-700 mb-4">
              This tool is intended for educational and informational purposes only. It should not be used as a 
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of 
              your physician or other qualified health provider with any questions you may have regarding a 
              medical condition.
            </p>
            <p className="text-gray-700">
              The predictions made by this tool are based on machine learning algorithms and may not always be 
              accurate. Early detection of skin cancer is crucial, so if you notice any suspicious changes in 
              your skin, please consult a dermatologist immediately.
            </p>
          </div>
          
          <div className="text-center">
            <Link href="/detect" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Try the Detection Tool
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 