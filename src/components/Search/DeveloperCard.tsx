'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import type { Developer } from '@/types'

interface DeveloperCardProps {
  dev: Developer;
  onSelect: (dev: Developer) => void;
}

export default function DeveloperCard({ dev, onSelect }: DeveloperCardProps) {
  return (
    <Card className="border-0 shadow-sm">
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
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Link 
                  href={`/profile/${dev.login.uuid}`}
                  className="text-decoration-none"
                >
                  <h5 className="mb-1 text-primary">
                    {dev.name.first} {dev.name.last}
                  </h5>
                </Link>
                <p className="text-muted small mb-2">iOS expert</p>
              </div>
            </div>
            <p className="mb-3">
              {dev.name.first} has over 15 years of experience as a full-stack developer, 
              including creating a #1 iOS game in 2008 and scaling Yahoo! ad servers. 
              {dev.name.first}'s strengths are adaptability, clear communication, and a 
              relentless focus on the details that get projects shipped.
            </p>
            <Link 
              href={`/profile/${dev.login.uuid}`}
              className="text-primary text-decoration-none"
            >
              View profile
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
} 