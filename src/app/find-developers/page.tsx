'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
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
  'DevOps engineer',
]

const LOCATIONS = ['United States', 'Remote', 'Worldwide']

export default function FindDevelopersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)
  const [searchType, setSearchType] = useState('Full-stack developer')
  const [searchLocation, setSearchLocation] = useState('United States')
  
  // Get page from URL or default to 1
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
    const params = new URLSearchParams()
    params.set('type', searchType)
    params.set('location', searchLocation)
    params.set('page', '1')
    router.push(`/find-developers?${params.toString()}`)
  }

  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Search Controls */}
        <div className="mb-4">
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Developer Type</Form.Label>
                <Form.Select
                  value={searchType}
                  onChange={(e) => {
                    setSearchType(e.target.value)
                    handleSearch()
                  }}
                >
                  {DEVELOPER_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Select
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value)
                    handleSearch()
                  }}
                >
                  {LOCATIONS.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {/* Title */}
        <h1 className="h4 mb-4">
          {searchType}s in {searchLocation}
        </h1>

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
            <Row className="g-4">
              {developers.map(dev => (
                <Col md={6} lg={4} key={dev.login.uuid}>
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
    </RootLayout>
  )
} 