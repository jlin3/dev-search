'use client'

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getDeveloperById } from '@/services/api';
import type { Developer } from '@/types';
import InquiryModal from '@/components/InquiryModal';
import { BeatLoader } from 'react-spinners';

export default function DeveloperProfile() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const dev = await getDeveloperById(id as string);
        setDeveloper(dev);
      } catch (error) {
        console.error('Error fetching developer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <BeatLoader />
      </Container>
    );
  }

  if (!developer) {
    return (
      <Container className="py-5">
        <h1>Developer not found</h1>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={developer.picture.large} alt={`${developer.name.first} ${developer.name.last}`} />
            <Card.Body>
              <Card.Title className="mb-3">
                {developer.name.first} {developer.name.last}
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {developer.type}
              </Card.Subtitle>
              <div className="mb-3">
                <strong>Location:</strong> {developer.location.city}, {developer.location.country}
              </div>
              <div className="mb-3">
                <strong>Experience:</strong> {developer.experience} years
              </div>
              <div className="mb-3">
                <strong>Rate:</strong> ${developer.rate}/hour
              </div>
              <Button 
                variant="primary" 
                className="w-100"
                onClick={() => setShowInquiry(true)}
              >
                Connect
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>About</Card.Title>
              <Card.Text>{developer.summary}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                {developer.skills.map((skill, index) => (
                  <Badge key={index} bg="primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showInquiry && (
        <InquiryModal
          dev={developer}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </Container>
  );
} 