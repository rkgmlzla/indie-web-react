import axios from 'axios';
import { baseUrl, authBaseUrl } from '../api/config';

const api = axios.create({
  baseURL: baseUrl || '/',
  withCredentials: true,
  validateStatus: (s) => s < 500, // 401/403도 throw 안 함
});

// /auth/* 만 백엔드 절대주소
api.interceptors.request.use((cfg) => {
  const url = typeof cfg.url === 'string' ? cfg.url : '';
  if (url.startsWith('/auth/')) cfg.baseURL = authBaseUrl;
  return cfg;
});

// ⛔ 전역 401 리다이렉트 제거! (보호 페이지에서만 라우트 가드로 처리)
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;
