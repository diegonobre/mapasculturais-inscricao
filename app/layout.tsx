import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Mapa da Cultura | Versão Cleodon Silva',
  description: 'Versão Cleodon Silva do Mapa da Cultura desenvolvido por Recursive Solutions',
  openGraph: {
    title: 'Mapa da Cultura | Versão Cleodon Silva',
    description: 'Versão Cleodon Silva do Mapa da Cultura desenvolvido por Recursive Solutions',
    url: 'https://mapasculturais-nextjs.vercep.app/',
    siteName: 'Mapa da Cultura | Versão Cleodon Silva',
    images: [
      {
        url: '/home-header.png',
        width: 800,
        height: 600,
      },
      {
        url: '/home-header.png',
        width: 1800,
        height: 1600,
        alt: 'Mapa da Cultura | Versão Cleodon Silva',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
