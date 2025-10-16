// Application constants

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Next App';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Add your constants here
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

