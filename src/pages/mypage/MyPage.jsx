import { useRef, useState, useEffect } from 'react';
import { Settings, Pencil, User } from 'lucide-react';
import './Mypage.css';
import Toggle from '../../components/ui/toggle';
import Header from '../../components/layout/Header';
import axios from 'axios';
import { fetchUserInfo, updateUserSettings } from '../../api/userApi';
import { baseUrl } from '../../api/config';
function MyPage() {
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [editingNickname, setEditingNickname] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);
  const accessToken = useRef(localStorage.getItem('accessToken'));

  // ✅ 유저 정보 불러오기
  useEffect(() => {
    fetchUserInfo(accessToken)
      .then((user) => {
        const profileUrl = user.profile_url;
        setProfileImage(profileUrl ? `${profileUrl}?t=${Date.now()}` : '');
        setNickname(user.nickname);
        setAlarmEnabled(user.alarm_enabled);
        setLocationEnabled(user.location_enabled);
        setImageError(!profileUrl);
      })
      .catch((err) => {
        console.error('[MyPage] 유저 정보 불러오기 실패:', err);
      });
  }, [accessToken]);

  // ✅ 프로필 이미지 클릭 -> 파일창 열기
  const handleProfileClick = () => {
    console.log('[MyPage] 프로필 이미지 클릭');
    fileInputRef.current.click();
  };

  // ✅ 이미지 변경 시 서버 업로드
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('[MyPage] 이미지 선택됨:', file.name);

      try {
        const res = await axios.patch(
          `${baseUrl}/user/me/profile-image`,
          (() => {
            const formData = new FormData();
            formData.append('profileImage', file);
            return formData;
          })(),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('[MyPage] PATCH 성공:', res.data);

        // ✅ 이 한 줄이 핵심
        setProfileImage(`${res.data.profileImageUrl}?t=${Date.now()}`);
        setImageError(false);
      } catch (err) {
        console.error('[MyPage] 프로필 이미지 업로드 오류:', err);
      }
    }
  };

  // ✅ 닉네임 저장
  const handleNicknameSave = async () => {
    console.log('[MyPage] 닉네임 저장 함수 실행됨'); // ✅ 이거 반드시 찍혀야 함
    setEditingNickname(false);
    console.log('[MyPage] 저장 시도 닉네임:', nickname);

    try {
      const res = await axios.patch(
        `${baseUrl}/user/me`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('[MyPage] PATCH /user/me 성공:', res.data);
    } catch (err) {
      console.error('[MyPage] 닉네임 수정 오류:', err);
    }
  };

  // ✅ 알림/위치 설정 변경
  const handleSettingChange = async (key, value) => {
    const newAlarm = key === 'alarm' ? value : alarmEnabled;
    const newLocation = key === 'location' ? value : locationEnabled;

    setAlarmEnabled(newAlarm);
    setLocationEnabled(newLocation);

    try {
      const result = await updateUserSettings(
        newAlarm,
        newLocation,
        accessToken
      );
      console.log('[MyPage] 설정 성공:', result);
    } catch (err) {
      console.error('[MyPage] 설정 실패:', err);
      setAlarmEnabled(alarmEnabled); // 실패 시 롤백
      setLocationEnabled(locationEnabled);
    }
  };

  return (
    <div className="page">
      <Header title="마이페이지" showBack showSearch={false} showMenu={false} />
      <div style={{ height: '30px' }} />

      <div className="profile">
        <div className="profile__container">
          {/* ✅ 프로필 사진 */}
          <div className="profile__left">
            {profileImage && !imageError ? (
              <img
                src={profileImage}
                alt="프로필"
                className="profile__left__img"
                onError={(e) => {
                  console.log('이미지 로딩 실패:', e);
                  if (e.target.src.includes('/static/profiles/')) {
                    setImageError(true);
                  }
                }}
              />
            ) : (
              <User size={64} className="profile__left__img" />
            )}
            <Settings
              className="profile__left__settings"
              onClick={handleProfileClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* ✅ 닉네임 */}
          <div className="profile__name">
            {editingNickname ? (
              <div className="edit-nickname">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={handleNicknameSave}>저장</button>
              </div>
            ) : (
              <>
                <p>{nickname}</p>
                <Pencil
                  className="profile__name__edit"
                  onClick={() => setEditingNickname(true)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="settings">
        <div className="settings__toggle">
          <p>알림 설정</p>
          <Toggle
            value={alarmEnabled}
            onChange={(v) => {
              console.log('알림 스위치 눌렀다:', v); // 🔍 이거 찍히는지 확인
              handleSettingChange('alarm', v);
            }}
          />
        </div>
        <div className="settings__toggle">
          <p>위치정보 사용</p>
          <Toggle
            value={locationEnabled}
            onChange={(v) => handleSettingChange('location', v)}
          />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
