'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useContact } from '@/context/ContactContext';
import { useCompanySettings } from '@/context/CompanySettingsContext';

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { t } = useLanguage();
  const { addMessage } = useContact();
  const { settings } = useCompanySettings();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setErrorMessage('Please complete all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      addMessage({
        type: 'contact',
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        subject: formData.subject || 'General Technical / Commercial Inquiry',
        message: formData.message
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        subject: '',
        message: ''
      });
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* Contact Hero Banner */}
      <div className="w-full bg-[#050A5C] text-white py-14 relative overflow-hidden border-b-4 border-[#C62828]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="corporate-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600/30 text-red-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-red-500/30">
              <span>{t('contactHeroBadge')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {t('contactHeroTitle')}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t('contactHeroDesc')}
            </p>
          </div>
        </div>
      </div>

      <div className="corporate-container pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Tunisia Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C62828] block mb-1">
                🇹🇳 {t('localPresence')}
              </span>
              <h2 className="text-2xl font-black text-[#050A5C] tracking-tight">
                Xtreme Tunisia
              </h2>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {t('footerDesc')}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <MapPin className="w-5 h-5 text-[#C62828] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">{t('officeLocationTitle')}:</strong>
                  <span>{settings.officeLocation}</span>
                  {settings.officeSubtext && (
                    <span className="text-[11px] text-gray-500 block mt-0.5">{settings.officeSubtext}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Phone className="w-5 h-5 text-[#050A5C] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">{t('phoneNumber')}:</strong>
                  <a href={`tel:${settings.phoneCall || settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#C62828] font-mono font-bold">
                    {settings.phone}
                  </a>
                  {settings.phoneLabel && (
                    <span className="text-[10px] text-amber-700 block mt-0.5 font-mono">{settings.phoneLabel}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Mail className="w-5 h-5 text-[#050A5C] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">{t('emailAddress')}:</strong>
                  <a href={`mailto:${settings.email}`} className="hover:text-[#C62828] font-bold font-mono">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 font-bold mb-0.5">{t('officeHoursTitle')}:</strong>
                  <span>{settings.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Formulation Technology note */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900">
              <strong className="block font-bold mb-1">🇪🇸 {t('spanishTech')}</strong>
              {settings.standardsNote || `${t('certifiedStandardsTitle')} — UNE EN 12004 & EN 998 (ISO 9001:2015).`}
            </div>

          </div>

          {/* Right: Validated Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
            <h3 className="text-xl font-bold text-[#050A5C] mb-2">
              {t('sendMessageTitle')}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {t('sendMessageSubtitle')}
            </p>

            {/* Success State Alert */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-800 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-sm mb-0.5">{t('messageSentSuccess')}</strong>
                  <span>{t('messageSentDesc')}</span>
                </div>
              </div>
            )}

            {/* Error State Alert */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-800 animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-sm mb-0.5">Error</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    {t('fullName')} <span className="text-[#C62828]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('placeholderName')}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    {t('companyName')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('placeholderCompany')}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    {t('emailAddress')} <span className="text-[#C62828]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('placeholderEmail')}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1.5">
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('placeholderPhone')}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  {t('subjectLabel')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. FiberGel S2 specifications for hotel project"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  {t('messageLabel')} <span className="text-[#C62828]">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('placeholderMessage')}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C62828] focus:border-transparent outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t('sending')}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                      <span>{t('sendMessageBtn')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
