import http from './http';

// 1) 로그인 후 사용자 정보 조회
export const fetchUserInfo = async () => {
 const res = await http.get('/user/me'); // 실제 엔드포인트에 맞춰 수정
  // http.js는 401도 resolve 하므로, 여기서 직접 분기
  if (res.status === 401 || res.status === 403) return null;       // 비로그인
  if (res.status !== 200) throw new Error(res.data?.message || `HTTP ${res.status}`);
  return res.data; // 로그인한 유저 정보
};

// 2) 닉네임 수정
export const updateNickname = async (nickname) => {
  const { data } = await http.patch('/user/me', { nickname }); 
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

export const logout = async () => {
  try {
    const res = await http.post('/auth/logout'); // 쿠키 포함해서 요청됨
    return res.data;
  } catch (e) {
    // 이미 만료/401이어도 어차피 클라이언트에 남은 건 없애고 넘어가면 됨
    return { message: '이미 로그아웃 상태입니다.' };
  }
};

export const fetchUserInfoOptional = async () => {
  const res = await http.get('/user/me');   // validateStatus로 401도 throw 안 함
  if (res.status === 200) return res.data;
  return null;
};