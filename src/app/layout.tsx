import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ProductProvider } from '@/context/ProductContext';
import { ContactProvider } from '@/context/ContactContext';
import { CompanySettingsProvider } from '@/context/CompanySettingsContext';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Xtreme Tunisia | Spanish Technology in Construction Chemicals & Advanced Mortars',
    template: '%s | Xtreme Tunisia'
  },
  description: 'Xtreme Tunisia delivers European-certified construction chemicals, deformable tile adhesives (C2TE, S1, S2), waterproof pool systems, and technical mortars with Spanish engineering and dedicated on-site support in Tunisia.',
  keywords: [
    'Xtreme Tunisia',
    'Xtreme Tunisie',
    'Construction chemicals Tunisia',
    'Ciment colle Tunisie',
    'Mortier colle Tunisie',
    'Tile adhesives Tunisia',
    'FiberGel S2',
    'SuperCol Piscinas',
    'XtraCol C2TE',
    'Spanish Technology construction chemicals',
    'UNE EN 12004 Tunisia',
    'ISO 9001 construction chemicals'
  ],
  authors: [{ name: 'Xtreme Tunisia - Spanish Technology' }],
  openGraph: {
    title: 'Xtreme Tunisia | Spanish Technology in Construction Chemicals & Advanced Mortars',
    description: 'European certified construction chemical formulations, polymer tile adhesives, and technical mortars for the Tunisian construction sector.',
    siteName: 'Xtreme Tunisia',
    locale: 'fr_TN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased font-sans">
        <ProductProvider>
          <ContactProvider>
            <CompanySettingsProvider>
              <LanguageProvider>
                <TopBar />
                <Navbar />
                <main className="flex-1 w-full">
                  {children}
                </main>
                <Footer />
                <LanguageSwitcher />
              </LanguageProvider>
            </CompanySettingsProvider>
          </ContactProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
