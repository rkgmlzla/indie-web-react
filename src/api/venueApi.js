import axios from 'axios';

import { baseUrl } from './config';


//가까운공연 찾기-1.사용자 위치 기반 반경 3km이내 공연장 조회
/**
 *  사용자 위치 기준 3km 이내 공연장 조회 API
 * GET /nearby/venue
 * Params: lat, lng, radius
 * 인증 필요 없음
 */
export const fetchNearbyVenues = async (lat, lng, radius = 3) => {
  try {
    const response = await axios.get(`${baseUrl}/nearby/venue`, {
      params: { lat, lng, radius },
    });
    return response.data;
  } catch (error) {
    console.error(' 주변 공연장 조회 실패:', error);
    throw error;
  }
};



// 공연장 - 1. 공연장 목록 조회 


/**
 * 공연장 목록 조회
 * Method: GET
 * Endpoint: /venue
 * Query Params: page, size, region
 * 인증:  필요 없음
 */
// 공연장 - 2. 공연장 상세 정보 조회 
export const fetchVenueList = async ({ page, size, region }) => {
  try {
    let regionParam = null;

    // ✅ region이 배열인 경우 → 콤마 문자열로 변환
    if (Array.isArray(region)) {
      regionParam = region.length > 0 ? region.join(",") : null;
    } 
    // ✅ region이 문자열인 경우 → 그대로 사용
    else if (typeof region === "string" && region.trim() !== "") {
      regionParam = region.trim();
    }

    const response = await axios.get(`${baseUrl}/venue`, {
      params: { page, size, region: regionParam },
    });

    const data = response.data;
    return data.venue || [];
  } catch (error) {
    console.error("❌ 공연장 목록 조회 실패:", error.response?.data || error.message);
    throw error;
  }
};

/**
 *  공연장 상세 정보 조회
 * Method: GET
 * Endpoint: /venue/{id}
 * Path Param: id (공연장 ID)
 * 인증:  필요 없음
 */
export const fetchVenueDetail = async (venueId) => {
  try {
    const response = await axios.get(`${baseUrl}/venue/${venueId}`);
    return response.data;
  } catch (error) {
    console.error(' 공연장 상세 정보 조회 실패:', error);
    throw error;
  }
};





