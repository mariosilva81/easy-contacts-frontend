import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://easy-contacts-svuu.onrender.com',
  timeout: 8000,
});
