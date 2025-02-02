'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Nav, Navbar as BSNavbar } from 'react-bootstrap'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <BSNavbar expand="lg" className="bg-white border-bottom shadow-sm py-3">
      <Container>
        <Link href="/" className="navbar-brand fw-bold text-primary">
          DevSearch
        </Link>
        
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link 
              href="/find-developers" 
              className={`nav-link ${pathname === '/find-developers' ? 'active fw-semibold' : ''}`}
            >
              Find Developers
            </Link>
            <Link 
              href="/resources" 
              className={`nav-link ${pathname === '/resources' ? 'active fw-semibold' : ''}`}
            >
              Resources
            </Link>
          </Nav>
          
          <Nav>
            <Link 
              href="/sign-up" 
              className={`nav-link ${pathname === '/sign-up' ? 'active fw-semibold' : ''}`}
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="nav-link btn btn-primary text-white px-4 ms-2"
            >
              Login
            </Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
} 