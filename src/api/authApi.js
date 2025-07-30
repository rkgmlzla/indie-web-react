import axios from 'axios';
import { baseUrl } from './config';


//마이페이지-로그인/로그아웃-1.로그인url요청

/** 
 *  카카오 로그인 URL 요청
 * GET /auth/kakao/login
 * 인증 필요 없음
 */
export const getKakaoLoginUrl = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/kakao/login`);
    return response.data;
  } catch (error) {
    console.error(' 카카오 로그인 URL 요청 실패:', error);
    throw error;
  }
};





// 마이페이지-로그인/로그아웃-2.로그인 콜백

/**
 *  카카오 로그인 콜백 (JWT 토큰 발급)
 * GET /auth/kakao/callback?code={authCode}
 * 인증 필요 없음
 */
export const kakaoLoginCallback = async (authCode) => {
  try {
    const response = await axios.get(`${baseUrl}/auth/kakao/callback`, {
      params: { code: authCode },
    });
    return response.data;
  } catch (error) {
    console.error(' 카카오 로그인 콜백 처리 실패:', error);
    throw error;
  }
};


// 마이페이지-로그인/로그아웃-4.로그아웃
/**
 *  로그아웃 API
 * POST /auth/logout
 * 인증 필요
 */
export const logoutUser = async (authToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/auth/logout`,
      {}, // Body 없음
      {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};
