import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MONARCH — Arise',
  description: 'The Shadow Monarch awakens. Command the shadows, conquer every dungeon, and build the ultimate shadow army in the Solo Leveling universe.',
  keywords: ['Solo Leveling', 'Monarch', 'Shadow Army', 'Arise', 'Dungeon', 'Gaming'],
  openGraph: {
    title: 'MONARCH — Arise',
    description: 'The Shadow Monarch awakens. Command the shadows, conquer every dungeon.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/zentry-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/general.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/circularweb-book.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/videos/hero-1.mp4" as="video" type="video/mp4" />
      </head>
      <body suppressHydrationWarning className="bg-monarch-void text-monarch-text antialiased">
        {children}
      </body>
    </html>
  );
}
