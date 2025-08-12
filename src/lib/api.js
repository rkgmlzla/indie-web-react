// src/lib/api.js
import axios from 'axios';
import { baseUrl } from '../api/config';
const api = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true,
});

export default api;
