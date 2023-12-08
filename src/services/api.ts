import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fullstack-backend-3d2r.onrender.com',
  timeout: 8000,
});
