'use client'

import { Form } from 'react-bootstrap'
import type { Filters } from '@/types'

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const developerTypes = [
    'Full Stack developer',
    'Frontend developer',
    'Backend developer',
    'Mobile developer',
    'Data scientist'
  ];

  const commonSkills = [
    'Android',
    'iOS',
    'Java',
    'React',
    'Angular',
    'Python',
    'Ruby',
    'PHP',
    'Go'
  ];

  const handleTypeChange = (type: string) => {
    onChange({ ...filters, type });
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    onChange({ ...filters, skills: newSkills });
  };

  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <div className="mb-4">
        <Form.Label className="mb-2 fw-bold">Developer Type</Form.Label>
        <Form.Select
          value={filters.type}
          onChange={e => handleTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          {developerTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Select>
      </div>

      <div>
        <Form.Label className="mb-2 fw-bold">Skills</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {commonSkills.map(skill => (
            <Form.Check
              key={skill}
              type="checkbox"
              id={`skill-${skill}`}
              label={skill}
              checked={filters.skills.includes(skill)}
              onChange={() => handleSkillToggle(skill)}
              className="me-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
} 