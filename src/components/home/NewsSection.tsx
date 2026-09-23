'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { newsArticles } from '@/data/news';
import NewsCard from '@/components/home/NewsCard';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="corporate-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#C62828] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
              🇹🇳 {t('localPresence')} • 🇪🇸 {t('spanishTech')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight">
              {t('newsTitle')}
            </h2>
            <div className="w-16 h-1 bg-[#C62828] mt-3" />
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C62828] hover:text-[#B71C1C] transition-colors uppercase tracking-wider"
          >
            <span>{t('viewAllNews')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles
            .filter((a) => !a.isArchived)
            .slice(0, 3)
            .map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
        </div>
      </div>
    </section>
  );
}
