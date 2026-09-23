'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCompanySettings } from '@/context/CompanySettingsContext';
import XtremeLogo from '@/components/ui/XtremeLogo';

export default function Footer() {
  const { t } = useLanguage();
  const { settings } = useCompanySettings();

  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-800">
      <div className="corporate-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Left: Brand + description */}
          <div className="space-y-4">
            <XtremeLogo variant="color" size="md" asLink={true} />
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Xtreme, a leading product in Mortars and Chemicals Construction with European
              specifications, designed to demonstrate the highest level of performance and sustainability
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Follow us
              </h4>
              <div className="flex items-center gap-2">
                {/* LinkedIn */}
                {settings.socialLinks.linkedin && (
                  <a
                    href={settings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#C62828] hover:text-white text-gray-600 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                    </svg>
                  </a>
                )}
                {/* Facebook */}
                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#C62828] hover:text-white text-gray-600 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                  </a>
                )}
                {/* X/Twitter */}
                {settings.socialLinks.twitter && (
                  <a
                    href={settings.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#C62828] hover:text-white text-gray-600 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {/* YouTube */}
                {settings.socialLinks.youtube && (
                  <a
                    href={settings.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#C62828] hover:text-white text-gray-600 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Middle: Company links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-[#C62828] hover:text-[#B71C1C] transition-colors font-medium">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-[#C62828] hover:text-[#B71C1C] transition-colors font-medium">
                  {t('news')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#C62828] hover:text-[#B71C1C] transition-colors font-medium">
                  {t('aboutUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Get in Touch */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[#C62828] hover:text-[#B71C1C] transition-colors font-medium"
                >
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${settings.phoneCall || settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-gray-700 hover:text-[#C62828] transition-colors font-medium"
                >
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>


        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Xtreme. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="text-sm">🇪🇸</span>
            <span className="font-semibold text-[11px] uppercase tracking-wider">Spanish Technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
