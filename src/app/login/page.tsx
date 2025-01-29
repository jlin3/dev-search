'use client'

import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    alert('Login functionality coming soon!')
  }

  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Breadcrumb */}
        <div className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <span>Login</span>
        </div>

        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="bg-light rounded p-4 mb-4">
              <h1 className="h3 mb-4">Welcome Back</h1>
              
              <Form onSubmit={handleSubmit}>
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

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  />
                  <Link href="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-100">
                  Log In
                </Button>

                <div className="text-center mt-4">
                  Don't have an account?{' '}
                  <Link href="/sign-up" className="text-decoration-none">
                    Sign up
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