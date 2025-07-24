import { useEffect, useState } from 'react';
import { Settings, Pencil, User } from 'lucide-react';
import './Mypage.css';
import Toggle from '../../components/ui/toggle';
import { supabase } from '../../lib/supabase';

function MyPage() {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        // 카카오의 경우 user.user_metadata.full_name이나 nickname 등에 정보가 담김
        const name =
          user.user_metadata.full_name ||
          user.user_metadata.name ||
          user.user_metadata.nickname ||
          '사용자';
        setUserName(name);
      } else if (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error.message);
      }
    };

    fetchUserInfo();
  }, []);
  // 프로필
  return (
    <div className="page">
      <div className="profile">
        <div className="profile__container">
          {/* 프로필 사진 */}
          <div className="profile__left">
            <User className="profile__left__img" />
            <Settings className="profile__left__settings" />
          </div>
          {/* 이름 */}
          <div className="profile__name">
            <p>{userName}</p>
            <Pencil className="profile__name__edit" />
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
