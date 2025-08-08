import axios from 'axios';
import { baseUrl } from './config';

//공연=알림-알림onoff
/**
 * 🎯 공연 예매 알림 등록 (ON)
 * Method: POST
 * Endpoint: /alert
 * Body: { type: "performance", refId }
 * 인증 필요: ✅
 */
export const registerPerformanceAlert = async (refId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/alert`,
      { type: 'performance', refId }, // ✅ 명세서 Body 적용
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('📛 공연 예매 알림 등록 실패:', error);
    throw error;
  }
};

/**
 * 🎯 공연 예매 알림 해제 (OFF)
 * Method: DELETE
 * Endpoint: /alert/{refId}?type=performance
 * Query: type=performance
 * 인증 필요: ✅
 */
export const cancelPerformanceAlert = async (refId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/alert/${refId}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { type: 'performance' }, // ✅ Query Param 추가
      }
    );
    return response.data;
  } catch (error) {
    console.error('📛 공연 예매 알림 해제 실패:', error);
    throw error;
  }
};




//아티스트-알림-알림 onoff
/**
 * 🎯 아티스트 알림 ON
 * Method: POST
 * Endpoint: /alert
 * Body: { type: "artist", refId }
 * 인증 필요: ✅
 */
export const registerArtistAlert = async (artistId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/alert`,
      { type: 'artist', refId: artistId }, // ✅ 이걸로 돌려놓자
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('📛 아티스트 알림 등록 실패:', error.response?.data || error);
    throw error;
  }
};

/**
 * 🎯 아티스트 알림 OFF
 * Method: DELETE
 * Endpoint: /alert/{artistId}?type=artist
 * Query: type=artist
 * 인증 필요: ✅
 */
export const cancelArtistAlert = async (artistId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/alert/${artistId}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { type: 'artist' } // ✅ Query Param 추가
      }
    );
    return response.data;
  } catch (error) {
    console.error('📛 아티스트 알림 해제 실패:', error);
    throw error;
  }
};

