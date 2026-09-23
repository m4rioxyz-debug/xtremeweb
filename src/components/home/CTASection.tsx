'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#050A5C] text-white relative overflow-hidden">
      {/* Decorative Brand Ribbons */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C62828]/20 skew-x-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-[#F4511E]/10 -skew-x-12 pointer-events-none" />

      <div className="corporate-container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-orange-400 text-xs font-extrabold uppercase tracking-widest block mb-2">
            Engineering & Technical Support
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            {t('ctaTitle')}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t('ctaSubtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('contactUs')}</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-lg transition-all"
          >
            <span>{t('products')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
