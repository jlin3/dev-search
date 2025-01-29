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

export default function DeveloperCard({ dev, onSelect }: DeveloperCardProps) {
  return (
    <Card className="border shadow-sm hover-shadow">
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
                  <Link 
                    href={`/profile/${dev.login.uuid}`}
                    className="text-decoration-none"
                  >
                    {dev.name.first} {dev.name.last}
                  </Link>
                </h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="text-muted small">{dev.type}</span>
                  <Badge bg="primary" pill>
                    ${dev.rate}/hr
                  </Badge>
                </div>
                <div className="mb-2">
                  {dev.skills.map(skill => (
                    <Badge 
                      key={skill} 
                      bg="secondary" 
                      className="me-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-secondary small mb-2">
                  {dev.name.first} has over {Math.floor(Math.random() * 10) + 5} years of experience as a {dev.type.toLowerCase()}, 
                  specializing in {dev.skills.slice(0, 2).join(' and ')}. Their strengths include 
                  problem-solving, clear communication, and delivering high-quality solutions.
                </p>
              </div>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => onSelect(dev)}
              >
                Contact
              </button>
            </div>
            <p className="mb-0 text-secondary">
              {dev.location.city}, {dev.location.country}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
} 