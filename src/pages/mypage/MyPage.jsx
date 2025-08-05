import { useRef, useState, useEffect } from 'react';
import { Settings, Pencil } from 'lucide-react';
import './Mypage.css';
import Toggle from '../../components/ui/toggle';
import Header from '../../components/layout/Header';
import axios from 'axios';

function MyPage() {
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [editingNickname, setEditingNickname] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const fileInputRef = useRef(null);

  // ✅ accessToken은 실제 로그인 로직에 따라 설정 필요
  const accessToken = localStorage.getItem('accessToken');

  // ✅ 유저 정보 불러오기
  useEffect(() => {
    axios
      .get('/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const user = res.data;
        setProfileImage(user.profile_url);
        setNickname(user.nickname);
        setAlarmEnabled(user.alarmEnabled);
        setLocationEnabled(user.locationEnabled);
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
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl); // 미리보기

      const formData = new FormData();
      formData.append('profileImage', file);

      await axios.patch('/user/me/profile-image', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  };

  // ✅ 닉네임 저장
  const handleNicknameSave = async () => {
    setEditingNickname(false);
    await axios.patch(
      '/user/me',
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  // ✅ 알림/위치 설정 변경
  const handleSettingChange = async (key, value) => {
    const newAlarm = key === 'alarm' ? value : alarmEnabled;
    const newLocation = key === 'location' ? value : locationEnabled;

    setAlarmEnabled(newAlarm);
    setLocationEnabled(newLocation);

    await axios.patch(
      '/user/me/setting',
      {
        alarmEnabled: newAlarm,
        locationEnabled: newLocation,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };
  return (
    <div className="page">
      <Header title="마이페이지" showBack showSearch={false} showMenu={false} />
      <div style={{ height: '30px' }} />

      <div className="profile">
        <div className="profile__container">
          {/* ✅ 프로필 사진 */}
          <div className="profile__left">
            <img
              src={profileImage}
              alt="프로필"
              className="profile__left__img"
            />
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
