'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { assets } from '@/config/assets';

export default function ProductLinesSection() {
  const { t } = useLanguage();

  const lines = [
    {
      id: 1,
      title: t('line1Title'),
      category: 'Tile Adhesives',
      href: '/products/supercol-c2tes2',
      image: assets.productLines.line1,
      bgGradient: 'from-zinc-950 via-slate-900 to-red-950',
      tag: 'Class S1 / S2 Deformable',
      pattern: 'radial-gradient(circle at 70% 30%, rgba(198, 40, 40, 0.45) 0%, transparent 60%)'
    },
    {
      id: 2,
      title: t('line2Title'),
      category: 'Waterproof Grouts',
      href: '/products/flexigrout',
      image: assets.productLines.line2,
      bgGradient: 'from-zinc-950 via-slate-900 to-sky-950',
      tag: 'Hydro-Shield Anti-Mold',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(5, 10, 92, 0.5) 0%, transparent 60%)'
    },
    {
      id: 3,
      title: t('line3Title'),
      category: 'Facades & Substrates',
      href: '/products/cement-renders',
      image: assets.productLines.line3,
      bgGradient: 'from-zinc-950 via-slate-900 to-amber-950',
      tag: 'EN 998-1 Weather-Shield',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(244, 81, 30, 0.4) 0%, transparent 60%)'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="corporate-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#C62828] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
            Industrial Range
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight mb-4">
            {t('productLinesTitle')}
          </h2>
          <div className="w-16 h-1 bg-[#C62828] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('productLinesSubtitle')}
          </p>
        </div>

        {/* 3 Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lines.map((line) => (
            <Link
              key={line.id}
              href={line.href}
              className="group relative h-96 sm:h-[420px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-red-500/30 bg-slate-950"
            >
              {/* Real Application Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={line.image}
                  alt={line.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-85"
                />
              </div>

              {/* Construction Texture & Deep Industrial Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${line.bgGradient} transition-opacity duration-500 group-hover:opacity-85`}
                style={{
                  backgroundImage: `${line.pattern}, linear-gradient(135deg, rgba(17, 24, 39, 0.90) 0%, rgba(5, 10, 92, 0.75) 100%)`
                }}
              />

              {/* Subtle Construction Architectural Grid Motif */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Decorative Red Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C62828] z-20 transform origin-left transition-transform duration-300 group-hover:scale-x-100" />

              {/* Top Tag Badge */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-white/95 bg-slate-900/70 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/20 shadow-sm">
                  {line.category}
                </span>

                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#C62828] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 transform group-hover:rotate-45 group-hover:border-[#C62828] shadow-md">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Aligned Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                <span className="text-xs font-mono text-[#F4511E] block mb-2 font-semibold">
                  {line.tag}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-red-300 transition-colors">
                  {line.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">
                  <span>{t('viewDetails')}</span>
                  <span className="text-[#C62828] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
