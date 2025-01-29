'use client'

import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'

const OPEN_POSITIONS = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Technical Support Specialist',
    department: 'Customer Success',
    location: 'New York, NY',
    type: 'Full-time'
  }
]

export default function CareersPage() {
  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Breadcrumb */}
        <div className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <span>Careers</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="h2 mb-4">Join Our Team</h1>
          <p className="text-muted mb-0">
            Help us build the future of developer hiring. We're looking for talented individuals<br />
            who are passionate about creating amazing experiences.
          </p>
        </div>

        {/* Open Positions */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <h2 className="h4 mb-4">Open Positions</h2>
            {OPEN_POSITIONS.map(position => (
              <Card key={position.id} className="mb-3">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h3 className="h5 mb-2">{position.title}</h3>
                      <p className="text-muted mb-0">
                        {position.department} · {position.location} · {position.type}
                      </p>
                    </Col>
                    <Col md={4} className="text-md-end mt-3 mt-md-0">
                      <Button 
                        variant="outline-primary"
                        onClick={() => alert('Application form coming soon!')}
                      >
                        Apply Now
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>

        {/* Benefits Section */}
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="bg-light rounded p-4">
              <h2 className="h4 mb-4">Why Work With Us?</h2>
              <Row>
                <Col md={6} className="mb-4">
                  <h3 className="h5 mb-3">Competitive Benefits</h3>
                  <ul className="text-muted">
                    <li>Comprehensive health, dental, and vision coverage</li>
                    <li>Flexible PTO policy</li>
                    <li>401(k) matching</li>
                    <li>Remote-first culture</li>
                  </ul>
                </Col>
                <Col md={6} className="mb-4">
                  <h3 className="h5 mb-3">Growth & Development</h3>
                  <ul className="text-muted">
                    <li>Learning and development stipend</li>
                    <li>Regular team events and offsites</li>
                    <li>Mentorship opportunities</li>
                    <li>Career advancement paths</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </RootLayout>
  )
} 