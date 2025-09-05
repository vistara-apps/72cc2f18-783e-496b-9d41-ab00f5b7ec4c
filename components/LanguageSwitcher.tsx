'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { LANGUAGES } from '@/lib/constants';

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'es') => {
    setCurrentLanguage(lang);
    setIsOpen(false);
    // Here you would typically update the app's language context
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-sm text-white font-medium">
          {LANGUAGES[currentLanguage]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white bg-opacity-20 backdrop-blur-md rounded-lg border border-white border-opacity-30 shadow-modal overflow-hidden z-50">
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as 'en' | 'es')}
              className={cn(
                "w-full px-4 py-3 text-left text-sm text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200",
                currentLanguage === code && "bg-white bg-opacity-20"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
