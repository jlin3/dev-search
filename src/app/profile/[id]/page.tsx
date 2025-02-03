'use client'

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'next/navigation'
import { getDeveloperById } from '@/services/api'
import type { Developer } from '@/types'
import { BeatLoader } from 'react-spinners'
import InquiryModal from '@/components/InquiryModal'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
  const { id } = useParams()
  const [developer, setDeveloper] = useState<Developer | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInquiry, setShowInquiry] = useState(false)

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        setLoading(true)
        const data = await getDeveloperById(id as string)
        setDeveloper(data)
      } catch (error) {
        console.error('Failed to fetch developer:', error)
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

  if (!developer) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>Developer not found</p>
        </div>
      </Container>
    )
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/developers">Find Developers</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{developer.name.first} {developer.name.last}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-9">
          <div className="d-flex align-items-start gap-4 mb-4">
            <Image
              src={developer.picture.large}
              alt={`${developer.name.first} ${developer.name.last}`}
              width={96}
              height={96}
              className="rounded-circle"
              priority
              quality={95}
            />
            <div>
              <h1 className="h2 mb-2">{developer.name.first} {developer.name.last}</h1>
              <p className="text-muted mb-2">
                {developer.type} • {developer.location.city}, {developer.location.country}
              </p>
              <p className="mb-0">{developer.summary}</p>
            </div>
          </div>

          <h2 className="h4 mb-3">Experience</h2>
          {developer.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="h5 mb-2">{exp.title} at {exp.company} ({exp.period})</h3>
              <ul className="list-unstyled">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="mb-2">• {achievement}</li>
                ))}
              </ul>
              <p className="text-muted mb-0">
                Technologies: {exp.technologies}
              </p>
            </div>
          ))}
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="h5 mb-3">Contact options</h3>
              <div className="d-grid">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowInquiry(true)}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h3 className="h5 mb-3">Can help you with:</h3>
              <ul className="list-unstyled mb-0">
                {developer.skills.map((skill, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-check2 text-primary me-2"></i>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showInquiry && (
        <InquiryModal
          dev={developer}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  )
} 