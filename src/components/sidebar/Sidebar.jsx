// src/components/layout/Sidebar.jsx
import React, { useEffect, useState, useRef } from 'react';
import styles from './Sidebar.module.css';
import { ChevronLeft, Bell, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../api/userApi';

function Sidebar({ onClose }) {
  const navigate = useNavigate();

  // ✅ 마이페이지와 동일한 상태
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [imageError, setImageError] = useState(false);
  const accessToken = useRef(localStorage.getItem('accessToken')); // ✅ MyPage와 완전 동일

  // ✅ /user/me 로딩 (MyPage 로직 그대로 이식)
  useEffect(() => {
    fetchUserInfo(accessToken) // ✅ MyPage처럼 ref 자체를 그대로 넘김
      .then((user) => {
        const profileUrl = user.profile_url;
        setProfileImage(profileUrl ? `${profileUrl}?t=${Date.now()}` : '');
        setNickname(user.nickname || '');
        setImageError(!profileUrl);
      })
      .catch((err) => {
        console.error('[Sidebar] 유저 정보 불러오기 실패:', err);
      });
  }, [accessToken]); // ✅ MyPage와 동일한 deps

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
    <div className={styles.page}>
      <div className={styles.sidebarOverlay}>
        <div className={styles.sidebar}>
          {/* 상단 뒤로가기 + 알림 */}
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

            {/* ✅ 프로필 (MyPage와 동일 폴백 로직) */}
            <div className={styles.profileSection}>
              {profileImage && !imageError ? (
                <img
                  src={profileImage}
                  alt="프로필 이미지"
                  className={styles.profileImage}
                  onError={(e) => {
                    // MyPage와 동일: 서버 경로 에러 시 에러 플래그 세팅
                    if (e.target.src.includes('/static/profiles/')) {
                      setImageError(true);
                    }
                  }}
                />
              ) : (
                // ✅ MyPage와 동일하게 아이콘 표시
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
                  <ChevronRight
                    className={styles.nicknameArrow}
                    color="#000000"
                    size={20}
                  />
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

          {/* 메뉴 리스트 */}
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => handleMenuClick(item.path)}>
              <span className={styles.menuLabel}>{item.label}</span>
              <span className={styles.menuIcon}>
                <ChevronRight size={20} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
