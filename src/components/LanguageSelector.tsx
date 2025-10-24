// src/components/LanguageSelector.tsx
import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { supportedLanguages } from '../utils/languages';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = supportedLanguages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-white transition-colors w-full justify-between"
      >
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{currentLanguage?.flag}</span>
          <span className="text-xs sm:text-sm truncate hidden sm:inline">{currentLanguage?.name}</span>
        </div>
        <ChevronDown className="h-3 w-3 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg border border-gray-700 shadow-xl z-[60] w-48 sm:w-full max-h-60 overflow-y-auto">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                language === lang.code ? 'bg-blue-600/20 text-blue-400' : 'text-white'
              }`}
            >
              <span className="text-base sm:text-lg">{lang.flag}</span>
              <span className="text-xs sm:text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
