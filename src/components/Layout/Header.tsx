'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Navbar } from 'react-bootstrap'

export default function Header() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="py-2">
        <Container>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link href="/" className="text-white text-decoration-none">
              Developer Search
            </Link>
            <div className="d-flex gap-4">
              <Link href="/find-developers" className="text-white text-decoration-none">
                Find Developers
              </Link>
              <Link href="/resources" className="text-white text-decoration-none">
                Resources
              </Link>
              <Link href="/login" className="text-white text-decoration-none">
                Login
              </Link>
            </div>
          </div>
        </Container>
      </Navbar>
      <Container fluid className="border-bottom bg-white">
        <Container className="py-3">
          <div className="d-flex align-items-center">
            <Link href="/" className="text-decoration-none text-dark">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-muted">Find Developers</span>
          </div>
        </Container>
      </Container>
    </>
  )
} 