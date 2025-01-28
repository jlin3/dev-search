'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap'
import InquiryModal from '@/components/InquiryModal'
import type { Developer } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'

export default function ProfilePage() {
  const params = useParams()
  const [developer, setDeveloper] = useState<Developer | null>(null)
  const [showInquiry, setShowInquiry] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await fetch(`https://randomuser.me/api/?seed=${params.id}`)
        const data = await res.json()
        const dev = {
          ...data.results[0],
          skills: ['React', 'Node.js', 'Python'].sort(() => 0.5 - Math.random()),
          type: ['Full Stack', 'Frontend', 'Backend'][Math.floor(Math.random() * 3)],
          rate: Math.floor(Math.random() * 100) + 50
        }
        setDeveloper(dev)
      } catch (error) {
        console.error('Failed to fetch developer:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeveloper()
  }, [params.id])

  if (!developer) {
    return (
      <RootLayout>
        <div className="text-center py-5">
          <h2>Loading...</h2>
        </div>
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <Container>
        <Card className="my-4">
          <Card.Body>
            <Row>
              <Col md={4} className="text-center">
                <Image
                  src={developer.picture.large}
                  alt={`${developer.name.first} ${developer.name.last}`}
                  width={200}
                  height={200}
                  className="rounded-circle mb-3"
                />
              </Col>
              <Col md={8}>
                <h2>{developer.name.first} {developer.name.last}</h2>
                <p className="text-muted">{developer.type}</p>
                <p className="text-success fs-4">${developer.rate}/hour</p>
                
                <div className="mb-3">
                  {developer.skills.map(skill => (
                    <Badge key={skill} bg="primary" className="me-2">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setShowInquiry(true)}
                >
                  Contact Developer
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {showInquiry && developer && (
        <InquiryModal
          dev={developer}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </RootLayout>
  )
} 