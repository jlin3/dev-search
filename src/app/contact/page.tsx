'use client'

import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! We will get back to you soon.')
  }

  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Breadcrumb */}
        <div className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <span>Contact Us</span>
        </div>

        <Row className="justify-content-center">
          <Col md={8}>
            <div className="bg-light rounded p-4 mb-4">
              <h1 className="h3 mb-4">Contact Us</h1>
              <p className="text-muted mb-4">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} required />
                </Form.Group>

                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </RootLayout>
  )
} 