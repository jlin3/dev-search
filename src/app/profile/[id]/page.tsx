'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Row, Col, Button } from 'react-bootstrap'
import type { Developer } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'
import ContactModal from '@/components/ContactModal'

export default function ProfilePage() {
  const params = useParams()
  const [developer, setDeveloper] = useState<Developer | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await fetch(`https://randomuser.me/api/?seed=${params.id}`)
        const data = await res.json()
        const dev = {
          ...data.results[0],
          skills: ['Mobile iOS development', 'CTO management', 'Python development', 'C++ development', 'Parse.com', 'Swift', 'REST API architecture'],
          type: 'Full Stack',
          rate: Math.floor(Math.random() * 100) + 50,
          experience: [
            {
              title: 'CEO',
              company: 'MobilityDrive',
              period: '2009 - present',
              achievements: [
                'Developed iOS apps which has been installed on over 15 million devices and RocketScience app was #1 in the App Store in December 2007.',
                'Created other games including RPG TrueMasters',
                'Co-author of VisualMadness 360 for Global Retailers, enterprise iPad app that provides supermarkets with a way to direct store layouts and perform visual (photo-based) audits.',
                'Developed a social photo sharing platform/ that transcends language and location through video and photo conversations. Used Unique UX, localization, real-time translation, and web services.'
              ],
              technologies: 'iOS, C, C++, Objective-C, Parse.com, OpenGL, REST, Web Services, Cheetah3D'
            },
            {
              title: 'Team Lead',
              company: 'MultiMedia LLC',
              period: '2004 - 2008',
              achievements: [
                'Developed technical integrations of Right Media Ad Server into the Yahoo! APT platform.',
                'Led numerous end-to-end APT feature implementations from design, development, and testing to production, deployment and monitoring.',
                'Developed numerous internal-facing tools and web services for Yahoo! Sales and Engineering and Search Marketing groups.',
                'Developed several tool prototypes and integrated various group efforts for project Panama.',
                'Developed the Right Media back-end display advertising server system.'
              ],
              technologies: 'Perl, C++'
            }
          ]
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
        <nav className="profile-nav py-2">
          <Link href="/">
            Home
          </Link>
          {' / '}
          <Link href="/find-developers">
            Find Developers
          </Link>
        </nav>

        <div className="profile-header my-4">
          <h1 className="mb-1">{developer.name.first} {developer.name.last}</h1>
          <p className="text-muted mb-0">
            iOS expert, {developer.type.toLowerCase()}
            {' · '}
            <span>{developer.location.city}, {developer.location.country}</span>
          </p>
        </div>

        <Row className="gx-5">
          <Col md={8}>
            <div className="d-flex mb-4">
              <Image
                src={developer.picture.large}
                alt={`${developer.name.first} ${developer.name.last}`}
                width={120}
                height={120}
                className="rounded me-4"
              />
              <div className="profile-bio">
                <p className="mb-0">
                  {developer.name.first} has over 15 years of experience as a full-stack developer, including creating a #1 iOS 
                  game in 2008 and scaling Yahoo! ad servers. {developer.name.first}'s strengths are adaptability, clear 
                  communication, and a relentless focus on the details that get projects shipped.
                </p>
              </div>
            </div>

            <section className="experience-section mb-5">
              <h2>Experience</h2>
              {developer.experience?.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3>
                    {exp.title} at {exp.company} ({exp.period})
                  </h3>
                  <ul className="list-unstyled text-secondary">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="mb-2">* {achievement}</li>
                    ))}
                  </ul>
                  <p className="text-muted">
                    <strong>Technologies:</strong> {exp.technologies}
                  </p>
                </div>
              ))}
            </section>
          </Col>

          <Col md={4}>
            <div className="skills-card">
              <div className="card-body">
                <Button 
                  variant="primary" 
                  className="w-100 mb-4 connect-button"
                  onClick={() => setShowContact(true)}
                >
                  Connect
                </Button>

                <h3 className="h5 mb-3">
                  {developer.name.first} can help you with:
                </h3>
                <ul className="list-unstyled">
                  {developer.skills.map((skill, index) => (
                    <li key={index} className="text-secondary">
                      › {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        {developer && (
          <ContactModal
            dev={developer}
            show={showContact}
            onClose={() => setShowContact(false)}
          />
        )}
      </Container>
    </RootLayout>
  )
} 