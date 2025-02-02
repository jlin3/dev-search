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
  type?: string,
  location?: string,
  skills?: string[]
): Promise<{
  developers: Developer[];
  total: number;
  locations: string[];
}> => {
  try {
    // Fetch more results to ensure we have enough after filtering
    const response = await api.get<RandomUserResponse>(`/?page=${page}&results=${results * 3}&seed=platter${page}`);

    // Enhance developers with skills and types
    let developers = enhanceDevelopers(response.data.results, `page${page}`);
    
    // Get unique locations
    const uniqueLocations = Array.from(new Set(developers.map(dev => dev.location.country))).sort();
    
    // Apply filters if any filter criteria is specified
    if (type || location || (skills && skills.length > 0)) {
      // Pass filters object including type and skills
      developers = applyFilters(developers, { type: type || '', skills: skills || [] }, location);
    }
    
    // Calculate total (use a multiplier to simulate more results)
    const total = Math.min(1000, developers.length * 10);

    return {
      developers: developers.slice(0, results),
      total,
      locations: uniqueLocations
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const applyFilters = (
  developers: Developer[],
  filters?: { type: string; skills: string[] },
  location?: string
): Developer[] => {
  let filtered = [...developers];

  if (filters?.type) {
    filtered = filtered.filter(dev => dev.type === filters.type);
  }

  if (location) {
    const searchLocation = location.toLowerCase();
    filtered = filtered.filter(dev => 
      dev.location.country.toLowerCase().includes(searchLocation)
    );
  }

  // New: filter by skills if any are selected
  if (filters?.skills && filters.skills.length > 0) {
    filtered = filtered.filter(dev => 
      filters.skills.every(skill => dev.skills.includes(skill))
    );
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
    // Use UUID to generate consistent type based on position
    const uuidNumber = parseInt(seed.replace(/[^0-9]/g, '').slice(0, 2));
    const index = uuidNumber % types.length;
    console.log('Type generation:', { seed, uuidNumber, index, selectedType: types[index] });
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
    // Use consistent hashing for skills based on UUID
    const uuidNumber = parseInt(seed.replace(/[^0-9]/g, '').slice(-4));
    const shuffled = [...availableSkills].sort((a, b) => {
      const hashA = (uuidNumber + a.charCodeAt(0)) % availableSkills.length;
      const hashB = (uuidNumber + b.charCodeAt(0)) % availableSkills.length;
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
    const experience = Math.floor(Math.random() * 10) + 5; // consistent experience value
    console.log('Enhanced developer:', {
      name: `${dev.name.first} ${dev.name.last}`,
      type,
      skills,
      rate,
      experience
    });
    return {
      ...dev,
      skills,
      type,
      rate,
      experience
    };
  });
  
  console.log('All enhanced developers:', enhanced.map(dev => ({
    name: `${dev.name.first} ${dev.name.last}`,
    type: dev.type,
    skills: dev.skills
  })));
  
  return enhanced;
}; 