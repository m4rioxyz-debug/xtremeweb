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
