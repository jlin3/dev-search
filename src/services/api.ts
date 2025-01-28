import axios from 'axios';
import type { Developer } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://randomuser.me/api'
});

export const getDevelopers = async (count: number = 100): Promise<Developer[]> => {
  try {
    const res = await api.get(`/?results=${count}&seed=devsearch`);
    return enhanceDevelopers(res.data.results);
  } catch (error) {
    console.error('Failed to fetch developers:', error);
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
  return ['Full Stack', 'Frontend', 'Backend'][Math.floor(Math.random() * 3)] as Developer['type'];
}; 