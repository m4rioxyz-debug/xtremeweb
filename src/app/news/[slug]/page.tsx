'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Share2,
  Tag
} from 'lucide-react';
import { newsArticles } from '@/data/news';
import NewsCard from '@/components/home/NewsCard';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { t } = useLanguage();

  const article = newsArticles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  return (
    <div className="w-full bg-white pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-100 border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="corporate-container flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#C62828] transition-colors">
            {t('home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/news" className="hover:text-[#C62828] transition-colors">
            {t('news')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-[#050A5C] line-clamp-1">{article.title}</span>
        </div>
      </div>

      {/* Article Content Container */}
      <article className="corporate-container pt-10">
        <div className="max-w-4xl mx-auto">
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#C62828] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-[#C62828]" />
              <span>{article.date}</span>
              <span className="text-gray-300">•</span>
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pb-6 mb-8 border-b border-gray-200 text-xs text-gray-600">
            <div className="w-8 h-8 rounded-full bg-red-100 text-[#C62828] flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-gray-800 block">{article.author}</span>
              <span className="text-[11px] text-gray-500">Xtreme Corporate Press Release</span>
            </div>
          </div>

          {/* Large Real Editorial Cover Banner */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 mb-10 shadow-xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Article Paragraphs */}
          <div className="prose prose-lg max-w-none text-gray-700 text-base leading-relaxed space-y-5">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags & Social Share */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-[#C62828]" />
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="font-bold uppercase tracking-wider">Share:</span>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share) {
                    navigator.share({ title: article.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#C62828] hover:text-white flex items-center justify-center transition-colors"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Navigation CTA */}
          <div className="mt-14 p-8 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-[#050A5C] text-base mb-1">
                Looking for Technical Specifications?
              </h4>
              <p className="text-xs text-gray-600">
                Explore our full range of certified construction chemical formulations.
              </p>
            </div>
            <Link
              href="/products"
              className="bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow transition-all"
            >
              Explore Products
            </Link>
          </div>

          {/* Related News Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-xl font-black text-[#050A5C] tracking-tight mb-8">
                Related Press Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <NewsCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
