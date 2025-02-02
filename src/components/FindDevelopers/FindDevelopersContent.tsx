'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import { useRouter, useSearchParams } from 'next/navigation'
import DeveloperCard from '@/components/Search/DeveloperCard'
import InquiryModal from '@/components/InquiryModal'
import Pagination from '@/components/Search/Pagination'
import FilterSidebar from '@/components/Search/FilterSidebar'
import type { Developer } from '@/types'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 12

export default function FindDevelopersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [totalDevelopers, setTotalDevelopers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)
  
  // Get search parameters
  const page = parseInt(searchParams.get('page') || '1')
  const searchType = searchParams.get('type') || ''
  const searchLocation = searchParams.get('location') || ''
  const selectedSkills = searchParams.get('skills')?.split(',').filter(Boolean) || []

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true)
        const { developers: data, total } = await getDevelopers(
          page,
          searchType || undefined,
          searchLocation || undefined,
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
  }, [page, searchType, searchLocation, selectedSkills])

  const updateSearchParams = (updates: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','))
        } else {
          params.delete(key)
        }
      } else {
        params.set(key, value)
      }
    })
    
    // Reset to page 1 when filters change
    params.set('page', '1')
    router.push(`/find-developers?${params.toString()}`)
  }

  const handleTypeChange = (type: string) => {
    updateSearchParams({ type: type || null })
  }

  const handleSkillsChange = (skills: string[]) => {
    updateSearchParams({ skills: skills })
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
    <Container>
      <div className="bg-light rounded p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h5 mb-0">Find Developers</h2>
          <div className="text-muted">
            {totalDevelopers} developers available
          </div>
        </div>

        <Row>
          <Col md={3}>
            <FilterSidebar
              type={searchType}
              selectedSkills={selectedSkills}
              onTypeChange={handleTypeChange}
              onSkillsChange={handleSkillsChange}
            />
          </Col>

          <Col md={9}>
            {loading ? (
              <div className="text-center py-5">
                <BeatLoader color="#007bff" />
              </div>
            ) : developers.length > 0 ? (
              <>
                <h2 className="h5 mb-4">
                  {searchType ? `Top ${searchType}s` : 'All Developers'}
                  {searchLocation && ` in ${searchLocation}`}
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
                      currentPage={page}
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