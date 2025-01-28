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
    <aside className="filters">
      <div className="card">
        <div className="card-body">
          <h5 className="mb-3">Developer type:</h5>
          <Form>
            {DEVELOPER_TYPES.map(type => (
              <Form.Check
                key={type}
                type="checkbox"
                id={`type-${type}`}
                label={type}
                checked={filters.type === type}
                onChange={() => handleTypeChange(type)}
                className="mb-2"
              />
            ))}

            <h5 className="mt-4 mb-3">Skills:</h5>
            {SKILLS.map(skill => (
              <Form.Check
                key={skill}
                type="checkbox"
                id={`skill-${skill}`}
                label={skill}
                checked={filters.skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="mb-2"
              />
            ))}
          </Form>
        </div>
      </div>
    </aside>
  )
} 