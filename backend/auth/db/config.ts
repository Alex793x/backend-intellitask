// Should be in the format "https://<yourapp>.clerk.accounts.dev"

// Add the domains that you want to allow to access your API
export const AUTHORIZED_PARTIES = [
  'http://localhost:3000', // Add your frontend URL here
  'http://localhost:4000', // Encore
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4000',
  'https://landingpage.intellioptima.com',
  'https://intellitask-tanstack-front.vercel.app',
  'https://intellitask.io',
  'https://appleid.apple.com',
];
