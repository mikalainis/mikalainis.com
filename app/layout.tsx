import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mikalainis.com'),
  title: 'Paulius Mikalainis | Principal Data Scientist & AI/ML Leader',
  description:
    'Principal Data Scientist with 9+ years of expertise in scalable ML systems, GenAI/LLM applications, predictive modeling, and NLP — delivering $14M+ business impact at Verizon.',
  keywords: [
    'Paulius Mikalainis',
    'Data Scientist',
    'Machine Learning',
    'AI',
    'GenAI',
    'LLM',
    'Python',
    'NLP',
    'Verizon',
    'Financial Analytics',
    'Basking Ridge NJ',
  ],
  authors: [{ name: 'Paulius Mikalainis', url: 'https://mikalainis.com' }],
  openGraph: {
    title: 'Paulius Mikalainis | Principal Data Scientist & AI/ML Leader',
    description:
      'Principal Data Scientist with 9+ years in ML, GenAI/LLM, and financial analytics — with documented $14M monthly business impact.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Paulius Mikalainis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulius Mikalainis | Principal Data Scientist',
    description: 'Principal Data Scientist · GenAI/LLM Expert · Verizon · 9+ Years Experience',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
