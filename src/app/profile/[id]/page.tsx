'use client'

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'next/navigation'
import { getDeveloperData } from '@/app/actions'
import type { Developer, WorkExperience } from '@/types'
import { BeatLoader } from 'react-spinners'
import InquiryModal from '@/components/InquiryModal'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const dev = await getDeveloperData(params.id)
  if (!dev) notFound()

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/developers">Find Developers</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{dev.name.first} {dev.name.last}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-9">
          <div className="d-flex align-items-start gap-4 mb-4">
            <Image
              src={dev.avatar}
              alt={`${dev.name.first} ${dev.name.last}`}
              width={96}
              height={96}
              className="rounded-circle"
              priority
              quality={95}
            />
            <div>
              <h1 className="h2 mb-2">{dev.name.first} {dev.name.last}</h1>
              <p className="text-muted mb-2">
                {dev.type} • {dev.location.city}, {dev.location.country}
              </p>
              <p className="mb-0">{dev.bio}</p>
            </div>
          </div>

          <h2 className="h4 mb-3">Experience</h2>
          {dev.experience.map((exp: Developer['experience'][0], index: number) => (
            <div key={index} className="mb-4">
              <h3 className="h5 mb-2">{exp.title} at {exp.company} ({exp.period})</h3>
              <ul className="list-unstyled">
                {exp.achievements.map((achievement: string, i: number) => (
                  <li key={i} className="mb-2">• {achievement}</li>
                ))}
              </ul>
              <p className="text-muted mb-0">
                Technologies: {exp.technologies.join(', ')}
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
                  onClick={() => {
                    'use client';
                    // Connect button logic here
                  }}
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
                {dev.skills.map((skill: string, index: number) => (
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
    </div>
  )
} 