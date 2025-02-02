import axios from 'axios';
import type { Developer, Filters, WorkExperience } from '@/types';

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

// Cache for storing generated developers
let developersCache: {
  [key: string]: {
    developers: Developer[];
    timestamp: number;
  };
} = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const TOTAL_DEVELOPERS = 1000;
const US_DEVELOPERS_RATIO = 0.4; // 40% of developers will be from US

const DEVELOPER_TYPES = [
  'Full Stack developer',
  'Frontend developer',
  'Backend developer',
  'Mobile developer',
  'Data scientist'
] as const;

const SKILLS_BY_TYPE = {
  'Full Stack developer': ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS'],
  'Frontend developer': ['React', 'Vue.js', 'Angular', 'TypeScript', 'SCSS', 'Webpack', 'Jest'],
  'Backend developer': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'Redis'],
  'Mobile developer': ['React Native', 'Swift', 'Kotlin', 'Flutter', 'iOS', 'Android'],
  'Data scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'SQL']
} as const;

const COMPANIES = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb',
  'Twitter', 'LinkedIn', 'Stripe', 'Square', 'Shopify', 'Spotify', 'Slack'
];

const LOCATIONS = [
  { city: 'San Francisco', country: 'United States' },
  { city: 'New York', country: 'United States' },
  { city: 'Seattle', country: 'United States' },
  { city: 'Austin', country: 'United States' },
  { city: 'London', country: 'United Kingdom' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Singapore', country: 'Singapore' },
  { city: 'Tokyo', country: 'Japan' }
];

const FIRST_NAMES = [
  'Michael', 'Sarah', 'David', 'Emma', 'James', 'Emily', 'Daniel', 'Sophia',
  'Alexander', 'Olivia', 'William', 'Ava', 'John', 'Isabella', 'Robert', 'Mia',
  'Thomas', 'Charlotte', 'Richard', 'Amelia'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

function generateWorkExperience(type: string, numYears: number): WorkExperience[] {
  const experience: WorkExperience[] = [];
  let currentYear = new Date().getFullYear();
  let remainingYears = numYears;

  while (remainingYears > 0) {
    const duration = Math.min(Math.floor(Math.random() * 4) + 1, remainingYears);
    const endYear = currentYear;
    const startYear = currentYear - duration;
    
    const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
    const technologies = SKILLS_BY_TYPE[type as keyof typeof SKILLS_BY_TYPE]
      .slice(0, Math.floor(Math.random() * 4) + 2)
      .join(', ');

    experience.push({
      title: type,
      company,
      period: `${startYear} - ${endYear}`,
      achievements: [
        `Led development of key features resulting in 40% increase in user engagement`,
        `Improved application performance by 60% through optimization`,
        `Mentored junior developers and conducted technical interviews`
      ],
      technologies
    });

    currentYear = startYear;
    remainingYears -= duration;
  }

  return experience;
}

function generateDeveloper(seed?: string): Developer {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  
  // Ensure even distribution of developer types
  const typeIndex = Math.floor(Math.random() * DEVELOPER_TYPES.length);
  const type = DEVELOPER_TYPES[typeIndex];
  
  // Get skills for this type
  const availableSkills = SKILLS_BY_TYPE[type as keyof typeof SKILLS_BY_TYPE];
  const numSkills = Math.floor(Math.random() * 3) + 3; // 3-5 skills
  const skills = [...availableSkills]
    .sort(() => Math.random() - 0.5)
    .slice(0, numSkills);

  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const experience = generateWorkExperience(type, Math.floor(Math.random() * 10) + 5); // 5-15 years

  return {
    login: {
      uuid: seed || crypto.randomUUID()
    },
    name: {
      first: firstName,
      last: lastName
    },
    email: `developer${Math.floor(Math.random() * 1000) + 1}@example.com`,
    picture: {
      large: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 70)}.jpg`,
      medium: `https://randomuser.me/api/portraits/med/men/${Math.floor(Math.random() * 70)}.jpg`,
      thumbnail: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random() * 70)}.jpg`
    },
    location,
    type,
    rate: Math.floor(Math.random() * 100) + 50, // $50-150/hr
    skills,
    experience,
    summary: `Experienced ${type.toLowerCase()} with ${experience.length} years of experience. Passionate about building scalable solutions and staying current with industry trends.`
  };
}

const developers: Developer[] = Array.from({ length: 1000 }, (_, i) => generateDeveloper());

export async function getDevelopers(
  page: number = 1,
  type?: string,
  location?: string,
  skills: string[] = []
): Promise<{ developers: Developer[]; total: number }> {
  let filtered = [...developers];

  if (type && type !== 'All Types') {
    filtered = filtered.filter(dev => dev.type === type);
  }

  if (location) {
    const locationLower = location.toLowerCase();
    filtered = filtered.filter(dev => 
      dev.location.city.toLowerCase().includes(locationLower) ||
      dev.location.country.toLowerCase().includes(locationLower)
    );
  }

  if (skills.length > 0) {
    filtered = filtered.filter(dev =>
      skills.every(skill => dev.skills.includes(skill))
    );
  }

  const perPage = 12;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    developers: filtered.slice(start, end),
    total: filtered.length
  };
}

export async function getDeveloperById(id: string): Promise<Developer | null> {
  const developer = developers.find(dev => dev.login.uuid === id);
  return developer || null;
}

const getRandomType = (seed?: string): string => {
  const types = [
    'Full Stack developer',
    'Frontend developer',
    'Backend developer',
    'Mobile developer',
    'Data scientist'
  ];
  
  if (seed) {
    const hex = seed.replace(/-/g, '');
    const intVal = parseInt(hex.substring(0, 8), 16);
    const index = intVal % types.length;
    return types[index];
  }
  
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomSkills = (type: string, seed?: string): string[] => {
  const skillsByType: { [key: string]: string[] } = {
    'Full Stack developer': ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB'],
    'Frontend developer': ['React', 'Vue', 'Angular', 'JavaScript', 'CSS', 'HTML'],
    'Backend developer': ['Node.js', 'Python', 'Java', 'Go', 'PostgreSQL', 'Redis'],
    'Mobile developer': ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin', 'Flutter'],
    'Data scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas']
  };

  const availableSkills = skillsByType[type] || skillsByType['Full Stack developer'];
  
  if (seed) {
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

const generateSummary = (dev: any, type: string, skills: string[], experience: number, seed?: string) => {
  const achievements = [
    'creating high-performance web applications',
    'developing scalable backend systems',
    'building mobile apps with millions of downloads',
    'implementing machine learning solutions',
    'architecting cloud infrastructure',
    'leading development teams',
    'optimizing system performance',
    'designing user interfaces',
    'developing APIs',
    'creating data pipelines'
  ];

  const strengths = [
    'problem-solving',
    'clear communication',
    'technical leadership',
    'system architecture',
    'code quality',
    'agile methodologies',
    'team collaboration',
    'project management',
    'mentoring',
    'innovation'
  ];

  // Use seed to consistently select achievements and strengths
  const seedNum = seed ? parseInt(seed.replace(/[^0-9]/g, '').slice(-4)) : Math.floor(Math.random() * 10000);
  
  const achievement = achievements[seedNum % achievements.length];
  const strength1 = strengths[(seedNum + 1) % strengths.length];
  const strength2 = strengths[(seedNum + 4) % strengths.length];
  const strength3 = strengths[(seedNum + 7) % strengths.length];

  return `${dev.name.first} has over ${experience} years of experience as a ${type.toLowerCase()}, specializing in ${skills.slice(0, 2).join(' and ')}. Notable achievements include ${achievement}. Their key strengths are ${strength1}, ${strength2}, and ${strength3}.`;
};

const enhanceDevelopers = (developers: any[], seed?: string): Developer[] => {
  return developers.map(dev => {
    const type = getRandomType(seed || dev.login.uuid);
    const skills = getRandomSkills(type, seed || dev.login.uuid);
    const rate = Math.floor(Math.random() * 100) + 50;
    const experience = Math.floor(Math.random() * 15) + 5; // 5-20 years of experience
    const summary = generateSummary(dev, type, skills, experience, seed || dev.login.uuid);

    return {
      ...dev,
      skills,
      type,
      rate,
      experience,
      summary
    };
  });
}; 