import axios from 'axios';
import { baseUrl } from './config';

// 답글- 1.작성
/**
 *  답글 작성 API
 * POST /post/{postId}/comment/{commentId}
 * 인증 필요
 */
export const createReply = async (postId, parentCommentId, content, authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/post/${postId}/comment/${parentCommentId}`, // parentCommentId → 부모 댓글 ID
      { content }, // Request Body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 답글 작성 실패:', error);
    throw error;
  }
};




