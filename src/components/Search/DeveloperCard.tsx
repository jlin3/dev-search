'use client'

import React from 'react'
import Link from 'next/link'
import { Card, Badge, Button } from 'react-bootstrap'
import type { Developer } from '@/types'

interface DeveloperCardProps {
  dev: Developer;
  onSelect: (dev: Developer) => void;
}

export default function DeveloperCard({ dev, onSelect }: DeveloperCardProps) {
  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex gap-3">
          <img
            src={dev.picture.medium}
            alt={`${dev.name.first} ${dev.name.last}`}
            className="rounded-circle"
            width={80}
            height={80}
          />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="mb-1">
                  <Link 
                    href={`/developers/${dev.login.uuid}`}
                    className="text-decoration-none text-dark"
                  >
                    {dev.name.first} {dev.name.last}
                  </Link>
                </h5>
                <p className="text-muted mb-2">{dev.type}</p>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {dev.skills.slice(0, 3).map((skill, index) => (
                    <Badge 
                      key={index} 
                      bg="primary"
                      className="fw-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {dev.skills.length > 3 && (
                    <Badge bg="secondary" className="fw-normal">
                      +{dev.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                <p className="text-secondary small mb-2">
                  {dev.summary}
                </p>
                <p className="text-muted small mb-0">
                  <i className="bi bi-geo-alt me-1"></i>
                  {dev.location.city}, {dev.location.country}
                </p>
              </div>
              <div className="d-flex flex-column gap-2 align-items-end">
                <Badge bg="success" className="fs-6 mb-2">
                  ${dev.rate}/hr
                </Badge>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => onSelect(dev)}
                >
                  Connect
                </Button>
                <Link 
                  href={`/developers/${dev.login.uuid}`}
                  className="btn btn-link btn-sm text-decoration-none p-0"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
} 