import './globals.css'
import { Inter } from 'next/font/google'
import { portfolioData } from '@/config/portfolio-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: portfolioData.seo.title,
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
