'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { assets } from '@/config/assets';
import TaurusMascot from '@/components/ui/TaurusMascot';

export default function AboutPage() {
  const { t } = useLanguage();

  const pros = [
    {
      title: t('qualityTitle'),
      description: t('qualityDesc'),
      icon: assets.about.hand,
      alt: 'Quality icon',
    },
    {
      title: t('innovationTitle'),
      description: t('innovationDesc'),
      icon: assets.about.highQuality,
      alt: 'Innovation icon',
    },
    {
      title: t('reliabilityTitle'),
      description: t('reliabilityDesc'),
      icon: assets.about.innovation,
      alt: 'Reliability icon',
    },
  ];

  return (
    <main className="w-full bg-[#f8f8f8] select-none text-[#000049] overflow-hidden">
      {/* Container for Info Sections */}
      <div className="max-w-[1200px] mx-auto px-5 pt-12 md:pt-16 pb-12">
        {/* Section 1: ABOUT US */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 pb-16 md:pb-24">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-[#000049] mb-5 tracking-tight uppercase">
              {t('aboutTitle')}
            </h1>
            <p className="text-base sm:text-lg md:text-[20px] leading-[1.6] text-[#000049] font-normal">
              {t('aboutText')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
            <Image
              src={assets.about.boxingX}
              alt="About our company"
              width={460}
              height={460}
              priority
              className="w-full max-w-[460px] h-auto object-contain rounded-[4px]"
            />
          </div>
        </section>

        {/* Section 2: OUR MISSION (Row-Reverse) */}
        <section className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-14 pb-16 md:pb-24">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-[#000049] mb-5 tracking-tight uppercase">
              {t('missionHeading')}
            </h2>
            <p className="text-base sm:text-lg md:text-[20px] leading-[1.6] text-[#000049] font-normal">
              {t('missionText')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
            <Image
              src={assets.about.aboutUs2}
              alt="Our mission"
              width={460}
              height={460}
              className="w-full max-w-[460px] h-auto object-contain rounded-[4px]"
            />
          </div>
        </section>
      </div>

      {/* Section 3: YouTube Statement Video */}
      <section className="w-full py-12 md:py-16 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold text-[#000049] mb-8 text-center tracking-tight">
            {t('statementTitle')}
          </h2>
          <div className="w-full md:w-[85%] max-w-[960px] aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/lhmQx_OcC8s?si=uyMROhFcGoVRy-zx"
              title="Statement From Mr.Fran Clemente"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Section 4: Pros / Core Values (Quality, Innovation, Reliability) */}
      <section className="max-w-[1200px] mx-auto px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pros.map((pro, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 sm:p-10 rounded-2xl bg-white/70 hover:bg-white border border-gray-100/80 hover:border-gray-200/80 shadow-xs hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-[104px] h-[104px] mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={pro.icon}
                  alt={pro.alt}
                  width={104}
                  height={104}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-[32px] font-bold text-[#000049] mb-4 tracking-tight">
                {pro.title}
              </h3>
              <p className="text-[16px] leading-[1.6] text-[#000049] font-normal max-w-[360px]">
                {pro.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Official Spanish Technology & Tunisia Banner */}
      <section className="w-full flex justify-center px-4 sm:px-8 py-10 md:py-16">
        <div className="bg-[#C62828] w-full max-w-[1200px] min-h-[140px] sm:aspect-[5/1] relative flex items-center justify-between overflow-visible rounded-xl shadow-xl">
          {/* Spain Flag Graphic on Left */}
          <div className="h-full w-[25%] sm:w-[22%] min-w-[85px] sm:min-w-[140px] relative z-[1] overflow-hidden rounded-l-xl flex-shrink-0">
            <Image
              src={assets.about.spain}
              alt="Spain Flag"
              width={400}
              height={200}
              className="h-full w-full object-cover object-left"
            />
          </div>

          {/* Logo & Tagline in Dead Center */}
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 flex flex-col items-center justify-center gap-2 z-[5] pointer-events-none">
            <Image
              src={assets.about.newLogo}
              alt="Xtreme Logo"
              width={260}
              height={50}
              className="w-[140px] sm:w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain"
            />
            <h3 className="text-white font-bold tracking-wider italic text-xs sm:text-base md:text-lg whitespace-nowrap">
              {t('spanishTechBadge')}
            </h3>
          </div>

          {/* Tunisia Flag Graphic on Right */}
          <div className="h-full w-[25%] sm:w-[22%] min-w-[85px] sm:min-w-[140px] relative z-[1] overflow-hidden rounded-r-xl ml-auto flex-shrink-0 flex items-center justify-center bg-[#C62828]">
            <Image
              src={assets.about.tunisia}
              alt="Tunisia Flag"
              width={400}
              height={200}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Taurus Mascot on Right/Foreground with Interactive Eye Tracking */}
          <div className="absolute right-[4%] sm:right-[8%] md:right-[12%] -bottom-[12%] sm:-bottom-[15%] w-[100px] sm:w-[150px] md:w-[190px] lg:w-[220px] z-[10]">
            <TaurusMascot
              width={300}
              height={300}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
