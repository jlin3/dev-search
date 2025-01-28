import axios from 'axios';
import type { Developer } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://randomuser.me/api'
});

export const getDevelopers = async (page: number = 1, limit: number = 8): Promise<{
  developers: Developer[];
  total: number;
}> => {
  try {
    const res = await api.get(`/?page=${page}&results=${limit}&seed=devsearch`);
    return {
      developers: enhanceDevelopers(res.data.results),
      total: res.data.info.results
    };
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    throw error;
  }
};

export const getDeveloperById = async (id: string): Promise<Developer> => {
  try {
    const res = await api.get(`/?seed=${id}`);
    const [dev] = enhanceDevelopers(res.data.results);
    return dev;
  } catch (error) {
    console.error('Failed to fetch developer:', error);
    throw error;
  }
};

const enhanceDevelopers = (developers: any[]): Developer[] => {
  return developers.map(dev => ({
    ...dev,
    skills: getRandomSkills(),
    type: getRandomType(),
    rate: Math.floor(Math.random() * 100) + 50
  }));
};

// Helper functions
const getRandomSkills = () => {
  const skills = ['React', 'Node.js', 'Python', 'JavaScript', 'Java'];
  return skills.sort(() => 0.5 - Math.random()).slice(0, 3);
};

const getRandomType = () => {
  return ['Full Stack', 'Frontend', 'Backend'][Math.floor(Math.random() * 3)];
}; 