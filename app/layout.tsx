import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from '../utils/providers'
import CartDrawer from '@/components/cart/CartDrawer'

const vazir = localFont({
  src: '../public/fonts/vazirMatn/Vazirmatn-Regular.ttf',
  variable: '--font-vazir',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | دیجی استور',
    default: 'دیجی استور',
  },
  description: 'انواع وسایل دیجیتال',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${vazir.className} h-full antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
        <CartDrawer />
      </body>
    </html>
  )
}
