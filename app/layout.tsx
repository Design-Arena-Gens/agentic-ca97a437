import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentic Mobile App',
  description: 'Mobile-first PWA powered by Next.js',
  manifest: '/manifest.webmanifest',
  themeColor: '#111827',
  icons: {
    icon: '/icons/icon.svg',
    apple: '/icons/icon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').catch(() => {});
            });
          }
        ` }} />
        {children}
      </body>
    </html>
  );
}
