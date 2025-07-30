import axios from 'axios';

import { baseUrl } from './config';



// 자유게시판 - 좋아요-1.좋아요 ON (수정 완료)
/**
 *  게시물 좋아요 ON
 * POST /post/{postId}/like
 * 인증 필요
 */
export const likePost = async (postId, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/post/${postId}/like`,
      {
        type: 'post',
        refId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // ✅ 토큰을 인자로 전달
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 게시물 좋아요 실패:', error);
    throw error;
  }
};


// 자유게시판 - 좋아요-좋아요 OFF (수정 완료)
/**
 *  게시물 좋아요 OFF
 * DELETE /post/{postId}/like
 * 인증 필요
 */
export const unlikePost = async (postId, authToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/post/${postId}/like`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // ✅ 토큰을 인자로 전달
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 게시물 좋아요 해제 실패:', error);
    throw error;
  }
};

