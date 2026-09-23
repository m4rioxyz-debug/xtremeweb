'use client';

import React, { useState } from 'react';
import { Search, Archive, Sparkles } from 'lucide-react';
import { newsArticles } from '@/data/news';
import NewsCard from '@/components/home/NewsCard';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'tunisia' | 'archive'>('tunisia');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tunisiaCategories = ['All', 'R&D & Technology', 'Technical Events', 'Distribution & Network'];
  const archiveCategories = ['All', 'International Archive', 'Corporate Milestones', 'Exhibitions & Events'];

  const displayedArticles = newsArticles.filter((article) => {
    if (activeTab === 'tunisia') {
      if (article.isArchived) return false;
    } else {
      if (!article.isArchived) return false;
    }

    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-gray-50/50 min-h-screen pb-24">
      {/* News Banner */}
      <div className="w-full bg-[#050A5C] text-white py-14 relative overflow-hidden border-b-4 border-[#C62828]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="corporate-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600/30 text-red-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-red-500/30">
              <span>🇹🇳 {t('localPresence')} • 🇪🇸 {t('spanishTech')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {t('newsPageTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('newsPageSubtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="corporate-container pt-10">
        {/* Tab Switcher: Tunisia & Innovation vs Historical Archive */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab('tunisia');
                setSelectedCategory('All');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'tunisia'
                  ? 'bg-[#C62828] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tunisia & Innovation</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('archive');
                setSelectedCategory('All');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'archive'
                  ? 'bg-[#050A5C] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Archive className="w-4 h-4" />
              <span>International Archive</span>
            </button>
          </div>

          <div className="text-xs text-gray-500">
            {activeTab === 'tunisia'
              ? 'Showing active Tunisia releases & Spanish formulation breakthroughs'
              : 'Historical international corporate records (archived)'}
          </div>
        </div>

        {/* Search & Category Filter bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, topics, technical tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {(activeTab === 'tunisia' ? tunisiaCategories : archiveCategories).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#C62828] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Desktop Grid */}
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <h3 className="text-lg font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-xs text-gray-500 mb-6">
              Try adjusting your search query or choosing another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-[#C62828] text-white text-xs font-bold px-6 py-2.5 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
