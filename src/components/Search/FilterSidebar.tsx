import React from 'react';
import { Form } from 'react-bootstrap';

interface FilterSidebarProps {
  type: string;
  selectedSkills: string[];
  onTypeChange: (type: string) => void;
  onSkillsChange: (skills: string[]) => void;
}

const DEVELOPER_TYPES = [
  'Full Stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
] as const;

const SKILLS_BY_TYPE = {
  'Full Stack developer': ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
  'Frontend developer': ['React', 'Vue.js', 'Angular', 'JavaScript', 'CSS', 'HTML'],
  'Backend developer': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'Redis'],
  'Mobile developer': ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'Flutter'],
  'Data scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas']
} as const;

export default function FilterSidebar({ type, selectedSkills, onTypeChange, onSkillsChange }: FilterSidebarProps) {
  // Get available skills based on selected type or all unique skills if no type selected
  const availableSkills = type 
    ? SKILLS_BY_TYPE[type as keyof typeof SKILLS_BY_TYPE]
    : Array.from(new Set(Object.values(SKILLS_BY_TYPE).flat()));

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  return (
    <aside className="filter-sidebar bg-light p-4 rounded">
      <div className="mb-4">
        <h3 className="h6 mb-3">DEVELOPER TYPE</h3>
        <div className="d-flex flex-column gap-2">
          <Form.Check
            type="radio"
            id="type-all"
            label="All Types"
            checked={!type}
            onChange={() => onTypeChange('')}
          />
          {DEVELOPER_TYPES.map(devType => (
            <Form.Check
              key={devType}
              type="radio"
              id={`type-${devType}`}
              label={devType}
              checked={type === devType}
              onChange={() => onTypeChange(devType)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="h6 mb-3">SKILLS</h3>
        <div className="d-flex flex-column gap-2">
          {availableSkills.map(skill => (
            <Form.Check
              key={skill}
              type="checkbox"
              id={`skill-${skill}`}
              label={skill}
              checked={selectedSkills.includes(skill)}
              onChange={() => handleSkillToggle(skill)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
} 