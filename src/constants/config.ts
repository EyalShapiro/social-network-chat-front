export const MODE = import.meta.env.MODE || 'test';
export const IS_PROD = MODE === 'test' ? import.meta.env.PROD : MODE === 'production';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
