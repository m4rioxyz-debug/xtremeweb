'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import XtremeLogo from '@/components/ui/XtremeLogo';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close mobile menu when route changes
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('aboutUs'), href: '/about' },
    { name: t('products'), href: '/products' },
    { name: t('news'), href: '/news' },
    { name: t('contact'), href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* 
        On Desktop: 
          - Background: rgba(188, 38, 40, 0.8) with backdrop-filter: blur(10px)
          - Centered nav links: padding 0.5rem 1rem, active is bold white, inactive is text-white/90
        On Mobile:
          - Height: 60px with solid #C62828 (Combined with 40px TopBar = 100px total height matching 400x100)
          - Centered logo: 150px
          - Hamburger menu on right: 22px x 22px 3-bar toggle
      */}
      <div className="bg-[#C62828] md:bg-[rgba(198,40,40,0.8)] md:backdrop-blur-[10px] w-full transition-colors">
        {/* Mobile Bar: 60px height */}
        <div className="flex md:hidden items-center justify-between h-[60px] px-4 relative">
          <div className="w-[30px]" />
          <div className="flex items-center justify-center w-[150px]">
            <XtremeLogo variant="white" size="sm" asLink={true} />
          </div>
          {/* Authentic 3-Bar Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-[22px] h-[22px] flex flex-col justify-between p-0 bg-transparent border-0 cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`h-[3px] w-full bg-white transition-all duration-200 ease-in-out ${
                mobileMenuOpen ? 'rotate-45 translate-y-[9.5px]' : ''
              }`}
            />
            <span
              className={`h-[3px] w-full bg-white transition-all duration-200 ease-in-out ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-[3px] w-full bg-white transition-all duration-200 ease-in-out ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[9.5px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Desktop Centered Navigation: ~48-52px height */}
        <div className="hidden md:flex items-center justify-center w-full py-3.5 px-4 lg:px-16">
          <div className="flex items-center justify-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] lg:text-[15px] px-3.5 lg:px-4 py-2 transition-colors duration-200 ${
                    active
                      ? 'text-white font-bold'
                      : 'text-[rgba(255,255,255,0.924)] hover:text-[#e0e0e0] font-normal'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown: rgba(188, 38, 40, 0.95) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[rgba(188,38,40,0.95)] backdrop-blur-md border-t border-white/10 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-center py-4 border-b border-white/10 text-[15px] transition-colors ${
                    active
                      ? 'text-white font-bold bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/5 font-normal'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
