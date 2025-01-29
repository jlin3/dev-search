'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import DeveloperCard from '@/components/Search/DeveloperCard'
import InquiryModal from '@/components/InquiryModal'
import Pagination from '@/components/Search/Pagination'
import type { Developer } from '@/types'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 12
const DEVELOPER_TYPES = [
  'Full-stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
]

export default function FindDevelopersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)
  
  // Get initial values from URL or defaults
  const [searchType, setSearchType] = useState(searchParams.get('type') || '')
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true)
        const { developers: data, total } = await getDevelopers(
          currentPage, 
          ITEMS_PER_PAGE, 
          searchType || undefined, 
          searchParams.get('location') || undefined
        )
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
  }, [currentPage, searchType, searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchType) params.set('type', searchType)
    params.set('page', '1')
    router.push(`/find-developers?${params.toString()}`)
  }

  return (
    <Container>
      {/* Filters Section */}
      <div className="bg-light rounded p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h5 mb-0">Filter Developers</h2>
          <div className="text-muted">
            {totalDevelopers} developers available
          </div>
        </div>

        <Row>
          <Col md={3}>
            {/* Developer Type Filter */}
            <div className="mb-4">
              <h3 className="h6 mb-3">DEVELOPER TYPE</h3>
              <div className="d-flex flex-column gap-2">
                <Form.Check
                  type="radio"
                  id="type-all"
                  label="All Types"
                  checked={!searchType}
                  onChange={() => {
                    setSearchType('')
                    handleSearch()
                  }}
                />
                {DEVELOPER_TYPES.map(type => (
                  <Form.Check
                    key={type}
                    type="radio"
                    id={`type-${type}`}
                    label={type}
                    checked={searchType === type}
                    onChange={() => {
                      setSearchType(type)
                      handleSearch()
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>

          <Col md={9}>
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
                <p className="text-muted mb-0">No developers found matching your criteria.</p>
              </div>
            )}
          </Col>
        </Row>
      </div>

      {selectedDev && (
        <InquiryModal
          dev={selectedDev}
          onClose={() => setSelectedDev(null)}
        />
      )}
    </Container>
  )
} 