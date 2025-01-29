'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Container } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import RootLayout from '@/components/Layout/RootLayout'
import Header from '@/components/Layout/Header'
import { getDeveloperById } from '@/services/api'
import type { Developer } from '@/types'

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  technologies: string;
}

export default function ProfilePage() {
  const params = useParams()
  const [developer, setDeveloper] = useState<Developer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        setLoading(true)
        const dev = await getDeveloperById(params.id as string)
        // Add experience data
        const enhancedDev = {
          ...dev,
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
        setDeveloper(enhancedDev)
      } catch (error) {
        console.error('Failed to fetch developer:', error)
        setError('Failed to fetch developer profile. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchDeveloper()
    }
  }, [params.id])

  if (loading) {
    return (
      <RootLayout>
        <Header />
        <Container>
          <div className="text-center py-5">
            <BeatLoader color="#007bff" />
          </div>
        </Container>
      </RootLayout>
    )
  }

  if (error || !developer) {
    return (
      <RootLayout>
        <Header />
        <Container>
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p>{error || 'Developer not found'}</p>
          </div>
        </Container>
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <Header />
      <Container>
        {/* Navigation */}
        <nav className="py-3">
          <Link href="/" className="text-decoration-none">Home</Link>
          {' > '}
          <Link href="/find-developers" className="text-decoration-none">Find Developers</Link>
        </nav>

        {/* Header */}
        <div className="mb-4">
          <h1 className="h3 mb-1">{developer.name.first} {developer.name.last}</h1>
          <p className="text-muted mb-0">
            iOS expert, {developer.type.toLowerCase()}
            {' · '}
            <span>{developer.location.city}, {developer.location.country}</span>
          </p>
        </div>

        <div className="row gx-5">
          {/* Main Content */}
          <div className="col-md-8">
            {/* Bio */}
            <div className="d-flex mb-4">
              <img
                src={developer.picture.large}
                alt={`${developer.name.first} ${developer.name.last}`}
                className="rounded me-4"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <div>
                <p className="mb-0">
                  {developer.name.first} has over 15 years of experience as a full-stack developer, including creating a #1 iOS 
                  game in 2008 and scaling Yahoo! ad servers. {developer.name.first}'s strengths are adaptability, clear 
                  communication, and a relentless focus on the details that get projects shipped.
                </p>
              </div>
            </div>

            {/* Experience */}
            <section className="mb-5">
              <h2 className="h4 mb-4">Experience</h2>
              {developer.experience?.map((exp: Experience, index: number) => (
                <div key={index} className="mb-4">
                  <h3 className="h5 mb-3">
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
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <button 
                  className="btn btn-primary w-100 mb-4"
                  onClick={() => alert('Contact functionality coming soon!')}
                >
                  Connect
                </button>

                <h3 className="h5 mb-3">
                  {developer.name.first} can help you with:
                </h3>
                <ul className="list-unstyled">
                  {developer.skills.map((skill, index) => (
                    <li key={index} className="text-secondary mb-2">
                      › {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </RootLayout>
  )
} 