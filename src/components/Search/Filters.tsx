'use client'

import React from 'react'
import { Form } from 'react-bootstrap'
import { DEVELOPER_TYPES, SKILLS } from '@/data/sampleData'
import type { Filters } from '@/types'

interface FiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const handleTypeChange = (type: string) => {
    setFilters({ ...filters, type: filters.type === type ? '' : type })
  }

  const handleSkillChange = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill]
    setFilters({ ...filters, skills: newSkills })
  }

  return (
    <div className="filters">
      <div className="mb-4">
        <h6 className="text-secondary mb-3">Developer type:</h6>
        <Form>
          <Form.Check
            type="checkbox"
            id="type-full-stack"
            label="Full-stack developer"
            checked={filters.type === 'Full Stack'}
            onChange={() => handleTypeChange('Full Stack')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="type-backend"
            label="Backend developer"
            checked={filters.type === 'Backend'}
            onChange={() => handleTypeChange('Backend')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="type-frontend"
            label="Frontend developer"
            checked={filters.type === 'Frontend'}
            onChange={() => handleTypeChange('Frontend')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="type-mobile"
            label="Mobile developer"
            checked={filters.type === 'Mobile'}
            onChange={() => handleTypeChange('Mobile')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="type-data"
            label="Data scientist"
            checked={filters.type === 'Data Scientist'}
            onChange={() => handleTypeChange('Data Scientist')}
            className="mb-2"
          />
        </Form>
      </div>

      <div>
        <h6 className="text-secondary mb-3">Skills:</h6>
        <Form>
          <Form.Check
            type="checkbox"
            id="skill-android"
            label="Android"
            checked={filters.skills.includes('Android')}
            onChange={() => handleSkillChange('Android')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-ios"
            label="iOS"
            checked={filters.skills.includes('iOS')}
            onChange={() => handleSkillChange('iOS')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-java"
            label="Java"
            checked={filters.skills.includes('Java')}
            onChange={() => handleSkillChange('Java')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-react"
            label="React"
            checked={filters.skills.includes('React')}
            onChange={() => handleSkillChange('React')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-angular"
            label="Angular"
            checked={filters.skills.includes('Angular')}
            onChange={() => handleSkillChange('Angular')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-python"
            label="Python"
            checked={filters.skills.includes('Python')}
            onChange={() => handleSkillChange('Python')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-ruby"
            label="Ruby"
            checked={filters.skills.includes('Ruby')}
            onChange={() => handleSkillChange('Ruby')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-php"
            label="PHP"
            checked={filters.skills.includes('PHP')}
            onChange={() => handleSkillChange('PHP')}
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            id="skill-go"
            label="Go"
            checked={filters.skills.includes('Go')}
            onChange={() => handleSkillChange('Go')}
            className="mb-2"
          />
        </Form>
      </div>
    </div>
  )
} 