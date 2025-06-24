import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Masks & masquerades',
  description: 'Created by Eltek',
  generator: 'v0.dev',
  other: {
    "google-site-verification": "google19407f08efd9ea64"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
