'use client'

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getDeveloperById } from '@/services/api';
import type { Developer, WorkExperience } from '@/types';
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

  // Calculate total years of experience from work history
  const totalYears = developer.experience.reduce((total: number, job: WorkExperience) => {
    const [startYear] = job.period.split(' - ');
    const endYear = job.period.split(' - ')[1] || new Date().getFullYear().toString();
    return total + (parseInt(endYear) - parseInt(startYear));
  }, 0);

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
                <strong>Experience:</strong> {totalYears}+ years
              </div>
              <div className="mb-3">
                <strong>Rate:</strong> ${`$${developer.rate}/hour`}
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
              <Card.Title>Work Experience</Card.Title>
              {developer.experience.map((job: WorkExperience, index: number) => (
                <div key={index} className="mb-4">
                  <h5>{job.title}</h5>
                  <h6 className="text-muted">{job.company} • {job.period}</h6>
                  <ul className="mt-2">
                    {job.achievements.map((achievement: string, i: number) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <strong>Technologies:</strong> {job.technologies}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              <div className="d-flex flex-wrap gap-2">
                {developer.skills.map((skill: string, index: number) => (
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