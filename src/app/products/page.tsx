'use client';

import React, { useState, useMemo } from 'react';
import { Search, Layers } from 'lucide-react';
import { productCategories } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/products/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        selectedCategory === 'all' || prod.categorySlug === selectedCategory;
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.classification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-gray-50/50 min-h-screen pb-20">
      {/* Page Header Banner */}
      <div className="w-full bg-[#050A5C] text-white py-14 relative overflow-hidden border-b-4 border-[#C62828]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="corporate-container relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#C62828] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
              🇪🇸 {t('spanishTech')} • 🇹🇳 {t('localPresence')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {t('catalogTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('catalogSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Catalog Content */}
      <div className="corporate-container pt-10">
        {/* Controls: Search & Category Chips */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rtl:right-3.5 rtl:left-auto" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="FiberGel, XtraCol, C2TE, S1, S2..."
              className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:border-transparent"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-[#C62828] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.slug === 'all' ? t('allCategories') : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-semibold uppercase tracking-wider">
          <span>{t('allProductsCount')}: {filteredProducts.length}</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C62828] hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t('noProductsFound')}</h3>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-[#C62828] text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-[#B71C1C] transition-colors mt-4"
            >
              {t('allCategories')}
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#C62828] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
