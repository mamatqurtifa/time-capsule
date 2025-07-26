import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '../components/Navbar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Time Capsule App',
  description: 'Create and share your memories across time and location',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen`}>
          
          {/* Navbar Component */}
          <Navbar />

          {/* Main Content */}
          <main className="pt-24">
            {children}
          </main>

          {/* Background decoration */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}