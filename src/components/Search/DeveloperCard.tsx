'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Badge } from 'react-bootstrap'
import type { Developer } from '@/types'

interface DeveloperCardProps {
  dev: Developer;
  onSelect: (dev: Developer) => void;
}

export default function DeveloperCard({ dev }: DeveloperCardProps) {
  return (
    <Card className="border shadow-sm mb-3">
      <Card.Body>
        <div className="d-flex">
          <div className="me-3">
            <Image
              src={dev.picture.medium}
              alt={`${dev.name.first} ${dev.name.last}`}
              width={80}
              height={80}
              className="rounded"
            />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="mb-1">
                  {dev.name.first} {dev.name.last}
                </h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="text-muted small">iOS expert</span>
                  <Badge bg="secondary" className="text-white">
                    {dev.type}
                  </Badge>
                </div>
                <div className="mb-2">
                  {dev.skills.slice(0, 3).map(skill => (
                    <Badge 
                      key={skill} 
                      bg="primary" 
                      className="me-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Link 
                href={`/profile/${dev.login.uuid}`}
                className="text-primary text-decoration-none"
              >
                View profile
              </Link>
            </div>
            <p className="mb-0 text-secondary">
              {dev.name.first} has over 15 years of experience as a {dev.type.toLowerCase()} developer, 
              including creating a #1 iOS game in 2008 and scaling Yahoo! ad servers. 
              {dev.name.first}'s strengths are adaptability, clear communication, and a 
              relentless focus on the details that get projects shipped.
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
} 