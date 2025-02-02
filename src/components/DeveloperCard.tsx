'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'
import type { Developer } from '@/types'

interface DeveloperCardProps {
  dev: Developer;
  onSelect: (dev: Developer) => void;
}

export default function DeveloperCard({ dev, onSelect }: DeveloperCardProps) {
  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Image
            src={dev.avatar}
            alt={`${dev.name.first} ${dev.name.last}`}
            width={48}
            height={48}
            className="rounded-circle me-3"
          />
          <div>
            <Link 
              href={`/profile/${dev.id}`}
              className="text-decoration-none"
            >
              <Card.Title className="mb-1 text-dark">
                {dev.name.first} {dev.name.last}
              </Card.Title>
            </Link>
            <Card.Subtitle className="text-muted small">
              {dev.type}
            </Card.Subtitle>
          </div>
        </div>

        <Card.Text className="mb-3 small">
          {dev.bio.length > 150 ? `${dev.bio.slice(0, 150)}...` : dev.bio}
        </Card.Text>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {dev.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="badge bg-light text-dark"
            >
              {skill}
            </span>
          ))}
          {dev.skills.length > 3 && (
            <span className="badge bg-light text-dark">
              +{dev.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {dev.location.city}, {dev.location.country}
          </small>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onSelect(dev)}
          >
            Connect
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
} 