'use server'

import { Developer } from '@/types'

export async function getDeveloperData(id: string): Promise<Developer> {
  return {
    id: '1',
    name: {
      first: 'George',
      last: 'Griffin'
    },
    type: 'Full-stack developer',
    avatar: '/images/george.jpg',
    bio: 'George has over 15 years of experience as a full-stack developer, including creating a #1 iOS game in 2008 and scaling Yahoo! ad servers. George\'s strengths are adaptability, clear communication, and a relentless focus on the details that get projects shipped.',
    location: {
      city: 'New York',
      country: 'United States'
    },
    experience: [
      {
        title: 'CEO',
        company: 'MobilityDrive',
        period: '2009 - present',
        achievements: [
          'Developed iOS apps which has been installed on over 15 million devices and RocketScience app was #1 in the App Store in December 2007.',
          'Created other games including RPG TrueMasters',
          'Co-author of VisualMadness 360 for Global Retailers, enterprise iPad app that provides supermarkets with a way to direct store layouts and perform visual (photo-based) audits.',
          'Developed a social photo sharing platform that transcends language and location through video and photo conversations. Used Unique UX, localization, real-time translation, and web services.'
        ],
        technologies: ['iOS', 'C', 'C++', 'Objective-C', 'Parse.com', 'OpenGL', 'REST', 'Web Services', 'Cheetah3D']
      },
      {
        title: 'Team Lead',
        company: 'MultiMedia LLC',
        period: '2004 - 2008',
        achievements: [
          'Developed technical integrations of Right Media Ad Server into the Yahoo! API platform.',
          'Led numerous end-to-end API feature implementations from design, development, and testing to production, deployment and monitoring.',
          'Developed numerous internal-facing tools and web services for Yahoo! Sales and Engineering and Search Marketing groups.',
          'Developed several tool prototypes and integrated various group efforts for project Panama.',
          'Developed the Right Media back-end display advertising server system.'
        ],
        technologies: ['Perl', 'C++']
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
  }
} 