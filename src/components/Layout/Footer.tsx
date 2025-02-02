'use client'

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const POPULAR_SEARCHES = [
  { title: 'Full Stack Developer', type: 'Full Stack developer' },
  { title: 'Frontend Developer', type: 'Frontend developer' },
  { title: 'Backend Developer', type: 'Backend developer' },
  { title: 'Mobile Developer', type: 'Mobile developer' },
  { title: 'Data Scientist', type: 'Data scientist' }
]

const ABOUT_LINKS = [
  { title: 'Contact us', href: '/contact' },
  { title: 'Press Center', href: '/press' },
  { title: 'Careers', href: '/careers' }
]

const SOCIAL_LINKS = [
  { icon: 'twitter', href: 'https://twitter.com' },
  { icon: 'facebook', href: 'https://facebook.com' },
  { icon: 'linkedin', href: 'https://linkedin.com' },
  { icon: 'github', href: 'https://github.com' }
]

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="bg-light py-5 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="mb-3">Highest Demand Talents</h5>
            <ul className="list-unstyled">
              {POPULAR_SEARCHES.map(role => (
                <li key={role.title} className="mb-2">
                  <Link 
                    href={`/find-developers?type=${encodeURIComponent(role.type)}`}
                    className="text-decoration-none text-muted"
                  >
                    {role.title}
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
            <button 
              className="btn btn-primary mb-4"
              onClick={() => router.push('/sign-up')}
            >
              Sign Up
            </button>
            <div className="d-flex justify-content-md-end gap-3">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.icon}
                  href={link.href}
                  className="text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`bi bi-${link.icon}`}></i>
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
} 