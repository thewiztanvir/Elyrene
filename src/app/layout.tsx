import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Elyrène | Quiet Luxury Haute Couture',
  description: 'Redefining modern heirloom fashion through meticulous craftsmanship and quiet luxury. Shop exclusive sarees, bangles, and ornaments.',
  keywords: 'luxury fashion, sarees, haute couture, indian heritage, gold bangles, heirloom fashion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts loaded via CSS, see globals.css */}
      </head>
      <body className="bg-ivory text-noir antialiased font-body-md overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
