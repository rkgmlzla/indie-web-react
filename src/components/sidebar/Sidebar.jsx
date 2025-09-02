import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { ChevronLeft, Bell, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfoOptional } from '../../api/userApi';

function Sidebar({ onClose }) {
  const navigate = useNavigate();

  // undefined: 로딩 / null: 비로그인 / object: 로그인
  const [me, setMe] = useState(undefined);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const user = await fetchUserInfoOptional(); // 로그인 안 했으면 null
        if (!alive) return;

        if (user) {
          setMe({
            nickname: user.nickname ?? '',
            profile_url: user.profile_url ?? '',
          });
          setImageError(!user.profile_url);
        } else {
          setMe(null);        // 비로그인
          setImageError(true);
        }
      } catch {
        if (!alive) return;
        setMe(null);          // 에러도 비로그인 취급
        setImageError(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  const menuItems = [
    { label: '공연', path: '/performance' },
    { label: '공연장', path: '/venue' },
    { label: '아티스트', path: '/artist' },
    { label: '자유게시판', path: '/bulletinboard' },
    { label: '가까운 공연 찾기', path: '/map' },
  ];

  const go = (path) => { navigate(path); onClose?.(); };
  const goLogin = () => { navigate('/login'); onClose?.(); };

  const nickname = me?.nickname ?? '게스트';
  const profile = me?.profile_url;

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
                color="#d55a1f"
                className={styles.iconBack}
                onClick={onClose}
              />
              <Bell
                size={22}
                color="#000000"
                className={styles.iconNotification}
                onClick={() => go('/notification')}
              />
            </div>

            <div className={styles.profileSection}>
              {profile && !imageError ? (
                <img
                  src={`${profile}?t=${Date.now()}`}
                  alt="프로필 이미지"
                  className={styles.profileImage}
                  onError={(e) => {
                    if (e.target.src.includes('/static/profiles/')) {
                      setImageError(true);
                    }
                  }}
                />
              ) : (
                <User size={64} className={styles.profileFallbackIcon} />
              )}

              <div className={styles.nicknameArea}>
                <div
                  className={styles.nicknameRow}
                  onClick={() => go('/mypage')}
                >
                  <span className={styles.nickname}>{nickname}</span>
                  <ChevronRight className={styles.nicknameArrow} color="#000" size={20} />
                </div>
                <div className={styles.likeTag} onClick={() => go('/favorite')}>
                  ♡ 찜 목록
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {menuItems.map((item) => (
            <div
              key={item.path}
              className={styles.menuItem}
              onClick={() => go(item.path)}
            >
              <span className={styles.menuLabel}>{item.label}</span>
              <span className={styles.menuIcon}>
                <ChevronRight size={20} />
              </span>
            </div>
          ))}

          {/* ⬇️ 비로그인 전용 하단 로그인 버튼 */}
          {me === null && (
            <div className={styles.loginFooter}>
              <button className={styles.loginButtonGray} onClick={goLogin}>
                로그인하기
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;
