export interface Developer {
  id: string;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  type: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  summary: string;
  location: {
    city: string;
    country: string;
  };
  experience: {
    title: string;
    company: string;
    period: string;
    achievements: string[];
    technologies: string;
  }[];
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