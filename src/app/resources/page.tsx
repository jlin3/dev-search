'use client'

import React from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'

export default function ResourcesPage() {
  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Breadcrumb */}
        <div className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <span>Resources</span>
        </div>

        <h1 className="h4 mb-4">Resources</h1>
        
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Coming Soon</h5>
            <p className="card-text">Our resources section is currently under development. Check back soon for helpful content and tools.</p>
          </div>
        </div>
      </Container>
    </RootLayout>
  )
} 