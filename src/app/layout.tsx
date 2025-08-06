// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { dir } from 'i18next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rafael Rocha - Desenvolvedor',
  description: 'Portfolio e landing page do desenvolvedor',
}

export async function generateStaticParams() {
  return [{ locale: 'pt-BR' }, { locale: 'en-US' }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: { locale?: string }
}) {
  const locale = params?.locale || 'pt-BR';
  
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
