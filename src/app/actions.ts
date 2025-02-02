'use server'

import type { Developer } from '@/types'

// This is a mock function that would be replaced with actual database calls
export async function getDeveloper(id: string): Promise<Developer | null> {
  // Mock data for development
  const mockDev: Developer = {
    id,
    name: {
      first: 'George',
      last: 'Griffin'
    },
    type: 'Full-stack developer',
    avatar: '/avatar.jpg',
    bio: 'George has over 15 years of experience as a full-stack developer, including creating a #1 iOS game in 2008 and scaling Yahoo! ad servers. George\'s strengths are adaptability, clear communication, and a relentless focus on the details that get projects shipped.',
    location: {
      city: 'New York',
      country: 'United States'
    },
    experience: [
      {
        role: 'CEO',
        company: 'MobilityDrive',
        period: '2009 - present',
        achievements: [
          'Developed iOS apps which has been installed on over 15 million devices and RocketScience app was #1 in the App Store in December 2007.',
          'Created other games including RPG TrueMasters',
          'Co-author of VisualMadness 360 for Global Retailers, enterprise iPad app that provides supermarkets with a way to direct store layouts and perform visual (photo-based) audits.'
        ],
        technologies: ['iOS', 'C', 'C++', 'Objective-C', 'Parse.com', 'OpenGL', 'REST', 'Web Services', 'Cheetah3D']
      }
    ],
    skills: [
      'Mobile iOS development',
      'CTO management',
      'Python development',
      'C++ development',
      'Parse.com',
      'Swift',
      'REST API architecture'
    ]
  };

  return mockDev;
} 