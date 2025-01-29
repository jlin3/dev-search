'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Navbar } from 'react-bootstrap'

export default function Header() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="py-2">
        <Container fluid className="px-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link href="/" className="text-white text-decoration-none fw-normal">
              Developer Search
            </Link>
            <Link href="/browse" className="text-white text-decoration-none fw-normal">
              Browse Developers
            </Link>
          </div>
        </Container>
      </Navbar>
      <Container fluid className="border-bottom bg-white">
        <Container className="py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h4 mb-0">Developer Search</h1>
            <Link href="/browse" className="text-primary text-decoration-none">
              Browse Developers
            </Link>
          </div>
        </Container>
      </Container>
    </>
  )
} 