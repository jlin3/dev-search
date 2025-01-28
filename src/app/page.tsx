'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { BeatLoader } from 'react-spinners'
import DeveloperCard from '@/components/Search/DeveloperCard'
import Filters from '@/components/Search/Filters'
import Pagination from '@/components/Search/Pagination'
import InquiryModal from '@/components/InquiryModal'
import type { Developer, Filters } from '@/types'
import RootLayout from '@/components/Layout/RootLayout'

const ITEMS_PER_PAGE = 8

export default function Home() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Filters>({ type: '', skills: [] })
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null)

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await axios.get('https://randomuser.me/api/?results=100&seed=devsearch')
        const enhanced = res.data.results.map((dev: any) => ({
          ...dev,
          skills: ['React', 'Node.js', 'Python', 'JavaScript', 'Java']
            .sort(() => 0.5 - Math.random())
            .slice(0, 3),
          type: ['Full Stack', 'Frontend', 'Backend'][Math.floor(Math.random() * 3)],
          rate: Math.floor(Math.random() * 100) + 50
        }))
        setDevelopers(enhanced)
      } catch (error) {
        console.error('Failed to fetch developers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopers()
  }, [])

  const filteredDevelopers = developers.filter(dev => {
    if (filters.type && dev.type !== filters.type) return false
    if (filters.skills.length > 0 && 
        !filters.skills.every(skill => dev.skills.includes(skill))) return false
    return true
  })

  const paginatedDevelopers = filteredDevelopers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <BeatLoader color="#0d6efd" />
      </div>
    )
  }

  return (
    <RootLayout>
      <Container fluid>
        <div className="d-flex align-items-center mb-4">
          <h1 className="mb-0">Top full-stack developers in United States</h1>
          <div className="ms-auto">
            <Form.Select className="d-inline-block w-auto me-2">
              <option>Full-stack developer in</option>
              <option>Frontend developer in</option>
              <option>Backend developer in</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="United States"
              className="d-inline-block w-auto"
            />
          </div>
        </div>

        <Row>
          <Col lg={3}>
            <Filters filters={filters} setFilters={setFilters} />
          </Col>
          <Col lg={9}>
            <Row xs={1} md={2} className="g-4">
              {paginatedDevelopers.map(dev => (
                <Col key={dev.login.uuid}>
                  <DeveloperCard dev={dev} onSelect={setSelectedDev} />
                </Col>
              ))}
            </Row>
            {filteredDevelopers.length > ITEMS_PER_PAGE && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredDevelopers.length / ITEMS_PER_PAGE)}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </Col>
        </Row>

        {selectedDev && (
          <InquiryModal
            dev={selectedDev}
            onClose={() => setSelectedDev(null)}
          />
        )}
      </Container>
    </RootLayout>
  )
} 