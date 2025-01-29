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
  baseURL: 'https://randomuser.me/api',
  timeout: 10000,
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
    console.log('Fetching developers with params:', { page, limit, filters, location });
    const res = await api.get<RandomUserResponse>(`/?page=${page}&results=${limit * 2}&seed=devsearch${page}`);
    console.log('API response:', res.data);
    
    let developers = enhanceDevelopers(res.data.results, `page${page}`);
    console.log('Enhanced developers:', developers);

    developers = applyFilters(developers, filters, location);
    console.log('After filters:', developers);

    if (developers.length < limit) {
      console.log('Fetching additional developers');
      const additionalRes = await api.get<RandomUserResponse>(
        `/?page=${page + 1}&results=${limit}&seed=devsearch${page + 1}`
      );
      const additionalDevs = enhanceDevelopers(additionalRes.data.results, `page${page + 1}`);
      developers = [...developers, ...applyFilters(additionalDevs, filters, location)];
      console.log('Final developers:', developers);
    }

    return {
      developers: developers.slice(0, limit),
      total: Math.min(1000, developers.length * 10)
    };
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    throw new Error('Failed to fetch developers. Please try again later.');
  }
};

const applyFilters = (
  developers: Developer[], 
  filters?: Filters,
  location?: string
): Developer[] => {
  let filtered = [...developers];
  console.log('Applying filters:', { filters, location });

  if (filters?.type) {
    const searchType = filters.type;
    console.log('Filtering by type:', { searchType });
    console.log('Available types:', filtered.map(dev => dev.type));
    filtered = filtered.filter(dev => dev.type === searchType);
    console.log('After type filter:', filtered.length, 'developers');
  }

  if (filters?.skills?.length) {
    console.log('Filtering by skills:', filters.skills);
    filtered = filtered.filter(dev => 
      filters.skills.every(skill => dev.skills.includes(skill))
    );
    console.log('After skills filter:', filtered.length, 'developers');
  }

  if (location) {
    const searchLocation = location.toLowerCase();
    console.log('Filtering by location:', searchLocation);
    filtered = filtered.filter(dev => 
      dev.location.country.toLowerCase().includes(searchLocation)
    );
    console.log('After location filter:', filtered.length, 'developers');
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
    'Full-Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'Data Scientist'
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
    'Full-Stack Developer': ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
    'Frontend Developer': ['React', 'Vue', 'Angular', 'JavaScript', 'CSS', 'HTML'],
    'Backend Developer': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'Redis'],
    'Mobile Developer': ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'Flutter'],
    'Data Scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas']
  };

  const availableSkills = skillsByType[type] || skillsByType['Full-Stack Developer'];
  
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