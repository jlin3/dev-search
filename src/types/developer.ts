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
  type: 'Full Stack' | 'Frontend' | 'Backend';
  rate: number;
  location: {
    country: string;
    city: string;
  };
}

export interface Filters {
  type: string;
  skills: string[];
} 