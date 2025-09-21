// src/api/stampApi.js
import http from './http';

const safeArray = (data) => (Array.isArray(data) ? data : data?.stamps || []);

// 스탬프-1. 수집한 스탬프 조회
export const fetchCollectedStamps = async (startMonth, endMonth) => { 
  try {
    const response = await http.get(`/stamps/collected`, { 
      params: { startMonth, endMonth },
    });
    return safeArray(response.data); 
  } catch (error) {
    console.error('❌ 수집한 스탬프 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 스탬프-2. 사용 가능한 스탬프 조회
export const fetchAvailableStamps = async () => {
  try {
    const response = await http.get(`/stamps/available`);
    console.log("공연 결과: ", response.data)
    return safeArray(response.data);
  } catch (error) {
    console.error('❌ 사용 가능한 스탬프 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 스탬프-3. 스탬프 수집
export const collectStamp = async (stampId) => {
  try {
    const response = await http.post(`/stamps/collect`, {
      stampId,
    });
    return response.data; 
  } catch (error) {
    console.error('❌ 스탬프 수집 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 스탬프-4. 스탬프 상세 정보 조회
export const fetchStampDetail = async (stampId) => {
  try {
    const response = await http.get(`/stamps/detail`);
    return response.data; // ✅ 단일 객체 그대로 반환
  } catch (error) {
    console.error('❌ 스탬프 상세 정보 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};