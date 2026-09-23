'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/config/assets';

export default function Hero() {

  return (
    <section className="relative w-full bg-[#EAF2F8] select-none border-b border-gray-200 overflow-hidden">
      {/* 
        Clean, authentic hero image across all screen sizes (Phone, Tablet, Desktop).
        No interactive selection boxes, no hover rings, no tooltips.
        Pure high-resolution brand banner matching the user's reference screenshots.
      */}
      <div className="relative w-full aspect-[2000/833] max-h-[820px] bg-gradient-to-b from-[#1E88E5] via-[#64B5F6] to-[#E3F2FD]">
        <Image
          src={assets.hero.banner}
          alt="Xtreme Construction Chemicals - European Certified Formulations Lineup"
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
