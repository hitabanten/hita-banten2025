import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'HITA Banten',
  description: 'Himpunan IT Hotel Banten',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-white text-gray-800`}>
        
        <Header />

        {/* Main Wrapper */}
        <main className="container pt-10 pb-20">
          {children}
        </main>

        <Footer />
        <ScrollToTop />

      </body>
    </html>
  )
}
