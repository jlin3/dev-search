'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import DeveloperCard from '@/components/Search/DeveloperCard'
import Filters from '@/components/Search/Filters'
import Pagination from '@/components/Search/Pagination'
import InquiryModal from '@/components/InquiryModal'
import type { Developer, Filters as FilterType } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 8

const DEVELOPER_TYPES = [
  'Full-stack developer in',
  'Frontend developer in',
  'Backend developer in',
  'Mobile developer in',
  'Data scientist in'
]

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [searchType, setSearchType] = useState('Full-stack developer in')
  const [searchLocation, setSearchLocation] = useState('United States')
  
  // Get page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1
  
  // Get filters from URL
  const initialFilters = {
    type: searchParams.get('type') || '',
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || []
  }
  
  const [filters, setFilters] = useState<FilterType>(initialFilters)
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)

  // Handle search
  const handleSearch = () => {
    const type = searchType.replace(' in', '')
    const params = new URLSearchParams()
    params.set('type', type)
    params.set('location', searchLocation)
    router.push(`/?${params.toString()}`)
    setFilters({ ...filters, type })
  }

  // Update URL when filters change
  const updateFilters = (newFilters: FilterType) => {
    const params = new URLSearchParams()
    if (newFilters.type) params.set('type', newFilters.type)
    if (newFilters.skills.length) params.set('skills', newFilters.skills.join(','))
    if (searchLocation) params.set('location', searchLocation)
    
    // Preserve current page if it exists
    const page = searchParams.get('page')
    if (page) params.set('page', page)
    
    router.push(`/?${params.toString()}`)
    setFilters(newFilters)
  }

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true)
        const { developers: data, total } = await getDevelopers(currentPage, ITEMS_PER_PAGE, filters, searchLocation)
        setDevelopers(data)
        setTotalDevelopers(total)
        setError('')
      } catch (error) {
        setError('Failed to fetch developers. Please try again later.')
        console.error('Failed to fetch developers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopers()
  }, [currentPage, filters, searchLocation])

  // Handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()
    
    // Preserve existing filters
    const type = searchParams.get('type')
    const skills = searchParams.get('skills')
    const location = searchParams.get('location')
    
    if (type) params.set('type', type)
    if (skills) params.set('skills', skills)
    if (location) params.set('location', location)
    
    // Set new page
    params.set('page', page.toString())
    
    router.push(`/?${params.toString()}`)
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <RootLayout>
      <Container fluid className="px-0">
        {/* Single Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <Container>
            <Link href="/" className="navbar-brand fs-4">Developer Search</Link>
            <div className="d-flex align-items-center gap-3">
              <Link 
                href="/browse-developers" 
                className="nav-link text-white"
              >
                Browse Developers
              </Link>
              <Link 
                href="/resources" 
                className="nav-link text-white"
              >
                Resources
              </Link>
              <div className="ms-3">
                <Button variant="outline-light" size="sm" className="me-2">Sign Up</Button>
                <Button variant="light" size="sm">Login</Button>
              </div>
            </div>
          </Container>
        </nav>

        {/* Search Header */}
        <Container>
          <div className="search-header mb-4">
            <Row className="align-items-center">
              <Col>
                <Form className="d-flex flex-column flex-md-row gap-2">
                  <Form.Select 
                    className="w-auto"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    {DEVELOPER_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter country name"
                    className="w-auto"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <Button 
                    variant="primary" 
                    className="px-4"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>

          <Row>
            {/* Filters Sidebar - Collapsible on mobile */}
            <Col lg={3} className="mb-4 mb-lg-0">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center d-lg-none mb-3">
                    <h5 className="mb-0">Filters</h5>
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  <div className={`filters-content ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
                    <Filters filters={filters} setFilters={updateFilters} />
                  </div>
                </div>
              </div>
            </Col>

            {/* Main Content */}
            <Col lg={9}>
              {loading ? (
                <div className="text-center py-5">
                  <BeatLoader color="#007bff" />
                </div>
              ) : (
                <>
                  <Row className="g-4">
                    {developers.map(dev => (
                      <Col xs={12} key={dev.login.uuid}>
                        <DeveloperCard dev={dev} onSelect={setSelectedDev} />
                      </Col>
                    ))}
                  </Row>
                  
                  {totalDevelopers > ITEMS_PER_PAGE && (
                    <div className="mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalDevelopers / ITEMS_PER_PAGE)}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>

        {selectedDev && (
          <InquiryModal
            dev={selectedDev}
            onClose={() => setSelectedDev(null)}
          />
        )}
      </Container>
    </RootLayout>
  )
} 