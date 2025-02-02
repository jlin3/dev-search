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

      {/* Developer Header */}
      <div className="mb-5">
        <h1 className="h2 mb-2">{developer.name.first} {developer.name.last}</h1>
        <p className="text-muted mb-2">
          {developer.type} • <Image src="/icons/location.svg" alt="Location" width={16} height={16} className="me-1" />
          {developer.location.city}, {developer.location.country}
        </p>
      </div>

      <Row>
        <Col lg={8}>
          {/* About Section */}
          <div className="mb-5">
            <div className="d-flex align-items-center mb-4">
              <Image
                src={developer.picture.large}
                alt={`${developer.name.first} ${developer.name.last}`}
                width={100}
                height={100}
                className="rounded-circle me-4"
              />
              <div>
                <p className="mb-3">{developer.summary}</p>
                <Button 
                  variant="outline-primary" 
                  onClick={() => setShowInquiry(true)}
                  className="px-4"
                >
                  Connect
                </Button>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-5">
            <h2 className="h5 mb-4">Experience</h2>
            {developer.experience.map((exp: WorkExperience, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="h6 mb-2">{exp.title}</h3>
                <p className="text-muted small mb-2">
                  {exp.company} • {exp.period}
                </p>
                <ul className="small mb-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                <p className="text-muted small mb-0">
                  <strong>Technologies:</strong> {exp.technologies}
                </p>
              </div>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          {/* Skills Section */}
          <div className="mb-4">
            <h2 className="h5 mb-3">George can help you with:</h2>
            <ul className="list-unstyled">
              {developer.skills.map(skill => (
                <li key={skill} className="mb-2">
                  <Image src="/icons/check.svg" alt="Check" width={16} height={16} className="me-2" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Rate Section */}
          <div className="mb-4">
            <h2 className="h5 mb-3">Rate</h2>
            <p className="mb-0">${developer.rate}/hour</p>
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