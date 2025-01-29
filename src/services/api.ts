import axios from 'axios';
import type { Developer, Filters } from '@/types';

interface RandomUserResponse {
  results: any[];
  info: {
    results: number;
    page: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://randomuser.me/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getDevelopers = async (
  page: number = 1,
  results: number = 12,
  type: string = 'Full-stack developer',
  location: string = 'United States'
): Promise<{
  developers: Developer[];
  total: number;
}> => {
  try {
    console.log('API Call Params:', { page, results, type, location });
    
    // Fetch more results to ensure we have enough after filtering
    const response = await api.get<RandomUserResponse>(`/?page=${page}&results=${results * 2}&nat=us&seed=platter${page}`);
    console.log('Raw API Response:', response.data);

    // Enhance developers with skills and types
    let developers = enhanceDevelopers(response.data.results, `page${page}`);
    console.log('After Enhancement:', developers.map(d => ({ 
      name: `${d.name.first} ${d.name.last}`,
      type: d.type,
      skills: d.skills,
      location: d.location.country
    })));
    
    // Apply filters
    developers = applyFilters(developers, { type, skills: [] }, location);
    console.log('After Filtering:', { 
      remainingDevelopers: developers.length,
      sampleDev: developers[0] ? {
        name: `${developers[0].name.first} ${developers[0].name.last}`,
        type: developers[0].type,
        location: developers[0].location.country
      } : null
    });
    
    // Calculate total (use a multiplier to simulate more results)
    const total = Math.min(1000, developers.length * 10);

    return {
      developers: developers.slice(0, results),
      total
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const applyFilters = (
  developers: Developer[], 
  filters?: Filters,
  location?: string
): Developer[] => {
  let filtered = [...developers];
  console.log('Starting Filter Process:', { 
    totalDevelopers: developers.length,
    filters,
    location,
    sampleTypes: developers.slice(0, 3).map(d => d.type)
  });

  if (filters?.type) {
    const searchType = filters.type;
    filtered = filtered.filter(dev => dev.type === searchType);
    console.log('After Type Filter:', {
      searchType,
      remainingCount: filtered.length,
      sampleTypes: filtered.slice(0, 3).map(d => d.type)
    });
  }

  if (location) {
    const searchLocation = location.toLowerCase();
    filtered = filtered.filter(dev => 
      dev.location.country.toLowerCase() === searchLocation.toLowerCase()
    );
    console.log('After Location Filter:', {
      searchLocation,
      remainingCount: filtered.length,
      sampleLocations: filtered.slice(0, 3).map(d => d.location.country)
    });
  }

  return filtered;
};

export const getDeveloperById = async (id: string): Promise<Developer> => {
  try {
    const res = await api.get<RandomUserResponse>(`/?seed=${id}`);
    if (!res.data.results.length) {
      throw new Error('Developer not found');
    }
    const [dev] = enhanceDevelopers([res.data.results[0]], id);
    return dev;
  } catch (error) {
    console.error('Failed to fetch developer:', error);
    throw new Error('Failed to fetch developer. Please try again later.');
  }
};

const getRandomType = (seed?: string): string => {
  const types = [
    'Full-stack developer',
    'Frontend developer',
    'Backend developer',
    'Mobile developer',
    'Data scientist'
  ];
  
  if (seed) {
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = Math.floor((hash / types.length) % types.length);
    return types[index];
  }
  
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomSkills = (type: string, seed?: string): string[] => {
  const skillsByType: { [key: string]: string[] } = {
    'Full-stack developer': ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
    'Frontend developer': ['React', 'Vue', 'Angular', 'JavaScript', 'CSS', 'HTML'],
    'Backend developer': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'Redis'],
    'Mobile developer': ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'Flutter'],
    'Data scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas']
  };

  const availableSkills = skillsByType[type] || skillsByType['Full-stack developer'];
  
  if (seed) {
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
  console.log('Enhancing developers with seed:', seed);
  const enhanced = developers.map(dev => {
    const type = getRandomType(seed || dev.login.uuid);
    const skills = getRandomSkills(type, seed || dev.login.uuid);
    const rate = Math.floor(Math.random() * 100) + 50;
    
    console.log('Enhanced developer:', {
      name: `${dev.name.first} ${dev.name.last}`,
      type,
      skills,
      rate
    });
    
    return {
      ...dev,
      skills,
      type,
      rate
    };
  });
  
  console.log('All enhanced developers:', enhanced.map(dev => ({
    name: `${dev.name.first} ${dev.name.last}`,
    type: dev.type,
    skills: dev.skills
  })));
  
  return enhanced;
}; 