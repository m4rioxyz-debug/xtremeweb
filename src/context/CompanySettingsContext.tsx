'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SocialLinks {
  linkedin: string;
  facebook: string;
  twitter: string;
  youtube: string;
  instagram?: string;
  whatsapp?: string;
}

export interface CompanySettings {
  phone: string;
  phoneCall: string;
  phoneLabel: string;
  email: string;
  officeLocation: string;
  officeSubtext: string;
  workingHours: string;
  standardsNote: string;
  socialLinks: SocialLinks;
}

export const defaultCompanySettings: CompanySettings = {
  phone: '+(34) 696 472 925',
  phoneCall: '+34696472925',
  phoneLabel: 'Tunisia Hotline',
  email: 'info@xtreme-cc.com',
  officeLocation: 'Tunis, Tunisia',
  officeSubtext: 'Commercial & Technical Representation',
  workingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
  standardsNote: 'Certified Management & Quality Standards — UNE EN 12004 & EN 998 (ISO 9001:2015).',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/https-tika.ly-/',
    facebook: 'https://www.facebook.com/Xtremechems',
    twitter: 'https://x.com/Xtreme_glue',
    youtube: 'https://www.youtube.com/@XTREMEGLUE',
    instagram: '',
    whatsapp: '',
  },
};

const STORAGE_KEY = 'xtreme_company_settings';

interface CompanySettingsContextType {
  settings: CompanySettings;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
  updateSocialLinks: (social: Partial<SocialLinks>) => void;
  resetSettings: () => void;
}

const CompanySettingsContext = createContext<CompanySettingsContextType | undefined>(undefined);

export function CompanySettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CompanySettings>(defaultCompanySettings);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => {
          setSettings((prev) => ({
            ...prev,
            ...parsed,
            socialLinks: {
              ...prev.socialLinks,
              ...(parsed.socialLinks || {})
            }
          }));
        });
      }
    } catch (e) {
      console.error('Failed to parse company settings from localStorage', e);
    }
  }, []);

  const saveSettings = (newVal: CompanySettings) => {
    setSettings(newVal);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
    } catch (e) {
      console.error('Failed to save company settings', e);
    }
  };

  const updateSettings = (partial: Partial<CompanySettings>) => {
    saveSettings({
      ...settings,
      ...partial,
      socialLinks: {
        ...settings.socialLinks,
        ...(partial.socialLinks || {})
      }
    });
  };

  const updateSocialLinks = (social: Partial<SocialLinks>) => {
    saveSettings({
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        ...social
      }
    });
  };

  const resetSettings = () => {
    saveSettings(defaultCompanySettings);
  };

  return (
    <CompanySettingsContext.Provider value={{ settings, updateSettings, updateSocialLinks, resetSettings }}>
      {children}
    </CompanySettingsContext.Provider>
  );
}

export function useCompanySettings() {
  const context = useContext(CompanySettingsContext);
  if (!context) {
    throw new Error('useCompanySettings must be used within a CompanySettingsProvider');
  }
  return context;
}
