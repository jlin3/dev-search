'use client'

import React, { Suspense } from 'react'
import { Container } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'
import FindDevelopersContent from '@/components/FindDevelopers/FindDevelopersContent'

export default function FindDevelopersPage() {
  return (
    <RootLayout>
      <Header />
      <Suspense fallback={
        <Container>
          <div className="text-center py-5">
            <BeatLoader color="#007bff" />
          </div>
        </Container>
      }>
        <FindDevelopersContent />
      </Suspense>
    </RootLayout>
  )
} 