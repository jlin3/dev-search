export interface Developer {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
  };
  skills: string[];
  type: string;
  rate: number;
}

export type DeveloperType = 'Full Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'Data Scientist';

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