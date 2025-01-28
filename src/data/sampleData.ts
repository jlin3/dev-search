export const SKILLS = [
  'Android',
  'iOS',
  'Java',
  'React',
  'Angular',
  'Python',
  'Ruby',
  'PHP',
  'Go'
] as const

export const DEVELOPER_TYPES = [
  'Full Stack',
  'Backend',
  'Frontend',
  'Mobile',
  'Data Scientist'
] as const

export type Skill = typeof SKILLS[number]
export type DeveloperType = typeof DEVELOPER_TYPES[number]

// Update the types file to match this data structure
export interface Developer {
  id: string;
  name: string;
  title: string;
  type: DeveloperType;
  skills: Skill[];
  hourlyRate: number;
  description: string;
  image: string;
  location: {
    city: string;
    country: string;
  };
} 