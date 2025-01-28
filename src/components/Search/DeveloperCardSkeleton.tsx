'use client'

import React from 'react'
import { Card } from 'react-bootstrap'

export default function DeveloperCardSkeleton() {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex">
        <div className="me-3">
          <div 
            className="rounded-circle bg-light"
            style={{ width: '80px', height: '80px' }}
          />
        </div>
        <div className="w-100">
          <div className="bg-light mb-2" style={{ height: '24px', width: '60%' }} />
          <div className="bg-light mb-3" style={{ height: '18px', width: '40%' }} />
          <div className="d-flex gap-2 mb-3">
            {[1, 2, 3].map(i => (
              <div 
                key={i}
                className="bg-light"
                style={{ height: '24px', width: '60px' }}
              />
            ))}
          </div>
          <div className="bg-light" style={{ height: '24px', width: '30%' }} />
        </div>
      </Card.Body>
    </Card>
  )
} 