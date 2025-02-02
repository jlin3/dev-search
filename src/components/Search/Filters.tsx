'use client'

import React from 'react'
import { Form } from 'react-bootstrap'
import type { DeveloperType } from '@/types'

const DEVELOPER_TYPES: DeveloperType[] = [
  'Full Stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
]

const SKILLS = [
  'React',
  'Node.js',
  'Python',
  'JavaScript',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Vue.js',
  'Angular',
  'SCSS',
  'Webpack',
  'Jest',
  'Java',
  'Go',
  'Redis',
  'React Native',
  'Swift',
  'Kotlin',
  'Flutter',
  'iOS',
  'Android',
  'R',
  'TensorFlow',
  'PyTorch',
  'Pandas',
  'NumPy',
  'SQL'
]

interface FiltersProps {
  type: string;
  selectedSkills: string[];
  onTypeChange: (type: string) => void;
  onSkillsChange: (skills: string[]) => void;
}

export default function Filters({ type, selectedSkills, onTypeChange, onSkillsChange }: FiltersProps) {
  return (
    <div>
      <div className="mb-4">
        <h6 className="text-uppercase mb-3 text-secondary fw-bold">Filter by Type</h6>
        <Form.Group>
          <Form.Check
            type="radio"
            id="all-types"
            label="All Types"
            checked={!type}
            onChange={() => onTypeChange('')}
            className="mb-2"
          />
          {DEVELOPER_TYPES.map(devType => (
            <Form.Check
              key={devType}
              type="radio"
              id={devType}
              label={devType}
              checked={type === devType}
              onChange={() => onTypeChange(devType)}
              className="mb-2"
            />
          ))}
        </Form.Group>
      </div>

      <div>
        <h6 className="text-uppercase mb-3 text-secondary fw-bold">Skills</h6>
        <Form.Group>
          {SKILLS.map(skill => (
            <Form.Check
              key={skill}
              type="checkbox"
              id={skill}
              label={skill}
              checked={selectedSkills.includes(skill)}
              onChange={(e) => {
                if (e.target.checked) {
                  onSkillsChange([...selectedSkills, skill])
                } else {
                  onSkillsChange(selectedSkills.filter(s => s !== skill))
                }
              }}
              className="mb-2"
            />
          ))}
        </Form.Group>
      </div>
    </div>
  )
} 