import React from 'react';
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import type { Developer } from '@/types';

interface DeveloperProfileProps {
  developer: Developer;
  onClose: () => void;
  onContact: () => void;
}

export default function DeveloperProfile({ developer, onClose, onContact }: DeveloperProfileProps) {
  return (
    <Card className="developer-profile">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Developer Profile</h2>
        <Button variant="outline-secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={4} className="text-center mb-4 mb-md-0">
            <img
              src={developer.picture.large}
              alt={`${developer.name.first} ${developer.name.last}`}
              className="rounded-circle mb-3"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <Button variant="primary" className="w-100" onClick={onContact}>
              Contact Developer
            </Button>
          </Col>

          <Col md={8}>
            <h3 className="h4 mb-3">
              {developer.name.first} {developer.name.last}
            </h3>

            <div className="mb-4">
              <h4 className="h6 text-muted mb-2">Developer Type</h4>
              <p className="mb-0">{developer.type}</p>
            </div>

            <div className="mb-4">
              <h4 className="h6 text-muted mb-2">Skills</h4>
              <div className="d-flex flex-wrap gap-2">
                {developer.skills.map(skill => (
                  <Badge key={skill} bg="primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {developer.experience && developer.experience.length > 0 && (
              <div className="mb-4">
                <h4 className="h6 text-muted mb-2">Experience</h4>
                {developer.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <p className="fw-bold mb-1">{exp.title} at {exp.company}</p>
                    <p className="text-muted small mb-1">{exp.period}</p>
                    <ul className="small mb-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                    <p className="small mb-0">
                      <strong>Technologies:</strong> {exp.technologies}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <h4 className="h6 text-muted mb-2">Hourly Rate</h4>
              <p className="mb-0">${developer.rate}/hour</p>
            </div>

            <div className="mb-4">
              <h4 className="h6 text-muted mb-2">Location</h4>
              <p className="mb-0">
                {developer.location.city}, {developer.location.country}
              </p>
            </div>

            <div>
              <h4 className="h6 text-muted mb-2">Contact</h4>
              <p className="mb-0">
                {developer.email}
              </p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
} 