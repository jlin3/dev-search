import type { Developer } from '@/types/developer';

interface HomeProps {
  initialDevelopers: Developer[];
  error?: string;
}

export async function getServerSideProps() {
  try {
    const res = await axios.get('https://randomuser.me/api/?results=100&seed=devsearch');
    
    const enhanced = res.data.results.map((dev: any) => ({
      ...dev,
      skills: ['React', 'Node.js', 'Python', 'JavaScript', 'Java']
        .sort(() => 0.5 - Math.random())
        .slice(0, 3),
      type: ['Full Stack', 'Frontend', 'Backend'][Math.floor(Math.random() * 3)],
      rate: Math.floor(Math.random() * 100) + 50
    }));
    
    return { props: { initialDevelopers: enhanced } };
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    return { 
      props: { 
        initialDevelopers: [],
        error: 'Failed to load developers. Please try again later.'
      } 
    };
  }
}

export default function Home({ initialDevelopers, error }: HomeProps) {
  // ... existing useState declarations ...

  if (error) {
    return (
      <Layout>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Layout>
    );
  }

  // ... rest of the component remains the same ...
} 