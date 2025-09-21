// src/api/stampApi.js
import axios from 'axios';
import { baseUrl } from './config';

// 홈과 동일 규약: 항상 배열 반환 시도
const safeArray = (data) => (Array.isArray(data) ? data : data?.items || data?.list || data?.data || data?.results || []);

// 공통: 인증 헤더(있으면만)
const authHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ 1) 수집한 스탬프 목록 (기간: startMonth~endMonth)
export const fetchCollectedStamps = async (startMonth, endMonth) => {
  try {
    const response = await axios.get(`${baseUrl}/stamps/collected`, {
      headers: authHeaders(),
      params: { startMonth, endMonth },
    });
    // 백엔드가 list 형태 없이 바로 배열을 주므로 그대로 반환
    return Array.isArray(response.data) ? response.data : safeArray(response.data);
  } catch (error) {
    console.error('❌ 수집한 스탬프 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 2) 사용 가능한 스탬프 (3일 이내)
export const fetchAvailableStamps = async () => {
  try {
    const response = await axios.get(`${baseUrl}/stamps/available`, {
      headers: authHeaders(),
    });
    return Array.isArray(response.data) ? response.data : safeArray(response.data);
  } catch (error) {
    console.error('❌ 사용 가능한 스탬프 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 3) 스탬프 수집(찍기)
export const collectStamp = async (performanceId) => {
  try {
    // 서버 스키마: { stampId: number } ← performance_id
    const body = { stampId: performanceId };
    const response = await axios.post(`${baseUrl}/stamps/collect`, body, {
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    });
    return response.data;
  } catch (error) {
    console.error('❌ 스탬프 수집 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 4) 스탬프 상세
export const fetchStampDetail = async (stampId) => {
  try {
    const response = await axios.get(`${baseUrl}/stamps/${stampId}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('❌ 스탬프 상세 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};
