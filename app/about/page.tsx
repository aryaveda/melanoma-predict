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
                <div className="w-48 h-48 rounded-full overflow-hidden">
                  <Image 
                    src="/images/profilePicture.jpg" 
                    alt="Arya Veda Alviantoro" 
                    width={192} 
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Arya Veda Alviantoro</h2>
                <p className="text-gray-600 mb-4">Mahasiswa Elektronika dan Instrumentasi | Universitas Gadjah Mada</p>
                
                <p className="text-gray-700 mb-4">
                  Website ini merupakan bagian dari tugas akhir saya. Saya memiliki ketertarikan dalam pengembangan
                  teknologi yang dapat membantu dalam bidang kesehatan, khususnya deteksi dini kanker kulit
                  menggunakan kecerdasan buatan.
                </p>
                
                <div className="flex gap-4">
                  <a href="https://github.com/aryaveda" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/arya-veda-alviantoro-9109601b4/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Tentang Proyek</h2>
            <p className="text-gray-700 mb-4">
              Proyek ini merupakan bagian dari tugas akhir saya di Universitas Gadjah Mada, jurusan Elektronika dan Instrumentasi.
              Aplikasi ini dikembangkan untuk membantu deteksi dini kanker kulit menggunakan teknologi kecerdasan buatan.
            </p>
            <p className="text-gray-700 mb-4">
              Melanoma adalah jenis kanker kulit yang paling berbahaya dan dapat berakibat fatal jika tidak terdeteksi sejak dini.
              Dengan memanfaatkan model machine learning yang telah dilatih dengan ribuan gambar klinis, aplikasi ini bertujuan untuk
              memberikan alat bantu yang dapat diakses oleh masyarakat luas untuk melakukan pemeriksaan awal.
            </p>
            <p className="text-gray-700">
              <strong>Catatan Penting:</strong> Aplikasi ini hanya bersifat edukatif dan tidak menggantikan diagnosis medis profesional.
              Jika Anda memiliki kekhawatiran tentang kondisi kulit Anda, selalu konsultasikan dengan dokter atau spesialis kulit.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Teknologi yang Digunakan</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS</li>
              <li><strong>Backend:</strong> Python, FastAPI</li>
              <li><strong>Machine Learning:</strong> TensorFlow, Keras</li>
              <li><strong>Deployment:</strong> Vercel, Docker</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 