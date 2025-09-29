// src/api/stampApi.js
import http from './http';

const safeArray = (data) => (Array.isArray(data) ? data : data?.stamps || []);

// 로그인 확인
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 스탬프 - 1. 수집한 스탬프 조회
export const fetchCollectedStamps = async (startMonth, endMonth) => { 
  try {
    const response = await http.get(`/stamps/collected`, { 
      params: { startMonth, endMonth },
      headers: getAuthHeader(),
    });

    const mapped = (Array.isArray(response.data) ? response.data : []).map(item => ({
      id: item.id,
      performanceId: item.performance?.id,
      title: item.performance?.title, 
      venue: item.performance?.venue?.name,
      posterUrl: item.performance?.image_url,          
      venueImageUrl: item.performance?.venue?.image_url,
      date: formatDate(item.performance?.date),
      is_collected: true, // 이미 수집한 스탬프니까 무조건 true
    }));

    return mapped;
  } catch (error) {
    console.error('❌ 수집한 스탬프 조회 실패:', error.response?.data || error.message);
    throw error;
  }
}

// 스탬프 - 2. 사용 가능한 스탬프 조회
export const fetchAvailableStamps = async () => {
  try {
    const response = await http.get(`/stamps/available`, {
      headers: getAuthHeader(),
    });
    console.log("공연 결과: ", response.data);
    console.log("사용 가능한 스탬프 raw data:", response.data);


    const mapped = (Array.isArray(response.data) ? response.data : []).map(item => ({
      id: item.id,
      venue: item.venue,   
      posterUrl: item.posterUrl,              
      venueImageUrl: item.venueImageUrl,    
      date: item.date,
      is_collected: item.is_collected || false,
    }));

    return mapped;
  } catch (error) {
    console.error('❌ 사용 가능한 스탬프 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 스탬프 - 3. 스탬프 수집
export const collectStamp = async (stampId) => {
  try {
    const response = await http.post(`/stamps/collect`, { stampId } , {
      headers: getAuthHeader(), 'Content-Type': 'application/json',
    });
    return response.data; 
  } catch (error) {
    console.error('❌ 스탬프 수집 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 스탬프 - 4. 스탬프 상세 정보 조회
export const fetchStampDetail = async (stampId) => {
  try {
    const response = await http.get(`/stamps/detail`, {
      headers: getAuthHeader(),
    });
    return response.data; // ✅ 단일 객체 그대로 반환
  } catch (error) {
    console.error('❌ 스탬프 상세 정보 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} (${dayNames[d.getDay()]})`;
};

