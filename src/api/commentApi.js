import axios from 'axios';
import { baseUrl } from './config';

//댓글- 1.댓글목록 조회 
/**
 * 댓글 목록 조회
 * GET /post/{postId}/comment
 * Params: page, size
 * 인증 필요 없음
 */
export const fetchComments = async (postId, page, size) => {
  try {
    const response = await axios.get(`${baseUrl}/post/${postId}/comment`, {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 댓글 목록 조회 실패:', error);
    throw error;
  }
};





//댓글 - 2.작성
export const createComment = async (postId, content, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/post/${postId}/comment`,
      { content }, // Request Body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // 인증 필요
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 댓글 작성 실패:', error);
    throw error;
  }
};





// 댓글 - 3.수정
//  댓글 수정 API
export const updateComment = async (postId, commentId, content, authToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/post/${postId}/comment/${commentId}`,
      { content }, // Request Body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // 인증 필요
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 댓글 수정 실패:', error);
    throw error;
  }
};





//댓글 -4.삭제
/**
 * //댓글 삭제 API
 * DELETE /post/{postId}/comment/{commentId}
 * 인증 필요
 */
export const deleteComment = async (postId, commentId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/post/${postId}/comment/${commentId}`, // 🔹 동적 ID 사용
      {
        headers: {
          Authorization: `Bearer ${authToken}`, //  인증 토큰
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 댓글 삭제 실패:', error);
    throw error;
  }
};



