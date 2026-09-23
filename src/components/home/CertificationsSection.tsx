'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, X, Check } from 'lucide-react';
import { certifications, Certification } from '@/data/certifications';
import { useLanguage } from '@/context/LanguageContext';
import { assets } from '@/config/assets';

export default function CertificationsSection() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certImageMap: Record<string, string> = {
    iso: assets.certifications.iso9001,
    ce: assets.certifications.ce,
    spain: assets.certifications.spain,
    otabu: assets.certifications.otabu,
    smg: assets.certifications.smg,
    tika: assets.certifications.tika,
    applus: assets.certifications.otabu,
    crismachem: assets.certifications.smg,
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="corporate-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#C62828] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
            Rigorous Quality Standards
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight mb-4">
            {t('licensesTitle')}
          </h2>
          <div className="w-16 h-1 bg-[#C62828] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            All Xtreme products undergo systematic chemical batch testing, mechanical deformation analysis, and third-party laboratory audits.
          </p>
        </div>

        {/* Certifications Grid with Real Badge Assets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {certifications.map((cert) => {
            const imgSrc = certImageMap[cert.iconType] || assets.certifications.iso9001;

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group bg-white p-6 rounded-xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center hover:-translate-y-1"
              >
                {/* Authentic Certification Emblem Badge */}
                <div className="w-20 h-16 rounded-xl bg-slate-50 border border-gray-200 group-hover:border-[#C62828]/40 flex items-center justify-center p-2 mb-4 transition-colors shadow-xs">
                  <Image
                    src={imgSrc}
                    alt={cert.name}
                    width={80}
                    height={60}
                    className="max-h-12 w-auto object-contain filter transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-[#050A5C] text-sm group-hover:text-[#C62828] transition-colors line-clamp-1 mb-1">
                    {cert.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-mono block">
                    {cert.badgeText}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 w-full flex items-center justify-center gap-1 text-[11px] font-bold text-[#050A5C] group-hover:text-[#C62828]">
                  <span>Verify Scope</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200">
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-xl bg-slate-50 border border-gray-200 p-2 flex items-center justify-center">
                <Image
                  src={certImageMap[selectedCert.iconType] || assets.certifications.iso9001}
                  alt={selectedCert.name}
                  width={64}
                  height={64}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C62828] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  {selectedCert.badgeText}
                </span>
                <h3 className="text-lg font-black text-[#050A5C] tracking-tight mt-1">
                  {selectedCert.name}
                </h3>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-gray-600 border-t border-b border-gray-100 py-4 my-4">
              <div>
                <strong className="text-gray-900 block mb-0.5">Accredited Body / Issuer:</strong>
                <span>{selectedCert.issuer}</span>
              </div>
              <div>
                <strong className="text-gray-900 block mb-0.5">Normative Standard:</strong>
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-800">
                  {selectedCert.standard}
                </span>
              </div>
              <div>
                <strong className="text-gray-900 block mb-0.5">Scope of Certification:</strong>
                <p className="leading-relaxed">{selectedCert.scope}</p>
              </div>
              <div>
                <strong className="text-gray-900 block mb-0.5">Audit Validity:</strong>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3 h-3" />
                  {selectedCert.validity}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 rounded"
              >
                Close
              </button>
              <Link
                href="/about"
                className="px-4 py-2 bg-[#050A5C] hover:bg-[#080B63] text-white text-xs font-bold rounded shadow transition-transform hover:scale-105"
              >
                Full Compliance Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
