'use client'

import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'

const PRESS_RELEASES = [
  {
    id: 1,
    date: 'March 15, 2024',
    title: 'Developer Search Platform Launches to Connect Top Tech Talent',
    excerpt: 'New platform aims to revolutionize how companies find and hire skilled developers.'
  },
  {
    id: 2,
    date: 'March 1, 2024',
    title: 'Platform Reaches 10,000 Developer Milestone',
    excerpt: 'Growing developer community demonstrates strong market demand for specialized tech talent.'
  },
  {
    id: 3,
    date: 'February 15, 2024',
    title: 'New Features Added to Enhance Developer Profiles',
    excerpt: 'Latest update includes improved skills verification and project showcase capabilities.'
  }
]

export default function PressPage() {
  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Breadcrumb */}
        <div className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <span>Press Center</span>
        </div>

        <Row className="justify-content-center">
          <Col md={8}>
            <div className="mb-5">
              <h1 className="h3 mb-4">Press Center</h1>
              <p className="text-muted">
                Find the latest news, updates, and announcements about our platform and community.
              </p>
            </div>

            {/* Press Releases */}
            <div className="mb-4">
              <h2 className="h4 mb-4">Recent Press Releases</h2>
              {PRESS_RELEASES.map(release => (
                <Card key={release.id} className="mb-3">
                  <Card.Body>
                    <small className="text-muted">{release.date}</small>
                    <h3 className="h5 mt-2 mb-2">{release.title}</h3>
                    <p className="mb-0">{release.excerpt}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {/* Media Contact */}
            <div className="bg-light rounded p-4">
              <h2 className="h4 mb-3">Media Contact</h2>
              <p className="mb-2">For press inquiries, please contact:</p>
              <p className="mb-0">
                <strong>Press Team</strong><br />
                Email: press@example.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </RootLayout>
  )
} 