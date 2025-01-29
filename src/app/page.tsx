'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import DeveloperCard from '@/components/Search/DeveloperCard'
import Filters from '@/components/Search/Filters'
import Pagination from '@/components/Search/Pagination'
import InquiryModal from '@/components/InquiryModal'
import type { Developer, Filters as FilterType } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 8

const DEVELOPER_TYPES = [
  'Full-stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
]

export default function Home() {
  return (
    <RootLayout>
      <Header />
      <Suspense fallback={
        <div className="text-center py-5">
          <BeatLoader color="#007bff" />
        </div>
      }>
        <HomeContent />
      </Suspense>
    </RootLayout>
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
  const [searchType, setSearchType] = useState('Full-stack developer')
  const [searchLocation, setSearchLocation] = useState('United States')
  
  // Get page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1
  
  // Get filters from URL
  const initialFilters = {
    type: searchParams.get('type') || 'Full-stack developer',
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || []
  }
  
  const [filters, setFilters] = useState<FilterType>(initialFilters)
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)

  // Initial fetch on mount
  useEffect(() => {
    const fetchInitialDevelopers = async () => {
      try {
        console.log('Starting initial fetch with:', { searchType, searchLocation });
        setLoading(true);
        const { developers: data, total } = await getDevelopers(1, ITEMS_PER_PAGE, { type: 'Full-stack developer', skills: [] }, 'United States');
        console.log('Initial fetch results:', { data, total });
        setDevelopers(data);
        setTotalDevelopers(total);
        setError('');
      } catch (error) {
        console.error('Failed to fetch initial developers:', error);
        setError('Failed to fetch developers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialDevelopers();
  }, []); // Empty dependency array to only run on mount

  // Fetch when filters change
  useEffect(() => {
    if (!searchParams.get('type')) return; // Don't run if no type in URL (initial load)

    const fetchDevelopers = async () => {
      try {
        console.log('Fetching with filters:', { filters, searchLocation });
        setLoading(true);
        const { developers: data, total } = await getDevelopers(currentPage, ITEMS_PER_PAGE, filters, searchLocation);
        console.log('Filter fetch results:', { data, total });
        setDevelopers(data);
        setTotalDevelopers(total);
        setError('');
      } catch (error) {
        console.error('Failed to fetch developers:', error);
        setError('Failed to fetch developers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, [currentPage, filters, searchLocation, searchParams]);

  // Handle search
  const handleSearch = async () => {
    try {
      setLoading(true)
      const { developers: data, total } = await getDevelopers(1, ITEMS_PER_PAGE, { type: searchType, skills: [] }, searchLocation)
      setDevelopers(data)
      setTotalDevelopers(total)
      setError('')
      
      const params = new URLSearchParams()
      params.set('type', searchType)
      params.set('location', searchLocation)
      router.push(`/?${params.toString()}`)
    } catch (error) {
      console.error('Failed to fetch developers:', error)
      setError('Failed to fetch developers. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="px-0">
      {/* Navigation */}
      <Container className="py-3">
        <Row className="justify-content-between align-items-center">
          <Col>
            <h1 className="h4 mb-0">Developer Search</h1>
          </Col>
          <Col className="text-end">
            <Link href="/browse" className="text-decoration-none">
              Browse Developers
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Search Header */}
      <Container className="py-4">
        <Row className="align-items-center justify-content-end">
          <Col md="auto">
            <Form className="d-flex flex-column flex-md-row gap-2">
              <div className="d-flex gap-2">
                <Form.Select 
                  className="w-auto flex-grow-0"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  title="Developer type"
                  aria-label="Select developer type"
                  style={{ minWidth: '200px' }}
                >
                  {DEVELOPER_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
                <span className="d-flex align-items-center">in</span>
              </div>
              <Form.Control
                type="text"
                placeholder="Enter country name"
                className="w-auto flex-grow-0"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                style={{ minWidth: '300px' }}
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
      </Container>

      {error ? (
        <div className="alert alert-danger m-4" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
      ) : (
        <Container>
          <Row>
            {/* Filters Sidebar */}
            <Col lg={3} className="mb-4 mb-lg-0">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="text-uppercase mb-3 text-secondary fw-bold">Developer type:</h6>
                  <div className="d-flex justify-content-between align-items-center d-lg-none mb-3">
                    <Button 
                      variant="link" 
                      className="p-0 text-decoration-none"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  <div className={`filters-content ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
                    <Filters filters={filters} setFilters={setFilters} />
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
              ) : developers.length > 0 ? (
                <>
                  <h2 className="h5 mb-4">Top {searchType}s in {searchLocation}</h2>
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
                        onPageChange={(page) => {
                          const params = new URLSearchParams(searchParams.toString())
                          params.set('page', page.toString())
                          router.push(`/?${params.toString()}`)
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <p>No developers found matching your criteria.</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}

      {selectedDev && (
        <InquiryModal
          dev={selectedDev}
          onClose={() => setSelectedDev(null)}
        />
      )}
    </Container>
  )
} 