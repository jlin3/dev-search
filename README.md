# Dev Search

A modern web application built with Next.js and TypeScript for connecting with skilled developers. The platform allows users to search, filter, and connect with developers based on their skills, experience, and expertise.

![Dev Search Screenshot](public/screenshot.png)

## Features

- **Advanced Developer Search**: Find developers by skills, type (Full Stack, Frontend, Backend, etc.), and location
- **Detailed Developer Profiles**: View comprehensive developer profiles including:
  - Professional summary
  - Skills and expertise
  - Work experience
  - Hourly rates
  - Location information
- **Direct Messaging**: Connect with developers through an integrated messaging system
- **Responsive Design**: Fully responsive UI that works seamlessly across desktop and mobile devices
- **Modern UI/UX**: Clean, intuitive interface built with React Bootstrap and custom styling

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: 
  - React Bootstrap
  - Custom SCSS modules
  - Bootstrap Icons
- **State Management**: React Hooks
- **Form Handling**: React Bootstrap Forms
- **API Integration**: Axios
- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jlin3/dev-search.git
   cd dev-search
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add necessary environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
dev-search/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable React components
│   │   ├── Layout/         # Layout components
│   │   └── Search/         # Search-related components
│   ├── services/           # API services
│   ├── styles/             # Global styles and CSS modules
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── package.json           # Project dependencies and scripts
```

## Key Components

- **DeveloperCard**: Displays developer information in a card format
- **InquiryModal**: Handles developer contact form and messaging
- **FilterBar**: Manages search filters and criteria
- **Header**: Main navigation and search interface
- **Profile**: Detailed developer profile view

## Development

### Code Style

The project uses ESLint and Prettier for code formatting. Run linting with:

```bash
npm run lint
# or
yarn lint
```

### Type Checking

```bash
npm run type-check
# or
yarn type-check
```

## Deployment

The project is configured for deployment on Vercel with the following features:

- Automatic deployments on push to main branch
- Environment variable management
- Edge Network CDN
- Serverless Functions support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [React Bootstrap](https://react-bootstrap.github.io/) - UI Component Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vercel](https://vercel.com) - Deployment Platform

## Contact

Jesse Linson - [@jesselinson](https://twitter.com/jesselinson)

Project Link: [https://github.com/jlin3/dev-search](https://github.com/jlin3/dev-search) 