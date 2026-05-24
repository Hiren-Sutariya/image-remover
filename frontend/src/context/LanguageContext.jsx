import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage, default to EN
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('app_language') || 'EN';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('app_language', currentLang);
  }, [currentLang]);

  // Translation function
  const t = (path) => {
    const keys = path.split('.');
    let result = translations[currentLang];
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        // Fallback to EN if translation missing
        let fallback = translations['EN'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey]) {
            fallback = fallback[fKey];
          } else {
            return path; // Return path if even fallback fails
          }
        }
        return fallback;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
