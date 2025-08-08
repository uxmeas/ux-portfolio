import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Case Study Generator',
  description: 'Generate beautiful portfolio case studies automatically',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}