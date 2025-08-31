// src/api/userApi.js
import http from './http';           // ✅ axios 인스턴스 (withCredentials: true)
import { baseUrl } from './config';  // (다른 곳에서 쓸 거면 남겨두고, 여기선 안 써도 됨)

// 1) 로그인 후 사용자 정보 조회
export const fetchUserInfo = async () => {
  const { data } = await http.get('/user/me');  // ✅ 쿠키로 인증
  return data;
};

// 2) 닉네임 수정
export const updateNickname = async (nickname) => {
  const { data } = await http.patch('/user/me', { nickname }); // ✅ 헤더 불필요
  return data;
};

// 3-1) 프로필 이미지 변경 (파일 업로드)
export const updateProfileImage = async (file) => {
  if (!file) {
    console.warn('첨부할 파일이 없습니다. 요청 중단');
    return;
  }
  const formData = new FormData();
  formData.append('profileImage', file);

  const { data } = await http.patch('/user/me/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // ✅ Content-Type만 필요
  });
  return data;
};

// 3-2) 프로필 이미지 제거 (이미지 없음)
export const removeProfileImage = async () => {
  const { data } = await http.patch('/user/me/profile-image', {}); // ✅ 쿠키 인증
  return data;
};

// 4) 알림/위치 설정 ON/OFF
export const updateUserSettings = async (alarmEnabled, locationEnabled) => {
  const body = {
    alarm_enabled: alarmEnabled,
    location_enabled: locationEnabled,
  };
  const { data } = await http.patch('/user/me/setting', body); // ✅ 헤더 불필요
  return data;
};
