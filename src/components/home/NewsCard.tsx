'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { NewsArticle } from '@/data/news';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsCard({ article }: { article: NewsArticle }) {
  const { t } = useLanguage();

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Real Editorial Cover Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Top Red Accent Band */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C62828] z-10" />

          {/* Category Tag Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 bg-[#C62828] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Meta & Summary */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#C62828]" />
            <span>{article.date}</span>
            <span className="text-gray-300">•</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="text-lg font-bold text-[#050A5C] group-hover:text-[#C62828] transition-colors line-clamp-2 leading-snug mb-3">
            <Link href={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Read More Link */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-400">
          Official Release
        </span>

        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C62828] group-hover:text-[#B71C1C] transition-colors uppercase tracking-wider"
        >
          <span>{t('readMore')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
