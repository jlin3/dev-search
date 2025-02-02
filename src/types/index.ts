export interface Name {
  first: string;
  last: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
  technologies: string[] | string;
}

export interface Developer {
  id: string;
  name: Name;
  type: string;
  avatar: string;
  bio: string;
  location: Location;
  experience: Experience[];
  skills: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  technologies: string;
}

export type DeveloperType = 
  | 'Full Stack developer'
  | 'Frontend developer'
  | 'Backend developer'
  | 'Mobile developer'
  | 'Data scientist';

export type Skill = 
  | 'Android' 
  | 'iOS' 
  | 'Java' 
  | 'React' 
  | 'Angular' 
  | 'Python' 
  | 'Ruby' 
  | 'PHP' 
  | 'Go';

export interface Filters {
  type: string;
  skills: string[];
} 