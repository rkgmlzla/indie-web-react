// src/api/moodApi.js

import axios from 'axios';
import { baseUrl } from './config';

// 기존과 동일
const safeArray = (data) => (Array.isArray(data) ? data : data?.performances || []);

// ✅ 무드 목록
export const fetchMoods = async () => {
  try {
    // (변경 전) `${baseUrl}/mood`
    const response = await axios.get(`${baseUrl}/performance/mood`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('❌ 무드 목록 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 특정 무드별 공연
export const fetchPerformancesByMood = async (moodId) => {
  try {
    // (변경 전) `${baseUrl}/mood/${moodId}/performances`
    const response = await axios.get(`${baseUrl}/performance/mood/${moodId}/performances`);
    return safeArray(response.data);
  } catch (error) {
    console.error('❌ 무드별 공연 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};
