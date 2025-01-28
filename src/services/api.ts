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
    const res = await api.get<RandomUserResponse>(`/?page=${page}&results=${limit}&seed=devsearch`);
    let developers = enhanceDevelopers(res.data.results);

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

    // Apply location filter
    if (location) {
      developers = developers.filter(dev => 
        dev.location.country.toLowerCase() === location.toLowerCase()
      );
    }

    return {
      developers,
      total: developers.length * 5 // Simulate more pages of filtered results
    };
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    throw error;
  }
};

export const getDeveloperById = async (id: string): Promise<Developer> => {
  try {
    const res = await api.get<RandomUserResponse>(`/?seed=${id}`);
    const [dev] = enhanceDevelopers(res.data.results);
    return dev;
  } catch (error) {
    console.error('Failed to fetch developer:', error);
    throw error;
  }
};

const getRandomType = () => {
  const types = [
    'Full-stack',
    'Frontend',
    'Backend',
    'Mobile',
    'Data Scientist'
  ];
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomSkills = (type: string): string[] => {
  const skillsByType: { [key: string]: string[] } = {
    'Full-stack': ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
    'Frontend': ['React', 'Vue', 'Angular', 'JavaScript', 'CSS', 'HTML'],
    'Backend': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'Redis'],
    'Mobile': ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'Flutter'],
    'Data Scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas']
  };

  const availableSkills = skillsByType[type] || skillsByType['Full-stack'];
  const shuffled = [...availableSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const enhanceDevelopers = (developers: any[]): Developer[] => {
  return developers.map(dev => {
    const type = getRandomType();
    return {
      ...dev,
      skills: getRandomSkills(type),
      type,
      rate: Math.floor(Math.random() * 100) + 50
    };
  });
}; 