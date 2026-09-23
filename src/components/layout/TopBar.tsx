'use client';

import React from 'react';
import XtremeLogo from '@/components/ui/XtremeLogo';
import { useCompanySettings } from '@/context/CompanySettingsContext';

export default function TopBar() {
  const { settings } = useCompanySettings();

  return (
    <div className="w-full bg-[#C62828] text-white select-none transition-all duration-200">
      <div className="h-[40px] md:h-[80px] px-3 sm:px-6 lg:px-[10%] flex items-center justify-between border-b border-white/10 md:border-b-0">
        {/* Left Side: Contact Information (Width 30% on desktop) */}
        <div className="md:w-[30%] flex items-center gap-3 sm:gap-6 md:gap-8 flex-nowrap whitespace-nowrap">
          <a
            href={`tel:${settings.phoneCall || settings.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Telephone contact"
            title={settings.phoneLabel || 'Xtreme Hotline'}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="w-[13px] h-[13px] md:w-[15px] md:h-[15px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>
            <span className="font-normal text-[10px] md:text-[12px] tracking-wide">{settings.phone}</span>
          </a>

          <a
            href={`mailto:${settings.email}`}
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Email contact"
            title="Xtreme Direct Inquiries"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-[13px] h-[13px] md:w-[15px] md:h-[15px] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
            </svg>
            <span className="font-normal text-[10px] md:text-[12px] tracking-wide">{settings.email}</span>
          </a>
        </div>

        {/* Center: Top Xtreme Logo (Desktop only, exact 150-180px width) */}
        <div className="hidden md:flex items-center justify-center flex-shrink-0 w-[150px] lg:w-[180px]">
          <XtremeLogo variant="white" size="sm" asLink={true} />
        </div>

        {/* Right Side: Social Media Icons (Width 30% on desktop) */}
        <div className="md:w-[30%] flex items-center justify-end gap-3 sm:gap-5 md:gap-7">
          {/* LinkedIn */}
          {settings.socialLinks.linkedin && (
            <a
              href={settings.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-[15px] h-[15px] md:w-[21px] md:h-[21px]" xmlns="http://www.w3.org/2000/svg">
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
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
              className="text-white hover:opacity-80 transition-opacity"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="w-[12px] h-[15px] md:w-[16px] md:h-[21px]" xmlns="http://www.w3.org/2000/svg">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
          )}

          {/* Twitter / X */}
          {settings.socialLinks.twitter && (
            <a
              href={settings.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-[15px] h-[15px] md:w-[21px] md:h-[21px]" xmlns="http://www.w3.org/2000/svg">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
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
              className="text-white hover:opacity-80 transition-opacity"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="w-[17px] h-[15px] md:w-[24px] md:h-[21px]" xmlns="http://www.w3.org/2000/svg">
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
