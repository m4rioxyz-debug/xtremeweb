'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Download,
  FileText,
  ShieldCheck,
  Package,
  Layers,
  CheckCircle2,
  Mail,
  ArrowRight,
  Check
} from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useContact } from '@/context/ContactContext';
import ProductCard from '@/components/products/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  const { products, getProductBySlug } = useProducts();
  const { addMessage } = useContact();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inqName, setInqName] = useState('');
  const [inqCompany, setInqCompany] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqDetails, setInqDetails] = useState('');

  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) =>
    product.relatedSlugs?.includes(p.slug)
  );

  const handleDownload = (docTitle: string) => {
    setDownloadSuccess(docTitle);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-100 border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="corporate-container flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#C62828] transition-colors">
            {t('home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/products" className="hover:text-[#C62828] transition-colors">
            {t('products')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href={`/products?category=${product.categorySlug}`}
            className="hover:text-[#C62828] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-[#050A5C]">{product.name}</span>
        </div>
      </div>

      {/* Main Product Hero / Overview Section */}
      <div className="corporate-container pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Packaging Presentation (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            {/* Background Accent Gradient */}
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ backgroundColor: product.accentColor }}
            />

            {/* Classification Badge */}
            <div className="absolute top-4 left-4 bg-white/95 border border-gray-200 text-[#050A5C] text-xs font-mono font-bold px-3 py-1 rounded shadow-xs">
              {product.classification}
            </div>

            {/* Authentic 3D Product Packaging Display */}
            <div className="relative z-10 w-full h-80 sm:h-96 flex items-center justify-center my-4">
              <Image
                src={product.image || '/images/products/fibergel-s2.webp'}
                alt={`${product.name} - ${product.packaging}`}
                width={360}
                height={440}
                className="h-72 sm:h-88 md:h-96 w-auto object-contain filter drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>

            {/* Packaging specifications pill */}
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <Package className="w-4 h-4 text-[#C62828]" />
              <span>{product.packaging}</span>
            </div>
          </div>

          {/* Right: Product Details & Commercial Inquiries (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C62828] bg-red-50 px-3 py-1 rounded border border-red-100 inline-block mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#050A5C] tracking-tight">
                {product.name}
              </h1>
              <p className="text-base text-[#C62828] font-semibold mt-1">
                {product.tagline}
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Key Features List */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Key Performance Advantages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Action CTA Buttons */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => setInquiryModalOpen(true)}
                className="w-full sm:w-auto bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{t('requestInfo')}</span>
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto bg-[#050A5C] hover:bg-[#080B63] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg transition-all text-center"
              >
                {t('contactUs')}
              </Link>
            </div>

            {/* Download Notification Banner */}
            {downloadSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in duration-200">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Downloading document: <strong>{downloadSuccess}</strong> (Simulated PDF download generated)</span>
              </div>
            )}
          </div>
        </div>

        {/* Technical Data Sheets & Specifications Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-gray-200">
          {/* Technical Specs Table (7 cols) */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-black text-[#050A5C] tracking-tight mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C62828]" />
              <span>{t('technicalSpecs')}</span>
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <tbody>
                  {product.technicalData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-gray-50/70' : 'bg-white'}
                    >
                      <td className="py-3 px-4 font-bold text-gray-700 w-1/2 border-b border-gray-100">
                        {row.property}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-900 border-b border-gray-100">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/70">
                    <td className="py-3 px-4 font-bold text-gray-700 border-b border-gray-100">
                      Standard Consumption
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-900 border-b border-gray-100">
                      {product.consumption}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-3 px-4 font-bold text-gray-700">
                      Shelf Life & Storage
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-900">
                      {product.shelfLife}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Downloadable Documents & Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-black text-[#050A5C] tracking-tight mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C62828]" />
                <span>Technical Documentation</span>
              </h2>
              <div className="space-y-3">
                {product.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#C62828] text-white flex items-center justify-center font-bold text-xs">
                        {doc.type}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{doc.title}</h4>
                        <span className="text-[10px] text-gray-500 font-mono">PDF • {doc.size}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(doc.title)}
                      className="p-2 text-[#050A5C] hover:text-[#C62828] transition-colors focus:outline-none"
                      title="Download Technical Document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Compliance Seal */}
            <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#C62828] flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-[#050A5C]">European Quality Assurance</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Tested and audited under UNE EN standards. Certified for structural safety and environmental hygiene.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications & Benefits Panels */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-200">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-base font-bold text-[#050A5C] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C62828]" />
              <span>Recommended Applications</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              {product.applications.map((app, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C62828] font-bold">•</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-base font-bold text-[#050A5C] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#050A5C]" />
              <span>Architectural & Contractor Benefits</span>
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              {product.benefits.map((ben, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#050A5C] font-bold">•</span>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[#C62828] text-xs font-bold uppercase tracking-wider block">
                  Compatible Systems
                </span>
                <h2 className="text-2xl font-black text-[#050A5C] tracking-tight">
                  Related Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#C62828] hover:underline flex items-center gap-1"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Request Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200">
            <h3 className="text-xl font-bold text-[#050A5C] mb-2">
              Request Information: {product.name}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Direct technical specification, container quotes, and export logistics.
            </p>

            {inquirySent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Inquiry Received Successfully</h4>
                <p className="text-xs text-emerald-700">
                  Our regional export engineer will contact you with technical documentation and price schedules.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInquirySent(false);
                    setInquiryModalOpen(false);
                  }}
                  className="mt-4 px-6 py-2 bg-[#050A5C] text-white text-xs font-bold rounded-lg"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addMessage({
                    type: 'product_inquiry',
                    productName: product.name,
                    name: inqName,
                    company: inqCompany,
                    email: inqEmail,
                    phone: inqPhone,
                    subject: `Inquiry for ${product.name} (${product.classification})`,
                    message: inqDetails
                  });
                  setInquirySent(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inqName}
                    onChange={(e) => setInqName(e.target.value)}
                    placeholder="e.g. Eng. Carlos Valero"
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={inqCompany}
                    onChange={(e) => setInqCompany(e.target.value)}
                    placeholder="e.g. Mediterranean Builders Ltd"
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={inqEmail}
                      onChange={(e) => setInqEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={inqPhone}
                      onChange={(e) => setInqPhone(e.target.value)}
                      placeholder="+216 ..."
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Project Details / Estimated Quantity *</label>
                  <textarea
                    rows={3}
                    required
                    value={inqDetails}
                    onChange={(e) => setInqDetails(e.target.value)}
                    placeholder="Describe your jobsite requirements, substrate conditions, or requested shipping destination..."
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold rounded-lg shadow uppercase tracking-wider"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
