'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CompanySettings, defaultCompanySettings, SocialLinks } from '@/data/company';

export type { CompanySettings, SocialLinks };
export { defaultCompanySettings };

const STORAGE_KEY = 'xtreme_company_settings';

interface CompanySettingsContextType {
  settings: CompanySettings;
  updateSettings: (newSettings: Partial<CompanySettings>) => Promise<void>;
  updateSocialLinks: (social: Partial<SocialLinks>) => Promise<void>;
  resetSettings: () => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const CompanySettingsContext = createContext<CompanySettingsContextType | undefined>(undefined);

export function CompanySettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CompanySettings>(defaultCompanySettings);

  const fetchServerSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
            socialLinks: {
              ...prev.socialLinks,
              ...(data.settings.socialLinks || {})
            }
          }));
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.settings));
          } catch {
            // Ignore
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch settings from server API:', e);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => {
          if (isMounted) {
            setSettings((prev) => ({
              ...prev,
              ...parsed,
              socialLinks: {
                ...prev.socialLinks,
                ...(parsed.socialLinks || {})
              }
            }));
          }
        });
      }
    } catch {
      // Ignore
    }

    queueMicrotask(() => {
      if (isMounted) {
        fetchServerSettings();
      }
    });

    const interval = setInterval(fetchServerSettings, 15000);
    const handleFocus = () => fetchServerSettings();
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchServerSettings]);

  const saveSettings = async (newVal: CompanySettings) => {
    setSettings(newVal);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
    } catch {
      // Ignore
    }

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVal)
      });
    } catch (e) {
      console.error('Failed to sync settings with server:', e);
    }
  };

  const updateSettings = async (partial: Partial<CompanySettings>) => {
    const newVal = {
      ...settings,
      ...partial,
      socialLinks: {
        ...settings.socialLinks,
        ...(partial.socialLinks || {})
      }
    };
    await saveSettings(newVal);
  };

  const updateSocialLinks = async (social: Partial<SocialLinks>) => {
    const newVal = {
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        ...social
      }
    };
    await saveSettings(newVal);
  };

  const resetSettings = async () => {
    setSettings(defaultCompanySettings);
    try {
      localStorage.removeItem(STORAGE_KEY);
      await fetch('/api/settings', { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to reset settings on server:', e);
    }
  };

  return (
    <CompanySettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateSocialLinks,
        resetSettings,
        refreshSettings: fetchServerSettings
      }}
    >
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
