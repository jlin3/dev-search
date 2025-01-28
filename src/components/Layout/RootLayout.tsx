'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 