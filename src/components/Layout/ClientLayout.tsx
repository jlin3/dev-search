'use client'

import React, { Suspense } from 'react'
import { Container } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Suspense fallback={
      <Container>
        <div className="text-center py-5">
          <BeatLoader color="#007bff" />
        </div>
      </Container>
    }>
      {children}
    </Suspense>
  )
} 