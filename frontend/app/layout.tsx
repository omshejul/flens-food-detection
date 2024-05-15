import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

const fontName = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arthkin',
  description: 'Wellcome to Arthkin.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontName.className}>{children}</body>
    </html>
  )
}
