'use client'

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

const HIGHEST_DEMAND = [
  'iOS Developer',
  'Front-End Developer',
  'UX Designer',
  'UI Designer',
  'Financial Modeling Consultants',
  'Interim CFOs'
]

const ABOUT_LINKS = [
  { title: 'Contact us', href: '/contact' },
  { title: 'Press Center', href: '/press' },
  { title: 'Careers', href: '/careers' }
]

export default function Footer() {
  return (
    <footer className="bg-light py-5 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="mb-3">Highest Demand Talents</h5>
            <ul className="list-unstyled">
              {HIGHEST_DEMAND.map(title => (
                <li key={title} className="mb-2">
                  <Link 
                    href={`/search?role=${encodeURIComponent(title)}`}
                    className="text-decoration-none text-muted"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-3">About</h5>
            <ul className="list-unstyled">
              {ABOUT_LINKS.map(link => (
                <li key={link.title} className="mb-2">
                  <Link 
                    href={link.href}
                    className="text-decoration-none text-muted"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={4} className="text-md-end">
            <button className="btn btn-primary mb-4">Sign Up</button>
            <div className="d-flex justify-content-md-end gap-3">
              <Link href="#" className="text-muted">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link href="#" className="text-muted">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link href="#" className="text-muted">
                <i className="bi bi-google"></i>
              </Link>
              <Link href="#" className="text-muted">
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
} 