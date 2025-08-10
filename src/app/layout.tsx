// src/app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { dir } from 'i18next'
import Script from 'next/script'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

// Viewport config separated as per Next.js recommendations
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  title: 'Rafael Rocha - Desenvolvedor',
  description: 'Portfolio e landing page do desenvolvedor',
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export async function generateStaticParams() {
  return [{ locale: 'pt-BR' }, { locale: 'en-US' }, { locale: 'es-ES' }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { locale?: string }
}) {
  const locale = params?.locale || 'pt-BR';
  const HalftonePulse = dynamic(() => import('./components/HalftonePulse'), { ssr: false });
  
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} antialiased bg-black text-white overflow-x-hidden`}>
        {/* Sitewide pulsing halftone background */}
        <div className="fixed inset-0 -z-10">
          <HalftonePulse opacity={0.18} dotGap={24} dotSize={2} amplitude={0.8} frequency={0.012} speed={0.02} pulseSpeed={0.5} />
        </div>

        {children}
        
        {/* Performance optimization script - Run after page loads */}
        <Script
          id="performance-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Simplified performance optimization
              // 1. Preconnect to common domains
              const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
              domains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
              });
              
              // 2. Register service worker if supported
              if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(err => {
                    console.log('Service worker registration failed:', err);
                  });
                });
              }
              
              // 3. Report Web Vitals for analytics
              function reportWebVitals() {
                try {
                  const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      // You can send this data to your analytics
                      console.log('[Web Vitals]', entry.name, Math.round(entry.startTime), Math.round(entry.value));
                    });
                  });
                  observer.observe({ type: 'layout-shift', buffered: true });
                  observer.observe({ type: 'largest-contentful-paint', buffered: true });
                  observer.observe({ type: 'first-input', buffered: true });
                } catch (e) {
                  console.log('WebVitals reporting error:', e);
                }
              }
              reportWebVitals();
            `
          }}
        />
      </body>
    </html>
  )
}
