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
      <Navbar bg="white" className="py-3 border-bottom shadow-sm">
        <Container>
          <Link href="/" className="navbar-brand fw-bold text-primary me-4">
            DevSearch
          </Link>
          
          <div className="d-flex align-items-center gap-4 flex-grow-1">
            <Link 
              href="/find-developers" 
              className={`text-decoration-none ${pathname === '/find-developers' ? 'text-primary fw-semibold' : 'text-secondary'}`}
            >
              Find Developers
            </Link>
            <Link 
              href="/resources" 
              className={`text-decoration-none ${pathname === '/resources' ? 'text-primary fw-semibold' : 'text-secondary'}`}
            >
              Resources
            </Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link 
              href="/sign-up" 
              className={`text-decoration-none ${pathname === '/sign-up' ? 'text-primary fw-semibold' : 'text-secondary'}`}
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="btn btn-primary px-4 py-2"
            >
              Login
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Search Section */}
      {isSearchPage && (
        <div className="bg-primary py-4">
          <Container>
            {/* Breadcrumb */}
            <div className="d-flex mb-3">
              <Link href="/" className="text-white text-decoration-none opacity-75">
                Home
              </Link>
              <span className="text-white mx-2 opacity-75">›</span>
              <span className="text-white">Find Developers</span>
            </div>
            
            {/* Search Controls */}
            <div className="d-flex gap-3">
              <Form.Select 
                className="w-auto flex-grow-0"
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
                className="flex-grow-0"
                style={{ width: '300px' }}
              />
              <button className="btn btn-light px-4">
                Search
              </button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
} 