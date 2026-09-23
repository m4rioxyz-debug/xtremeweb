'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function SolutionsSection() {
  const { t } = useLanguage();

  const solutions = [
    {
      id: 0,
      title: t('sol1Title'),
      description: t('sol1Desc'),
      href: '/products?category=tile-adhesives',
      // Authentic Mortar/Adhesive Bag Icon as seen in the user's reference screenshot
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 stroke-[#C62828]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Bag outline */}
          <path d="M18 16 C18 16, 22 22, 22 52 C22 55, 24 57, 27 57 L37 57 C40 57, 42 55, 42 52 C42 22, 46 16, 46 16 Z" />
          {/* Top gather / tie */}
          <path d="M24 16 L40 16" />
          <path d="M26 12 L38 12" />
          <path d="M28 8 L36 8" />
          {/* Taurus/Chevron emblem on bag */}
          <path d="M26 26 C28 32, 36 32, 38 26" />
          <path d="M25 24 C23 20, 24 18, 27 19" />
          <path d="M39 24 C41 20, 40 18, 37 19" />
          {/* Trowel / mixing paddle */}
          <path d="M32 34 L32 48" />
          <path d="M28 44 L36 44" />
        </svg>
      )
    },
    {
      id: 1,
      title: t('sol2Title'),
      description: t('sol2Desc'),
      href: '/products?category=cement-renders',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 stroke-[#C62828]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Building facade wall */}
          <rect x="14" y="16" width="36" height="40" rx="4" />
          <line x1="14" y1="28" x2="50" y2="28" />
          <line x1="14" y1="40" x2="50" y2="40" />
          <line x1="32" y1="16" x2="32" y2="28" />
          <line x1="24" y1="28" x2="24" y2="40" />
          <line x1="40" y1="28" x2="40" y2="40" />
          <line x1="32" y1="40" x2="32" y2="56" />
          {/* Plaster finish swoosh */}
          <path d="M46 12 L52 18 L38 32" />
        </svg>
      )
    },
    {
      id: 2,
      title: t('sol3Title'),
      description: t('sol3Desc'),
      href: '/products?category=masonry-mortars',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 stroke-[#C62828]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Masonry Trowel & Brickwork */}
          <path d="M12 48 L52 48" />
          <path d="M16 38 L48 38" />
          <path d="M20 28 L44 28" />
          {/* Pointed trowel blade */}
          <path d="M32 10 L44 26 L20 26 Z" />
          <path d="M32 26 L32 34" />
          <path d="M28 34 L36 34" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white select-none">
      <div className="corporate-container px-4">
        {/* Section Header matching Screenshot 1 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#050A5C] tracking-tight">
            <span className="relative inline-block pb-3">
              {t('solutions')}
              <span className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-[#C62828] rounded-full" />
            </span>
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#050A5C] mt-3 tracking-tight">
            {t('solutionsSubtitle')}
          </p>
        </div>

        {/* 3 Solutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 group"
            >
              <div>
                {/* Icon in soft pink container matching reference screenshot */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FDE8E8] border border-red-100 flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                  {sol.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-black text-[#C62828] tracking-tight mb-3 sm:mb-4">
                  {sol.title}
                </h3>

                {/* Card Description in Red/Brown tone matching reference screenshot */}
                <p className="text-sm sm:text-base text-[#9B2C2C] font-medium leading-relaxed mb-6">
                  {sol.description}
                </p>
              </div>

              {/* Bottom Learn More link */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href={sol.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#050A5C] hover:text-[#C62828] transition-colors uppercase tracking-wider"
                >
                  <span>{t('learnMore')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
