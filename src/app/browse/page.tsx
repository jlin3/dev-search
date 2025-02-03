'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'
import { getDevelopers } from '@/services/api'
import DeveloperCard from '@/components/Search/DeveloperCard'
import InquiryModal from '@/components/InquiryModal'
import Pagination from '@/components/Search/Pagination'
import FilterSidebar from '@/components/Search/FilterSidebar'
import type { Developer } from '@/types'

const ITEMS_PER_PAGE = 12

export default function BrowsePage() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true)
        const { developers: data, total } = await getDevelopers(
          currentPage,
          selectedType === 'All Types' ? undefined : selectedType,
          undefined,
          selectedSkills
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
  }, [currentPage, selectedType, selectedSkills])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Navigation */}
        <Row className="py-4 mb-3 align-items-center">
          <Col><h1 className="h4 mb-0">Browse Developers</h1></Col>
          <Col className="text-end">
            <Link href="/" className="btn btn-outline-primary">Back to Search</Link>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <FilterSidebar
              type={selectedType}
              selectedSkills={selectedSkills}
              onTypeChange={setSelectedType}
              onSkillsChange={setSelectedSkills}
            />
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
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-muted">Showing {developers.length} of {totalDevelopers} developers</p>
                </div>
                <Row className="g-4">
                  {developers.map(dev => (
                    <Col md={6} lg={4} key={dev.login.uuid}>
                      <DeveloperCard dev={dev} onSelect={setSelectedDev} />
                    </Col>
                  ))}
                </Row>

                {totalDevelopers > ITEMS_PER_PAGE && (
                  <div className="d-flex justify-content-center mt-4">
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