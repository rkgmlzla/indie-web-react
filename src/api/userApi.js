import axios from 'axios';

import { baseUrl } from './config';


//마이페이지-로그인/로그아웃- 3.로그인 후 유저 정보 조회
/**
 *  로그인 후 사용자 정보 조회 API
 * GET /user/me
 * 인증 필요 (Authorization 헤더)
 */
export const fetchUserInfo = async (authToken) => {
  try {
    const response = await axios.get(`${baseUrl}/user/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 사용자 정보 조회 실패:', error);
    throw error;
  }
};


//마이페이지-설정변경-1.닉네임수정
/**
 *  닉네임 수정 API
 * PATCH /user/me
 * 인증 필요
 */
export const updateNickname = async (nickname, authToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/user/me`,
      { nickname }, // Request Body
      {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 닉네임 수정 실패:', error);
    throw error;
  }
};

//마이페이지-설정변경-2.프로필 이미지 변경1(이미지 첨부 O → multipart/form-data)
/**
 * 프로필 이미지 변경 (이미지 첨부 O) - 수정 버전
 *  file이 null/undefined일 때 요청하지 않도록 방어 코드 추가
 */
export const updateProfileImage = async (file, authToken) => {
  try {
    if (!file) {
      console.warn(' 첨부할 파일이 없습니다. 요청을 중단합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    const response = await axios.patch(`${baseUrl}/user/me/profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 프로필 이미지 변경(파일) 실패:', error);
    throw error;
  }
};





//마이페이지-설정변경-2.프로필 이미지 변경2( 이미지 첨부 X → application/json)
/**
 *  프로필 이미지 제거 (이미지 첨부 X)
 * PATCH /user/me/profile-image
 * application/json 사용
 */
export const removeProfileImage = async (authToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/user/me/profile-image`,
      {}, // Body 비워서 전송
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 프로필 이미지 제거 실패:', error);
    throw error;
  }
};






//마이페이지-설정변경-3.알림/위치 설정 ON OFF 
/**
 *  알림/위치 설정 ON/OFF API
 * PATCH /user/me/setting
 * 인증 필요
 */
export const updateUserSettings = async (alarmEnabled, locationEnabled, authToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/user/me/setting`,
      {
        alarm_enabled: alarmEnabled,
        location_enabled: locationEnabled,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(' 알림/위치 설정 변경 실패:', error);
    throw error;
  }
};





