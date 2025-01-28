import axios from 'axios';
import type { Developer, Filters } from '@/types';

interface RandomUserResponse {
  results: any[];
  info: {
    results: number;
    page: number;
  };
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://randomuser.me/api'
});

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
    // Request significantly more results to ensure good distribution
    const res = await api.get<RandomUserResponse>(`/?page=${page}&results=${limit * 15}&seed=devsearch${page}`);
    let developers = enhanceDevelopers(res.data.results, `page${page}`);

    // Apply filters if they exist
    if (filters) {
      if (filters.type) {
        developers = developers.filter(dev => dev.type === filters.type);
      }
      if (filters.skills && filters.skills.length > 0) {
        developers = developers.filter(dev => 
          filters.skills.every(skill => dev.skills.includes(skill))
        );
      }
    }

    // Apply location filter with case-insensitive matching
    if (location) {
      developers = developers.filter(dev => 
        dev.location.country.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Ensure we only return the requested number of results
    developers = developers.slice(0, limit);

    return {
      developers,
      total: Math.min(500, developers.length * 10) // Simulate more pages but cap at 500
    };
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    throw error;
  }
};

export const getDeveloperById = async (id: string): Promise<Developer> => {
  try {
    // Use the ID as seed for consistent data
    const res = await api.get<RandomUserResponse>(`/?seed=${id}`);
    if (!res.data.results.length) {
      throw new Error('Developer not found');
    }
    const [dev] = enhanceDevelopers([res.data.results[0]], id);
    return dev;
  } catch (error) {
    console.error('Failed to fetch developer:', error);
    throw error;
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
    return types[hash % types.length];
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