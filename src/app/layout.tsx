'use client'

import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import { Container } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Search',
  description: 'Find and hire top developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={
          <Container>
            <div className="text-center py-5">
              <BeatLoader color="#007bff" />
            </div>
          </Container>
        }>
          {children}
        </Suspense>
      </body>
    </html>
  )
} 