import axios from 'axios';
import { baseUrl } from './config';

// 검색-1.공연 / 공연
//  공연 검색 (카테고리: performance)
/**
 * 공연 또는 공연장 검색
 * GET /search/{category}
 * Params: keyword, page, size
 * 인증:  없음
 */
export const searchByCategory = async ({ category, keyword, page, size }) => {
  try {
    const response = await axios.get(`${baseUrl}/search/${category}`, {
      params: {
        keyword,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 검색 요청 실패:', error);
    throw error;
  }
};




//검색-2.아티스트

//  아티스트 검색
/**
 * 아티스트 검색
 * GET /search/artist
 * Params: keyword, page, size
 * 인증:  불필요
 */
export const searchArtist = async ({ keyword, page, size }) => {
  try {
    const response = await axios.get(`${baseUrl}/search/artist`, {
      params: {
        keyword,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 아티스트 검색 실패:', error);
    throw error;
  }
};




// 검색- 3.자유게시판

//  자유게시판 검색
/**
 * 자유게시판 검색
 * GET /search/post
 * Params: keyword, page, size
 * 인증:  불필요
 */
export const searchPost = async ({ keyword, page, size }) => {
  try {
    const response = await axios.get(`${baseUrl}/search/post`, {
      params: {
        keyword,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 자유게시판 검색 실패:', error);
    throw error;
  }
};


