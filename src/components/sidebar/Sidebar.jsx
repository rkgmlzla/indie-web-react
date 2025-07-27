import React from 'react';
import styles from './Sidebar.module.css';
import { ChevronLeft, Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userSampleData } from '../../data/userSampleData';

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const currentUser = userSampleData.find((u) => u.id === 1);

  const menuItems = [
    { label: '공연', path: '/performance' },
    { label: '공연장', path: '/venue' },
    { label: '아티스트', path: '/artist' },
    { label: '자유게시판', path: '/bulletinboard' },
    { label: '가까운 공연 찾기', path: '/performance' },
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

            {/* 프로필 */}
            <div className={styles.profileSection}>
              <img
                src={currentUser?.profile}
                alt="프로필 이미지"
                className={styles.profileImage}
              />
              <div className={styles.nicknameArea}>
                <div
                  className={styles.nicknameRow}
                  onClick={() => {
                    navigate('/mypage');
                    onClose();
                  }}>
                  <span className={styles.nickname}>
                    {currentUser?.nickname}
                  </span>
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
