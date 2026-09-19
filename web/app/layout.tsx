import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from './components'

export const metadata: Metadata = {
  title: 'Stećak Oracle',
  description: 'Explore stećci, motifs, history and documented sources.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-stone-100 antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
