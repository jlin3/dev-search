import axios from 'axios';
import type { Developer, Filters } from '@/types';
import { validateEnv } from '@/utils/env';

// Validate environment variables on initialization
validateEnv();

interface RandomUserResponse {
  results: any[];
  info: {
    results: number;
    page: number;
  };
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://randomuser.me/api',
  timeout: 10000, // Add timeout
});

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const getDevelopers = async (
  page: number = 1, 
  limit: number = 8,
  filters?: Filters,
  location?: string
): Promise<{
  developers: Developer[];
  total: number;
}> => {
  try {
    // Optimize request size - reduce from 30x to 2x to minimize data transfer
    const res = await api.get<RandomUserResponse>(`/?page=${page}&results=${limit * 2}&seed=devsearch${page}`);
    let developers = enhanceDevelopers(res.data.results, `page${page}`);

    // Apply filters more efficiently
    developers = applyFilters(developers, filters, location);

    // Only fetch more if absolutely necessary
    if (developers.length < limit) {
      const additionalRes = await api.get<RandomUserResponse>(
        `/?page=${page + 1}&results=${limit}&seed=devsearch${page + 1}`
      );
      const additionalDevs = enhanceDevelopers(additionalRes.data.results, `page${page + 1}`);
      developers = [...developers, ...applyFilters(additionalDevs, filters, location)];
    }

    return {
      developers: developers.slice(0, limit),
      total: Math.min(1000, developers.length * 10)
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new APIError(
        error.response?.status || 500,
        error.response?.data?.message || 'Failed to fetch developers'
      );
    }
    throw new APIError(500, 'An unexpected error occurred');
  }
};

// Extract filter logic to separate function for better organization
const applyFilters = (
  developers: Developer[], 
  filters?: Filters,
  location?: string
): Developer[] => {
  let filtered = [...developers];

  if (filters?.type) {
    filtered = filtered.filter(dev => dev.type === filters.type);
  }

  if (filters?.skills?.length) {
    filtered = filtered.filter(dev => 
      filters.skills.every(skill => dev.skills.includes(skill))
    );
  }

  if (location) {
    const searchLocation = location.toLowerCase();
    filtered = filtered.filter(dev => 
      dev.location.country.toLowerCase().includes(searchLocation)
    );
  }

  return filtered;
};

export const getDeveloperById = async (id: string): Promise<Developer> => {
  try {
    const res = await api.get<RandomUserResponse>(`/?seed=${id}`);
    if (!res.data.results.length) {
      throw new APIError(404, 'Developer not found');
    }
    const [dev] = enhanceDevelopers([res.data.results[0]], id);
    return dev;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new APIError(
        error.response?.status || 500,
        error.response?.data?.message || 'Failed to fetch developer'
      );
    }
    throw new APIError(500, 'An unexpected error occurred');
  }
};

const getRandomType = (seed?: string): string => {
  const types = [
    'Full-stack',
    'Frontend',
    'Backend',
    'Mobile',
    'Data Scientist'
  ];
  
  if (seed) {
    // Use the seed to generate a consistent type for the same user
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Ensure more even distribution by using modulo bias correction
    const index = Math.floor((hash / types.length) % types.length);
    return types[index];
  }
  
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomSkills = (type: string, seed?: string): string[] => {
  const skillsByType: { [key: string]: string[] } = {
    'Full-stack': ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
    'Frontend': ['React', 'Vue', 'Angular', 'JavaScript', 'CSS', 'HTML'],
    'Backend': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'Redis'],
    'Mobile': ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'Flutter'],
    'Data Scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas']
  };

  const availableSkills = skillsByType[type] || skillsByType['Full-stack'];
  
  if (seed) {
    // Use the seed to generate consistent skills for the same user
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...availableSkills].sort((a, b) => {
      const hashA = (hash + a.charCodeAt(0)) % availableSkills.length;
      const hashB = (hash + b.charCodeAt(0)) % availableSkills.length;
      return hashA - hashB;
    });
    return shuffled.slice(0, 3);
  }
  
  const shuffled = [...availableSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const enhanceDevelopers = (developers: any[], seed?: string): Developer[] => {
  return developers.map(dev => {
    const type = getRandomType(seed || dev.login.uuid);
    return {
      ...dev,
      skills: getRandomSkills(type, seed || dev.login.uuid),
      type,
      rate: Math.floor(Math.random() * 100) + 50
    };
  });
}; 