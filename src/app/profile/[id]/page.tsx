'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import { useParams } from 'next/navigation'
import { getDeveloperById } from '@/services/api'
import type { Developer, WorkExperience } from '@/types'
import { BeatLoader } from 'react-spinners'
import InquiryModal from '@/components/InquiryModal'
import Image from 'next/image'

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
    <Container className="py-5">
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-4">
                <Image
                  src={developer.picture.large}
                  alt={`${developer.name.first} ${developer.name.last}`}
                  width={150}
                  height={150}
                  className="rounded-circle"
                />
              </div>
              
              <h1 className="h4 mb-2">
                {developer.name.first} {developer.name.last}
              </h1>
              
              <p className="text-muted mb-4">{developer.type}</p>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setShowInquiry(true)}
                >
                  Connect
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body>
              <h5 className="mb-3">Location</h5>
              <p className="mb-0">
                {developer.location.city}, {developer.location.country}
              </p>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body>
              <h5 className="mb-3">Rate</h5>
              <p className="mb-0">${developer.rate}/hour</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">About</h5>
              <p className="text-muted">{developer.summary}</p>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Skills</h5>
              <div>
                {developer.skills.map(skill => (
                  <Badge 
                    key={skill} 
                    bg="light" 
                    text="dark"
                    className="me-2 mb-2 py-2 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Experience</h5>
              {developer.experience.map((exp: WorkExperience, index: number) => (
                <div key={index} className="mb-4">
                  <h6 className="mb-2">{exp.title}</h6>
                  <p className="text-muted mb-2">
                    {exp.company} • {exp.period}
                  </p>
                  <ul className="mb-3">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <p className="text-muted mb-0">
                    <strong>Technologies:</strong> {exp.technologies}
                  </p>
                </div>
              ))}
            </Card.Body>
          </Card>
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