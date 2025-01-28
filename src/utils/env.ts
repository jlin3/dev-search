export const validateEnv = () => {
  const required = [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(key => `  - ${key}`).join('\n')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }
}; 