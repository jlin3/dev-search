'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import DeveloperCard from '@/components/Search/DeveloperCard'
import Filters from '@/components/Search/Filters'
import Pagination from '@/components/Search/Pagination'
import InquiryModal from '@/components/InquiryModal'
import ErrorBoundary from '@/components/ErrorBoundary'
import type { Developer, Filters as FilterType } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 8

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Get page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1
  
  // Get filters from URL
  const initialFilters = {
    type: searchParams.get('type') || '',
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || []
  }
  
  const [filters, setFilters] = useState<FilterType>(initialFilters)
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)

  // Update URL when filters change
  const updateFilters = (newFilters: FilterType) => {
    const params = new URLSearchParams()
    if (newFilters.type) params.set('type', newFilters.type)
    if (newFilters.skills.length) params.set('skills', newFilters.skills.join(','))
    
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
        const { developers: data, total } = await getDevelopers(currentPage, ITEMS_PER_PAGE)
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
  }, [currentPage])

  // Handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
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
    <ErrorBoundary>
      <RootLayout>
        <Container fluid>
          <div className="d-flex align-items-center mb-4">
            <h1 className="mb-0">Top full-stack developers in United States</h1>
            <div className="ms-auto">
              <Form.Select className="d-inline-block w-auto me-2">
                <option>Full-stack developer in</option>
                <option>Frontend developer in</option>
                <option>Backend developer in</option>
              </Form.Select>
              <Form.Control
                type="text"
                placeholder="United States"
                className="d-inline-block w-auto"
              />
            </div>
          </div>

          <Row>
            <Col lg={3}>
              <Filters filters={filters} setFilters={setFilters} />
            </Col>
            <Col lg={9}>
              <Row xs={1} md={2} className="g-4">
                {developers.map(dev => (
                  <Col key={dev.login.uuid}>
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
            </Col>
          </Row>

          {selectedDev && (
            <InquiryModal
              dev={selectedDev}
              onClose={() => setSelectedDev(null)}
            />
          )}
        </Container>
      </RootLayout>
    </ErrorBoundary>
  )
} 