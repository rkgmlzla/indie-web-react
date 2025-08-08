import axios from 'axios';
import { baseUrl } from './config';

// 공연 찜 ON/OFF (authToken 유지 버전, 최종 수정본)

/**
 * 🎯 공연 찜 등록 (ON)
 * Method: POST
 * Endpoint: /like
 * Body: { type: "performance", refId }
 * 인증 필요: ✅
 */
export const likePerformance = async (refId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/like`,
      { type: 'performance', refId }, // ✅ type은 명세서 값 그대로 사용
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('📛 공연 찜 등록 실패:', error);
    throw error;
  }
};

/**
 * 🎯 공연 찜 해제 (OFF)
 * Method: DELETE
 * Endpoint: /like/{refId}?type=performance
 * Query: type=performance
 * 인증 필요: ✅
 */
export const unlikePerformance = async (refId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/like/${refId}`, // ✅ Path Param: 공연 ID
      {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { type: 'performance' }, // ✅ Query Param 추가
      }
    );
    return response.data;
  } catch (error) {
    console.error('📛 공연 찜 해제 실패:', error);
    throw error;
  }
};

// 아티스트-찜-onoff

/**
 * 🎯 아티스트 찜 등록 (ON)
 * Method: POST
 * Endpoint: /like
 * Body: { type: "artist", refId }
 * 인증 필요: ✅
 */
export const likeArtist = async (artistId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/like`,
      { type: 'artist', refId: artistId },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('📛 아티스트 찜 등록 실패:', error);
    throw error;
  }
};

/**
 * 🎯 아티스트 찜 해제 (OFF)
 * Method: DELETE
 * Endpoint: /like/{artistId}?type=artist
 * Query: type=artist
 * 인증 필요: ✅
 */
export const unlikeArtist = async (artistId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/like/${artistId}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { type: 'artist' } // ✅ Query Param 추가
      }
    );
    return response.data;
  } catch (error) {
    console.error('📛 아티스트 찜 해제 실패:', error);
    throw error;
  }
};



//찜목록-1.공연 목록 조회
/**
 *  찜한 공연 목록 조회 API
 * GET /user/me/like/performance
 * Params: page, size
 * 인증 필요
 */
export const fetchLikedPerformances = async (page, size, authToken) => {
  try {
    const response = await axios.get(`${baseUrl}/user/me/like/performance`, {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 찜한 공연 목록 조회 실패:', error);
    throw error;
  }
};


//찜목록-2.아티스트목록 조회
/**
 *  아티스트 목록 조회
 * Method: GET
 * Endpoint: /user/me/like/artist
 * Query Params: page, size
 * 인증 필요:  (Bearer Token)
 */
export const fetchLikedArtists = async ({ page, size, authToken }) => {
  try {
    const response = await axios.get(`${baseUrl}/user/me/like/artist`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 아티스트 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 🎯 아티스트 알림 등록 (ON)
 * Method: POST
 * Endpoint: /alert
 * Body: { type: "artist", refId }
 * 인증 필요: ✅
 */
export const registerArtistAlert = async (artistId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/alert`,
      { type: 'artist', refId: artistId },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('📛 아티스트 알림 등록 실패:', error);
    throw error;
  }
};

/**
 * 🎯 아티스트 알림 해제 (OFF)
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
        params: { type: 'artist' }
      }
    );
    return response.data;
  } catch (error) {
    console.error('📛 아티스트 알림 해제 실패:', error);
    throw error;
  }
};













