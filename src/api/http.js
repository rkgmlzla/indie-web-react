// src/api/http.js
import axios from 'axios';
import { authBaseUrl } from './config';

const http = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  validateStatus: (s) => s < 500,
});

http.interceptors.request.use((cfg) => {
  const u = typeof cfg.url === 'string' ? cfg.url : '';
  if (u.startsWith('/auth/')) cfg.baseURL = authBaseUrl;
  return cfg;
});

// ⛔ 401 자동 리다이렉트 절대 금지
http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default http;
