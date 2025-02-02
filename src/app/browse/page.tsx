'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import DeveloperCard from '@/components/Search/DeveloperCard'
import InquiryModal from '@/components/InquiryModal'
import type { Developer } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'
import { getDevelopers } from '@/services/api'

const ITEMS_PER_PAGE = 12

export default function BrowsePage() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true)
        const { developers: data } = await getDevelopers(1, ITEMS_PER_PAGE)
        setDevelopers(data)
        setError('')
      } catch (error) {
        console.error('Failed to fetch developers:', error)
        setError('Failed to fetch developers. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopers()
  }, [])

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
          <Row className="g-4">
            {developers.map(dev => (
              <Col md={6} lg={4} key={dev.login.uuid}>
                <DeveloperCard dev={dev} onSelect={setSelectedDev} />
              </Col>
            ))}
          </Row>
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