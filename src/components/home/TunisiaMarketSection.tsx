'use client';

import React from 'react';
import {
  Building2,
  Home,
  Waves,
  Layers,
  Wrench,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TunisiaMarketSection() {
  const { t } = useLanguage();

  const marketApplications = [
    {
      title: t('appTilingTitle'),
      description: t('appTilingDesc'),
      product: 'FiberGel S1 & S2',
      tag: 'UNE EN 12004 C2TES1 / S2',
      icon: Layers,
      color: 'bg-red-50 text-[#C62828] border-red-200'
    },
    {
      title: t('appPoolsTitle'),
      description: t('appPoolsDesc'),
      product: 'SuperCol PISCINAS',
      tag: 'Waterproof Polymer Matrix',
      icon: Waves,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: t('appFacadesTitle'),
      description: t('appFacadesDesc'),
      product: 'CemAir M15 / CS IV',
      tag: 'EN 998-1 Weatherproof',
      icon: Building2,
      color: 'bg-indigo-50 text-[#050A5C] border-indigo-200'
    },
    {
      title: t('appMasonryTitle'),
      description: t('appMasonryDesc'),
      product: 'CemAir Lightweight',
      tag: 'EN 998-2 Structural M15',
      icon: Home,
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      title: t('appRenovTitle'),
      description: t('appRenovDesc'),
      product: 'FiberGel S2 Microfiber',
      tag: 'Zero Slump Vertical Hold',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      title: t('appRepairTitle'),
      description: t('appRepairDesc'),
      product: 'SuperCol C2TES2 & Mortars',
      tag: 'Structural Durability',
      icon: Wrench,
      color: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-b border-gray-200 select-none">
      <div className="corporate-container">
        {/* Section 1: Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-red-100 text-[#C62828] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-red-200">
            <span>🇹🇳 {t('localPresence')}</span>
            <span>•</span>
            <span>🇪🇸 {t('spanishEngineering')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight mb-4">
            {t('marketTitle')}
          </h2>
          <div className="w-16 h-1 bg-[#C62828] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('marketSubtitle')}
          </p>
        </div>

        {/* 6-Card Grid for Key Building Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketApplications.map((app, i) => {
            const Icon = app.icon;
            return (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${app.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#050A5C] group-hover:text-[#C62828] transition-colors mb-2">
                    {app.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {app.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">{t('formulationLabel')}:</span>
                  <span className="font-bold text-[#C62828] font-mono">{app.product}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
