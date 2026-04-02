'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-dark-900/80 dark:border-dark-700">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">WPCodingPress</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white transition-colors">Contact</Link>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-dark-700">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 dark:text-gray-300">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-primary-600 dark:text-gray-300">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary-600 dark:text-gray-300">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}