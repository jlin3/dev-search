'use client'

import { useEffect } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Search',
  description: 'Find and connect with developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 