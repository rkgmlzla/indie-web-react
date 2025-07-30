import axios from 'axios';

import { baseUrl } from './config';


// 자유게시판-1.글  목록 조회
/**
 *  자유게시판 - 글 목록 조회
 * Method: GET
 * Endpoint: /post
 * Query Params: page, size, sort, type
 * 인증:  필터링 없을 경우 불필요
 */
export const fetchPostList = async ({ page, size, sort, type }) => {
  try {
    const response = await axios.get(`${baseUrl}/post`, {
      params: { page, size, sort, type },
    });
    return response.data;
  } catch (error) {
    console.error(' 게시글 목록 조회 실패:', error);
    throw error;
  }
};




// 자유게시판-2.게시물 상세 정보 조회
/**
 *  게시물 상세 정보 조회
 * Method: GET
 * Endpoint: /post/{postId}
 */
export const fetchPostDetail = async (postId) => {
  try {
    const response = await axios.get(`${baseUrl}/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(' 게시물 상세 조회 실패:', error);
    throw error;
  }
};


// 게시물 -1.작성1(이미지 첨부 O → multipart/form-data)
/**
 * 게시물 작성 (이미지 첨부 O) - 수정 버전
 * 🔹 images가 null/undefined/빈배열일 때 안전하게 처리
 */
export const createPostWithImages = async (title, content, images, authToken) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    // 호ㄱ시모르니, 방어 코드 추가
    if (images && images.length > 0) {
      images.forEach((image) => formData.append('images', image));
    }

    const response = await axios.post(`${baseUrl}/post`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 게시물 작성(이미지첨부) 실패:', error);
    throw error;
  }
};



// 게시물-1. 작성2(이미지 첨부 X → application/json)

/**
 * 게시물 작성 (이미지 첨부 X)
 * POST /post
 * application/json 사용
 */
export const createPost = async (title, content, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/post`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 게시물 작성(텍스트만) 실패:', error);
    throw error;
  }
};




