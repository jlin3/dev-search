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
    <Container className="py-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link href="/" className="text-decoration-none">Home</Link>
        {' > '}
        <Link href="/find-developers" className="text-decoration-none">Find Developers</Link>
      </div>

      <Row>
        <Col md={4} className="mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <Image
                src={developer.picture.large}
                alt={`${developer.name.first} ${developer.name.last}`}
                width={150}
                height={150}
                className="rounded-circle mb-4"
              />
              <h1 className="h4 mb-2">{developer.name.first} {developer.name.last}</h1>
              <p className="text-muted mb-3">{developer.type}</p>
              <p className="mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                {developer.location.city}, {developer.location.country}
              </p>
              <p className="mb-4">
                <strong>Rate:</strong> ${developer.rate}/hour
              </p>
              <Button 
                variant="primary" 
                onClick={() => setShowInquiry(true)}
                className="w-100"
              >
                Connect
              </Button>
            </div>
          </div>
        </Col>

        <Col md={8}>
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">About</h2>
              <p className="text-muted mb-0">{developer.summary}</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h5 mb-4">Work Experience</h2>
              {developer.experience.map((exp: WorkExperience, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="h6 mb-1">{exp.title}</h3>
                  <p className="text-muted small mb-2">
                    {exp.company} • {exp.period}
                  </p>
                  <ul className="small mb-3 ps-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <p className="text-muted small mb-0">
                    <strong>Technologies:</strong> {exp.technologies}
                  </p>
                  {index < developer.experience.length - 1 && <hr className="my-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">Skills</h2>
              <div className="d-flex flex-wrap gap-2">
                {developer.skills.map(skill => (
                  <span 
                    key={skill}
                    className="badge bg-light text-dark py-2 px-3"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {showInquiry && (
        <InquiryModal
          dev={developer}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </Container>
  )
} 