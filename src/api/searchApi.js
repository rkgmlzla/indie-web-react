import axios from 'axios';
import { baseUrl } from './config';

/**
 * ✅ 공연 + 공연장 검색 (하나의 API에서 둘 다 반환)
 */
export const searchPerformanceAndVenue = async ({ keyword, page, size }) => {
  try {
    const url = `${baseUrl}/search/performance`;
    console.log(`🔗 요청 URL: ${url}?keyword=${keyword}&page=${page}&size=${size}`);

    const response = await axios.get(url, { params: { keyword, page, size } });
    console.log('🎯 공연/공연장 검색 API 응답:', response.data);

    return {
      performances: response.data?.performance || [],
      venues: response.data?.venue || []
    };
  } catch (error) {
    console.error('📛 공연/공연장 검색 실패:', error);
    return { performances: [], venues: [] };
  }
};

/**
 * ✅ 아티스트 검색
 */
export const searchArtist = async ({ keyword, page, size }) => {
  try {
    const url = `${baseUrl}/search/artist`;
    const response = await axios.get(url, { params: { keyword, page, size } });
    return response.data?.artists || [];
  } catch (error) {
    console.error('📛 아티스트 검색 실패:', error);
    return [];
  }
};

/**
 * ✅ 자유게시판 검색
 */
export const searchPost = async ({ keyword, page, size }) => {
  try {
    const url = `${baseUrl}/search/post`;
    const response = await axios.get(url, { params: { keyword, page, size } });
    return response.data?.posts || [];
  } catch (error) {
    console.error('📛 자유게시판 검색 실패:', error);
    return [];
  }
};
