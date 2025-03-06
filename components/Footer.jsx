import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <Image 
            src="/images/logo192.png" 
            alt="Melanoma Predict Logo" 
            width={50} 
            height={50}
            className="rounded-md"
          />
        </div>
        <p className="mb-2">© 2023 Skin Cancer Detection Tool. All rights reserved.</p>
        <p className="text-gray-400 text-sm">
          This tool is for educational purposes only and should not replace professional medical advice.
        </p>
      </div>
    </footer>
  );
} 