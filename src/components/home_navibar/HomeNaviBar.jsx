// ✅ src/components/home_navibar/HomeNaviBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeNaviBar.module.css';

import iconMusic from '../../assets/icons/home_menu/music.svg';          // 공연
import iconMic from '../../assets/icons/home_menu/mic.svg';              // 공연장
import iconGuitar from '../../assets/icons/home_menu/guitar_line.svg';   // 아티스트
import iconMessage from '../../assets/icons/home_menu/message line.svg'; // 매거진 (파일명에 공백 있으면 이대로)

export default function HomeNaviBar({
  routes = {
    performance: '/performance',
    venues: null,    // 예: '/venues' (없으면 null → 비활성)
    artists: null,   // 예: '/artists'
    magazine: null,  // 매거진은 페이지 없으니 기본 null
  },
}) {
  const navigate = useNavigate();

  const items = [
    { key: 'performance', label: '공연',    icon: iconMusic,   to: routes.performance, disabled: !routes.performance },
    { key: 'venues',      label: '공연장',  icon: iconMic,     to: routes.venues,     disabled: !routes.venues },
    { key: 'artists',     label: '아티스트', icon: iconGuitar,  to: routes.artists,    disabled: !routes.artists },
    { key: 'review',      label: '리뷰',  icon: iconMessage, to: routes.review,   disabled: !routes.review }, // 강제 비활성
  ];

  const handleClick = (item) => {
    if (item.disabled || !item.to) return;
    navigate(item.to);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.item} ${item.disabled ? styles.disabled : ''}`}
            onClick={() => handleClick(item)}
            aria-label={item.label}
            aria-disabled={item.disabled}
          >
            <div className={styles.tile}>
              <img src={item.icon} alt="" className={styles.iconImg} />
            </div>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
