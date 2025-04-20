import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PineSaga Studios',
  description: 'Where compelling narratives take center stage. An in-house production company dedicated to crafting impactful projects.',
  keywords: ['film', 'vfx', 'production', 'storytelling'],
  openGraph: {
    title: 'PineSaga Studios',
    description: 'Where compelling narratives take center stage',
    images: ['/img/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 