import { useRef, useState } from 'react';
import { Settings, Pencil } from 'lucide-react';
import './Mypage.css';
import Toggle from '../../components/ui/toggle';
import Header from '../../components/layout/Header';
import { userSampleData } from '../../data/userSampleData';

function MyPage() {
  const currentUserId = 1;
  const currentUser = userSampleData.find((u) => u.id === currentUserId);

  const [profileImage, setProfileImage] = useState(currentUser.profile);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [editingNickname, setEditingNickname] = useState(false);

  const fileInputRef = useRef(null);

  const handleProfileClick = () => {
    fileInputRef.current.click(); // 숨겨진 파일 선택창 열기
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // 미리보기
      // 실제 저장하려면 서버 업로드 필요
    }
  };

  const handleNicknameSave = () => {
    setEditingNickname(false);
    // 서버에 저장하는 로직 추가 가능
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
          <Toggle />
        </div>
        <div className="settings__toggle">
          <p>위치정보 사용</p>
          <Toggle />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
