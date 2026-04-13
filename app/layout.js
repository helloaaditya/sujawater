import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import RefreshOnVisible from '@/components/RefreshOnVisible';
import { getSiteConfig } from '@/lib/data-source';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata = {
  title: {
    default: 'Suja Waterproofing & Epoxy Flooring | Bangalore',
    template: '%s',
  },
  description:
    'Suja Waterproofing Solutions – Epoxy tiles grouting, terrace waterproofing, bathroom waterproofing, swimming pool, basement & lift pit waterproofing in Bangalore. Call 9945843699.',
  keywords: [
    'waterproofing Bangalore',
    'terrace waterproofing',
    'bathroom waterproofing',
    'epoxy grouting',
    'basement waterproofing',
    'Suja Waterproofing',
    'P U systems',
    'epoxy flooring Bangalore',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
  },
  verification: {
    google: 'viIdgHY_FWf3xriwAW8J_ksTphhybf4yLLzIKYvVTiI',
  },
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
  const siteConfig = await getSiteConfig();
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="min-h-screen flex flex-col">
        <RefreshOnVisible />
        <LocalBusinessSchema siteConfig={siteConfig} />
        <Header siteConfig={siteConfig} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer siteConfig={siteConfig} />
        <FloatingCta siteConfig={siteConfig} />
      </body>
    </html>
  );
}
