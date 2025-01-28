'use client'

import React from 'react'
import Link from 'next/link'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Developer Search</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Browse Developers</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
} 