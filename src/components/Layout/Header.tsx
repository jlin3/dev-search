'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Navbar, Form } from 'react-bootstrap'
import { usePathname } from 'next/navigation'

const DEVELOPER_TYPES = [
  'Full-stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
]

export default function Header() {
  const pathname = usePathname()
  const isSearchPage = pathname === '/find-developers'

  return (
    <header>
      {/* Main Navigation */}
      <Navbar bg="white" className="py-2">
        <Container className="justify-content-end">
          <div className="d-flex gap-4">
            <Link href="/find-developers" className="text-secondary text-decoration-none">
              Find Developers
            </Link>
            <Link href="/resources" className="text-secondary text-decoration-none">
              Resources
            </Link>
            <Link href="/sign-up" className="text-secondary text-decoration-none">
              Sign Up
            </Link>
            <Link href="/login" className="text-decoration-none">
              <button className="btn btn-primary btn-sm">
                Login
              </button>
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Search Section */}
      {isSearchPage && (
        <div className="bg-primary">
          <Container>
            {/* Breadcrumb */}
            <div className="d-flex py-2">
              <Link href="/" className="text-white text-decoration-none">
                Home
              </Link>
              <span className="text-white mx-2">›</span>
              <span className="text-white">Find Developers</span>
            </div>
            
            {/* Search Controls */}
            <div className="d-flex pb-3 gap-2">
              <div className="dropdown">
                <button 
                  className="btn btn-light dropdown-toggle text-start" 
                  type="button"
                  style={{ minWidth: '200px' }}
                >
                  Full-stack developer
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="United States"
                style={{ maxWidth: '300px' }}
              />
              <button className="btn btn-secondary px-4">
                Search
              </button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
} 