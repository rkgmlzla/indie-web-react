import axios from 'axios';
import { baseUrl } from './config';

// 아티스트-1.아티스트 목록 조회
// 아티스트 목록 조회
/**
 * 아티스트 목록 조회
 * GET /artist
 * Request Params: page, size
 * 인증:  불필요
 */
export const fetchArtistList = async ({ page, size }) => {
  try {
    const response = await axios.get(`${baseUrl}/artist`, {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 아티스트 목록 조회 실패:', error);
    throw error;
  }
};





// 아티스트-2.아티스트 상세 정보 조회
/**
 * 아티스트 상세 정보 조회
 * GET /artist/{id}
 * 인증:  없음
 */
export const fetchArtistDetail = async (artistId) => {
  try {
    const response = await axios.get(`${baseUrl}/artist/${artistId}`);
    return response.data;
  } catch (error) {
    console.error(' 아티스트 상세 정보 조회 실패:', error);
    throw error;
  }
};
