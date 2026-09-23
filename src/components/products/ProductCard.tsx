'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Product } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Card Header Product Bag Image Area */}
        <div
          className="relative h-56 sm:h-64 w-full flex items-center justify-center p-4 overflow-hidden border-b border-gray-100 bg-gradient-to-b from-slate-50/80 via-white to-gray-50"
        >
          {/* Subtle Graphic Grid Accent */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #050A5C 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />

          {/* Real High-Resolution 3D Product Bag with object-contain */}
          <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src={product.image || '/images/products/fibergel-s2.webp'}
              alt={`${product.name} ${product.packaging}`}
              width={240}
              height={280}
              className="h-44 sm:h-52 w-auto object-contain filter drop-shadow-md"
              loading="lazy"
            />
          </div>

          {/* Classification Pill Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-gray-200 text-[#050A5C] text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow-xs z-20">
            {product.classification.split(' ')[0]} {product.classification.split(' ')[1] || ''}
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-2 right-3 text-[10px] font-semibold text-gray-500 z-20">
            {product.category}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#050A5C] tracking-tight group-hover:text-[#C62828] transition-colors mb-2">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Quick specs highlights */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100 mb-2">
            {product.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-gray-500 flex items-center gap-1">
          <FileText className="w-3 h-3 text-[#050A5C]" />
          TDS Ready
        </span>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#C62828] hover:text-[#B71C1C] transition-colors uppercase tracking-wider"
        >
          {t('viewDetails')}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
