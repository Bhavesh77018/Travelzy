// API Base URL
// For local development: http://localhost:3000
// For production (Vercel): Replace this with your actual Vercel URL, e.g., https://travelzy-server.vercel.app

export const API_BASE_URL = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://travelzy.vercel.app';
