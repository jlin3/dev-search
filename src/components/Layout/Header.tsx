'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Navbar, Form } from 'react-bootstrap'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DEVELOPER_TYPES = [
  'Full-stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSearchPage = pathname === '/find-developers'

  const handleSearch = (type?: string, location?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type) params.set('type', type)
    else params.delete('type')
    if (location) params.set('location', location)
    else params.delete('location')
    params.set('page', '1')
    router.push(`/find-developers?${params.toString()}`)
  }

  return (
    <header>
      {/* Main Navigation */}
      <Navbar bg="light" className="py-2 border-bottom">
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
              <Form.Select 
                className="w-auto"
                defaultValue={searchParams.get('type') || ''}
                onChange={(e) => handleSearch(e.target.value, searchParams.get('location') || undefined)}
                style={{ minWidth: '200px' }}
              >
                <option value="">All Types</option>
                {DEVELOPER_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
              <span className="text-white d-flex align-items-center">in</span>
              <Form.Control
                type="search"
                placeholder="Enter location"
                defaultValue={searchParams.get('location') || ''}
                onChange={(e) => handleSearch(searchParams.get('type') || undefined, e.target.value)}
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