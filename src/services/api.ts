import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fullstack-project-eh5a.onrender.com',
  timeout: 15000,
});
