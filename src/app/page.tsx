import React from 'react';
import Hero from '@/components/home/Hero';
import SolutionsSection from '@/components/home/SolutionsSection';
import ProductLinesSection from '@/components/home/ProductLinesSection';
import FamilyTreeSection from '@/components/home/FamilyTreeSection';
import TunisiaMarketSection from '@/components/home/TunisiaMarketSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import NewsSection from '@/components/home/NewsSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Hero matching reference screenshot */}
      <Hero />

      {/* 2. Solutions for all your construction needs (3 interactive cards) */}
      <SolutionsSection />

      {/* 3. Our Product Lines (3 visual cards with zoom and dark overlays) */}
      <ProductLinesSection />

      {/* 4. Meet Our Xtreme Family (Interactive Product Ecosystem Network) */}
      <FamilyTreeSection />

      {/* 5. Construction Solutions for Tunisia & Regional Representation */}
      <TunisiaMarketSection />

      {/* 6. Xtreme Products Showcase */}
      <ProductShowcase />

      {/* 7. Corporate News Section */}
      <NewsSection />

      {/* 7. Licenses and Accreditations */}
      <CertificationsSection />

      {/* 8. Call to Action */}
      <CTASection />
    </div>
  );
}
