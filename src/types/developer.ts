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
  skills: string[];
  type: DeveloperType;
  rate: number;
  location: {
    country: string;
    city: string;
  };
}

export type DeveloperType = 
  | 'Full Stack developer'
  | 'Frontend developer'
  | 'Backend developer'
  | 'Mobile developer'
  | 'Data scientist';

export interface Filters {
  type: string;
  skills: string[];
} 