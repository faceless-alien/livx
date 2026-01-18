import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://livx.org'),
  title: 'LIVX - Erasmus+ Youth Organization',
  description:
    'Live, Improve, Value, Exchange. LIVX empowers youth through Erasmus+ exchanges, volunteering, and non-formal education.',
  openGraph: {
    title: 'LIVX - Erasmus+ Youth Organization',
    description:
      'Live, Improve, Value, Exchange. LIVX empowers youth through Erasmus+ exchanges, volunteering, and non-formal education.',
    url: 'https://livx.org',
    siteName: 'LIVX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIVX - Erasmus+ Youth Organization',
    description:
      'Live, Improve, Value, Exchange. LIVX empowers youth through Erasmus+ exchanges, volunteering, and non-formal education.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
