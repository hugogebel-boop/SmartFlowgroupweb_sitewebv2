import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'SmartFlow Web',
  description: 'Agence web & design pour une présence en ligne durable.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-sf-bg text-sf-text">
      <body className={`${syne.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
