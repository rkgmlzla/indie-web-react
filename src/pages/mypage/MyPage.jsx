import { useRef, useState, useEffect } from 'react';
import { Settings, Pencil, User } from 'lucide-react';
import './Mypage.css';
import Toggle from '../../components/ui/toggle';
import Header from '../../components/layout/Header';
import {
  fetchUserInfo,
  updateNickname,
  updateUserSettings,
  updateProfileImage,
} from '../../api/userApi';

function MyPage() {
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [editingNickname, setEditingNickname] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  // ✅ 유저 정보 불러오기
  useEffect(() => {
    fetchUserInfo()
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
  }, []);

  // ✅ 프로필 이미지 클릭 -> 파일창 열기
  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  // ✅ 이미지 변경 시 서버 업로드
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const res = await updateProfileImage(file);
        setProfileImage(`${res.profileImageUrl}?t=${Date.now()}`);
        setImageError(false);
      } catch (err) {
        console.error('[MyPage] 프로필 이미지 업로드 오류:', err);
      }
    }
  };

  // ✅ 닉네임 저장
  const handleNicknameSave = async () => {
    setEditingNickname(false);
    try {
      const res = await updateNickname(nickname);
      console.log('[MyPage] PATCH /user/me 성공:', res);
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
      const result = await updateUserSettings(newAlarm, newLocation);
      console.log('[MyPage] 설정 성공:', result);
    } catch (err) {
      console.error('[MyPage] 설정 실패:', err);
      setAlarmEnabled(alarmEnabled);
      setLocationEnabled(locationEnabled);
    }
  };

  return (
    <div className="page">
      <Header title="마이페이지" showBack showSearch={false} showMenu={false} />
      <div style={{ height: '30px' }} />

      <div className="profile">
        <div className="profile__container">
          {/* 프로필 사진 */}
          <div className="profile__left">
            {profileImage && !imageError ? (
              <img
                src={profileImage}
                alt="프로필"
                className="profile__left__img"
                onError={(e) => {
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

          {/* 닉네임 */}
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
            onChange={(v) => handleSettingChange('alarm', v)}
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
