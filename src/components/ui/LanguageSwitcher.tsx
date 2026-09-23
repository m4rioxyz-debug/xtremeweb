'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/data/translations';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '/flags/usa-roundFlag.png' },
  { code: 'ar', name: 'العربية', flag: '/flags/tunisia-roundFlag.png' },
  { code: 'es', name: 'Español', flag: '/flags/spain-roundFlag.png' },
  { code: 'fr', name: 'Français', flag: '/flags/french-roundFlag.png' },
];

const flagMap: Record<Language, string> = {
  en: '/flags/usa-roundFlag.png',
  ar: '/flags/tunisia-roundFlag.png',
  es: '/flags/spain-roundFlag.png',
  fr: '/flags/french-roundFlag.png',
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentFlag = flagMap[language] || flagMap.en;
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="language-selector_languageSelector exclude-rtl"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        direction: 'ltr',
      }}
    >
      {/* Floating Circular Language Button with Red-tinted Flag Background */}
      <button
        type="button"
        className="language-selector_languageButton"
        aria-expanded={isOpen}
        aria-label={`Select language, current language ${currentLang.name}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `linear-gradient(rgba(188, 38, 40, 0.65), rgba(188, 38, 40, 0.65)), url(${currentFlag})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* White Globe SVG matching live site */}
        <svg
          className="language-selector_globeIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: 'relative', zIndex: 2, width: '24px', height: '24px' }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {/* Dropdown Menu matching live site */}
      {isOpen && (
        <div
          className="language-selector_dropdown"
          style={{
            position: 'absolute',
            bottom: '65px',
            right: '0',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            width: '150px',
            zIndex: 1001,
          }}
        >
          <ul
            className="language-selector_languageList"
            style={{ listStyle: 'none', padding: '5px 0', margin: 0 }}
          >
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <li key={item.code}>
                  <button
                    type="button"
                    className={`language-selector_languageLink ${isSelected ? 'language-selector_active' : ''}`}
                    onClick={() => {
                      setLanguage(item.code);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 16px',
                      textDecoration: 'none',
                      color: '#333',
                      transition: 'background-color 0.2s',
                      whiteSpace: 'nowrap',
                      fontWeight: isSelected ? 700 : 400,
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    <Image
                      src={item.flag}
                      alt={`${item.name} flag`}
                      width={20}
                      height={20}
                      className="language-selector_flagIcon"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '10px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.name}</span>
                    {isSelected && (
                      <span
                        className="language-selector_checkmark"
                        style={{
                          marginLeft: 'auto',
                          color: '#BC2628',
                          fontWeight: 700,
                          width: '15px',
                          textAlign: 'center',
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
