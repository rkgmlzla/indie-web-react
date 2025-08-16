import React, { useEffect, useState, useRef } from 'react';
import styles from './Sidebar.module.css';
import { ChevronLeft, Bell, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../api/userApi';

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [imageError, setImageError] = useState(false);
  const accessToken = useRef(localStorage.getItem('accessToken'));

  useEffect(() => {
    fetchUserInfo(accessToken)
      .then((user) => {
        const profileUrl = user.profile_url;
        setProfileImage(profileUrl ? `${profileUrl}?t=${Date.now()}` : '');
        setNickname(user.nickname || '');
        setImageError(!profileUrl);
      })
      .catch((err) => console.error('[Sidebar] 유저 정보 불러오기 실패:', err));
  }, [accessToken]);

  const menuItems = [
    { label: '공연', path: '/performance' },
    { label: '공연장', path: '/venue' },
    { label: '아티스트', path: '/artist' },
    { label: '자유게시판', path: '/bulletinboard' },
    { label: '가까운 공연 찾기', path: '/map' },
  ];

  const handleBellClick = () => {
    navigate('/notification');
    onClose();
  };
  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className={styles.portal}>
      {/* 어두운 배경(클릭 시 닫힘) */}
      <div className={styles.overlay} onClick={onClose} />

      {/* 앱과 동일한 max-width로 가운데 정렬되는 프레임 */}
      <div className={styles.frame}>
        <aside className={styles.sidebar}>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <ChevronLeft
                size={50}
                color="#FF6B00"
                className={styles.iconBack}
                onClick={onClose}
              />
              <Bell
                size={22}
                color="#000000"
                className={styles.iconNotification}
                onClick={handleBellClick}
              />
            </div>

            <div className={styles.profileSection}>
              {profileImage && !imageError ? (
                <img
                  src={profileImage}
                  alt="프로필 이미지"
                  className={styles.profileImage}
                  onError={(e) => {
                    if (e.target.src.includes('/static/profiles/')) setImageError(true);
                  }}
                />
              ) : (
                <User size={64} className="profile__left__img" />
              )}

              <div className={styles.nicknameArea}>
                <div
                  className={styles.nicknameRow}
                  onClick={() => {
                    navigate('/mypage');
                    onClose();
                  }}>
                  <span className={styles.nickname}>{nickname}</span>
                  <ChevronRight className={styles.nicknameArrow} color="#000000" size={20} />
                </div>
                <div
                  className={styles.likeTag}
                  onClick={() => {
                    navigate('/favorite');
                    onClose();
                  }}>
                  ♡ 찜 목록
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {menuItems.map((item, index) => (
            <div key={index} className={styles.menuItem} onClick={() => handleMenuClick(item.path)}>
              <span className={styles.menuLabel}>{item.label}</span>
              <span className={styles.menuIcon}>
                <ChevronRight size={20} />
              </span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;
