import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Peca Journal | Modern travel and culture news',
    template: '%s | Peca Journal'
  },
  description:
    'Peca Journal delivers thoughtful travel reporting, cultural essays, and smart itineraries built for modern explorers.',
  metadataBase: new URL('https://peca-journal.example.com'),
  openGraph: {
    title: 'Peca Journal',
    description:
      'Peca Journal delivers thoughtful travel reporting, cultural essays, and smart itineraries built for modern explorers.',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
