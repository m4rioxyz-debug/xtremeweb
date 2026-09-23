'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/config/assets';

export interface BagConfig {
  id: string;
  name: string;
  slug: string;
  weight: string;
  heightClass: string; // relative height
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textVertical?: string;
  title: string;
  subtitle?: string;
  code?: string;
  hasGoldSeal?: boolean;
  sealText?: string;
  zIndex?: number;
  scale?: string;
  image?: string;
}

export default function ProductBag({ bag }: { bag: BagConfig }) {
  const imageSrc = bag.image || assets.products[bag.slug] || `/images/products/${bag.slug}.webp`;

  return (
    <Link
      href={`/products/${bag.slug}`}
      className="group relative flex flex-col items-center select-none transition-all duration-300 hover:-translate-y-2.5 focus:outline-none"
      style={{ zIndex: bag.zIndex || 10 }}
      title={`${bag.title} ${bag.code || ''} (${bag.weight})`}
    >
      {/* 3D Sack Container displaying authentic product bag */}
      <div className={`relative ${bag.heightClass} w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 flex items-center justify-center`}>
        <Image
          src={imageSrc}
          alt={`${bag.title} ${bag.code || ''} ${bag.weight}`}
          width={280}
          height={340}
          className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Realistic Ground Contact Shadow */}
      <div
        className="w-20 sm:w-24 md:w-28 h-3 rounded-full bg-black/35 blur-[5px] -mt-1 transition-all duration-300 group-hover:scale-95 group-hover:opacity-60"
        style={{
          transform: 'rotateX(60deg)'
        }}
      />
    </Link>
  );
}
