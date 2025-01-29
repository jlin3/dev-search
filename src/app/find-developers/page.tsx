'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import DeveloperCard from '@/components/Search/DeveloperCard'
import InquiryModal from '@/components/InquiryModal'
import Pagination from '@/components/Search/Pagination'
import type { Developer } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 12
const DEVELOPER_TYPES = [
  'Full-stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
]

const LOCATIONS = ['United States', 'Remote', 'Worldwide']

export default function FindDevelopersPage() {
  return (
    <RootLayout>
      <Header />
      <Suspense fallback={
        <Container>
          <div className="text-center py-5">
            <BeatLoader color="#007bff" />
          </div>
        </Container>
      }>
        <FindDevelopersContent />
      </Suspense>
    </RootLayout>
  )
}

function FindDevelopersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)
  
  // Get initial values from URL or defaults
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'Full-stack developer')
  const [searchLocation, setSearchLocation] = useState(searchParams.get('location') || 'United States')
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        console.log('Fetching developers with params:', { currentPage, searchType, searchLocation })
        setLoading(true)
        const { developers: data, total } = await getDevelopers(currentPage, ITEMS_PER_PAGE, searchType, searchLocation)
        console.log('Fetched developers:', { data, total })
        setDevelopers(data)
        setTotalDevelopers(total)
        setError('')
      } catch (error) {
        console.error('Failed to fetch developers:', error)
        setError('Failed to fetch developers. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopers()
  }, [currentPage, searchType, searchLocation])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('type', searchType)
    params.set('location', searchLocation)
    params.set('page', '1')
    router.push(`/find-developers?${params.toString()}`)
  }

  return (
    <Container>
      {/* Breadcrumb */}
      <div className="py-3">
        <Link href="/" className="text-decoration-none">Home</Link>
        {' > '}
        <span>Find Developers</span>
      </div>

      {/* Page Title */}
      <h1 className="h4 mb-4">Developer Search</h1>

      {/* Search Controls */}
      <div className="mb-4">
        <Row className="align-items-center justify-content-end">
          <Col md="auto">
            <Form className="d-flex flex-column flex-md-row gap-2">
              <div className="d-flex gap-2">
                <Form.Select 
                  className="w-auto flex-grow-0"
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value)
                    handleSearch()
                  }}
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
      </div>

      {/* Results */}
      {error ? (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="text-center py-5">
          <BeatLoader color="#007bff" />
        </div>
      ) : developers.length > 0 ? (
        <>
          <h2 className="h5 mb-4">
            {searchType}s in {searchLocation}
          </h2>
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
                  router.push(`/find-developers?${params.toString()}`)
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

      {selectedDev && (
        <InquiryModal
          dev={selectedDev}
          onClose={() => setSelectedDev(null)}
        />
      )}
    </Container>
  )
} 