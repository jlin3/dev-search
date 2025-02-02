'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Badge, Button } from 'react-bootstrap'
import type { Developer } from '@/types'

interface DeveloperCardProps {
  dev: Developer;
  onSelect: (dev: Developer) => void;
}

export default function DeveloperCard({ dev, onSelect }: DeveloperCardProps) {
  return (
    <Card className="h-100 developer-card">
      <Card.Body className="d-flex flex-column">
        <div className="text-center mb-3">
          <img
            src={dev.picture.medium}
            alt={`${dev.name.first} ${dev.name.last}`}
            className="rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>

        <h3 className="h5 text-center mb-2">
          {dev.name.first} {dev.name.last}
        </h3>

        <p className="text-muted text-center small mb-3">
          {dev.type}
        </p>

        <div className="d-flex flex-wrap gap-1 justify-content-center mb-3">
          {dev.skills.slice(0, 3).map(skill => (
            <Badge key={skill} bg="primary" className="text-truncate">
              {skill}
            </Badge>
          ))}
          {dev.skills.length > 3 && (
            <Badge bg="secondary">+{dev.skills.length - 3}</Badge>
          )}
        </div>

        <div className="text-center mb-3">
          <p className="text-muted small mb-1">
            {dev.location.city}, {dev.location.country}
          </p>
          <p className="fw-bold mb-0">${dev.rate}/hour</p>
        </div>

        <div className="mt-auto text-center">
          <Button
            variant="outline-primary"
            onClick={() => onSelect(dev)}
            className="w-100"
          >
            View Profile
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
} 