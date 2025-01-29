'use client'

import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'developer'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement sign up logic
    alert('Sign up functionality coming soon!')
  }

  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Breadcrumb */}
        <div className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <span>Sign Up</span>
        </div>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="bg-light rounded p-4 mb-4">
              <h1 className="h3 mb-4">Create an Account</h1>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>I am a:</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="accountType"
                      id="developer"
                      label="Developer"
                      checked={formData.accountType === 'developer'}
                      onChange={() => setFormData({ ...formData, accountType: 'developer' })}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      name="accountType"
                      id="client"
                      label="Client"
                      checked={formData.accountType === 'client'}
                      onChange={() => setFormData({ ...formData, accountType: 'client' })}
                      inline
                    />
                  </div>
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="w-100">
                  Create Account
                </Button>

                <div className="text-center mt-3">
                  Already have an account?{' '}
                  <Link href="/login" className="text-decoration-none">
                    Log in
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </RootLayout>
  )
} 