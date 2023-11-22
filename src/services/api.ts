import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://fullstack-project-eh5a.onrender.com',
  baseURL: 'http://localhost:3000',
  timeout: 15000,
});
