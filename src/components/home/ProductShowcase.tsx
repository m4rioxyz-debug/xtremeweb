'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/products/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductShowcase() {
  const { t } = useLanguage();
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Strictly limited to ONLY 4 products on the home page as requested
  const filteredProducts = (activeCategory === 'all'
    ? products
    : products.filter(p => p.categorySlug === activeCategory)
  ).slice(0, 4);

  const getCategoryLabel = (cat: typeof productCategories[0]) => {
    if (cat.slug === 'all') return t('allCategories');
    return cat.name;
  };

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="corporate-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#C62828] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
              🇪🇸 {t('spanishTech')} • 🇹🇳 Tunisia
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight">
              {t('xtremeProductsTitle')}
            </h2>
            <div className="w-16 h-1 bg-[#C62828] mt-3" />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {productCategories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? 'bg-[#C62828] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Exactly 4 products in 1 row (4 columns on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* "More Products" Button in Corporate Red */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{t('moreProducts')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
