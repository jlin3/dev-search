'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'next/navigation'
import { getDeveloperById } from '@/services/api'
import type { Developer, WorkExperience } from '@/types'
import { BeatLoader } from 'react-spinners'
import InquiryModal from '@/components/InquiryModal'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
  const { id } = useParams()
  const [developer, setDeveloper] = useState<Developer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showInquiry, setShowInquiry] = useState(false)

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        setLoading(true)
        const data = await getDeveloperById(id as string)
        setDeveloper(data)
        setError('')
      } catch (error) {
        console.error('Failed to fetch developer:', error)
        setError('Failed to load developer profile. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDeveloper()
    }
  }, [id])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <BeatLoader color="#007bff" />
      </Container>
    )
  }

  if (error || !developer) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error || 'Developer not found'}</p>
        </div>
      </Container>
    )
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Header Section */}
      <div className="bg-white border-bottom">
        <Container className="py-4">
          {/* Breadcrumb */}
          <div className="d-flex align-items-center mb-4">
            <Link href="/" className="text-decoration-none text-muted">
              Home
            </Link>
            <span className="mx-2 text-muted">›</span>
            <Link href="/find-developers" className="text-decoration-none text-muted">
              Find Developers
            </Link>
          </div>

          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-4">
                <Image
                  src={developer.picture.large}
                  alt={`${developer.name.first} ${developer.name.last}`}
                  width={96}
                  height={96}
                  className="rounded-circle"
                  priority
                  quality={95}
                />
                <div>
                  <h1 className="h3 mb-2">{developer.name.first} {developer.name.last}</h1>
                  <p className="text-muted mb-2">{developer.type}</p>
                  <p className="mb-0">
                    <i className="bi bi-geo-alt me-2"></i>
                    {developer.location.city}, {developer.location.country}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-md-end mt-4 mt-md-0">
              <div className="d-flex flex-column align-items-md-end">
                <div className="mb-3">
                  <span className="h4 text-success mb-0">${developer.rate}</span>
                  <span className="text-muted">/hour</span>
                </div>
                <Button 
                  variant="primary" 
                  onClick={() => setShowInquiry(true)}
                  className="px-4"
                >
                  Connect
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          <Col md={8}>
            {/* Summary Section */}
            <div className="bg-white rounded-3 p-4 mb-4">
              <h2 className="h5 mb-3">About</h2>
              <p className="text-muted mb-0">{developer.summary}</p>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-3 p-4">
              <h2 className="h5 mb-4">Experience</h2>
              {developer.experience.map((exp: WorkExperience, index: number) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h3 className="h6 mb-1">{exp.title}</h3>
                      <p className="text-muted small mb-0">{exp.company}</p>
                    </div>
                    <span className="text-muted small">{exp.period}</span>
                  </div>
                  <ul className="small mb-3 ps-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="mb-2">{achievement}</li>
                    ))}
                  </ul>
                  <p className="text-muted small mb-0">
                    <strong>Technologies:</strong> {exp.technologies}
                  </p>
                  {index < developer.experience.length - 1 && <hr className="my-4" />}
                </div>
              ))}
            </div>
          </Col>

          <Col md={4}>
            {/* Skills Section */}
            <div className="bg-white rounded-3 p-4 mb-4">
              <h2 className="h5 mb-3">Skills</h2>
              <div className="d-flex flex-wrap gap-2">
                {developer.skills.map(skill => (
                  <span 
                    key={skill}
                    className="badge bg-light text-dark py-2 px-3 rounded-pill"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Can Help With Section */}
            <div className="bg-white rounded-3 p-4">
              <h2 className="h5 mb-3">{developer.name.first} can help you with:</h2>
              <ul className="list-unstyled mb-0">
                {developer.skills.map(skill => (
                  <li key={skill} className="mb-2">
                    <i className="bi bi-check2 text-success me-2"></i>
                    {skill} development
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {showInquiry && (
        <InquiryModal
          dev={developer}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  )
} 