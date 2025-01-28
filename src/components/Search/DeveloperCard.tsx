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
    <Card 
      className="h-100 hover-shadow" 
      onClick={() => onSelect(dev)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onSelect(dev)
      }}
    >
      <Card.Body className="d-flex">
        <div className="me-3">
          <Image
            src={dev.picture.medium}
            alt={`${dev.name.first} ${dev.name.last}`}
            width={80}
            height={80}
            className="rounded-circle"
          />
        </div>
        <div>
          <Link 
            href={`/profile/${dev.login.uuid}`}
            className="text-decoration-none"
            onClick={e => e.stopPropagation()}
          >
            <Card.Title className="text-primary">
              {dev.name.first} {dev.name.last}
            </Card.Title>
          </Link>
          <Card.Subtitle className="mb-2 text-muted">{dev.type}</Card.Subtitle>
          <div className="mb-2">
            {dev.skills.map(skill => (
              <Badge key={skill} bg="primary" className="me-1">
                {skill}
              </Badge>
            ))}
          </div>
          <Card.Text className="text-success fw-bold">
            ${dev.rate}/hour
          </Card.Text>
          <div className="text-muted small">
            {dev.location.city}, {dev.location.country}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
} 