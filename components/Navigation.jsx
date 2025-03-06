'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/logo192.png" 
            alt="Melanoma Predict Logo" 
            width={40} 
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-blue-600">
            Skin Cancer Detection
          </span>
        </Link>
        <div className="flex gap-6">
          <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
          >
            Home
          </Link>
          <Link 
            href="/detect" 
            className={`${pathname === '/detect' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
          >
            Detection Tool
          </Link>
          <Link 
            href="/about" 
            className={`${pathname === '/about' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
} 