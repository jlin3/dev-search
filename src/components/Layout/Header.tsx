'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Navbar, Nav } from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" className="py-2">
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link href="/" className="text-white text-decoration-none">
            Developer Search
          </Link>
          <Nav>
            <Link href="/browse" className="text-white text-decoration-none">
              Browse Developers
            </Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  )
} 