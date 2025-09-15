// ✅ src/components/home_navibar/HomeNaviBar.jsx
// - 홈의 간이 이동 메뉴 (공연/공연장/아티스트/매거진)
// - 매거진은 "표시만", 클릭 비활성
// - 공연장/아티스트는 routes prop으로 경로 주입. 없으면 자동 비활성.
// - 섹션 간 외부 여백(32px)은 Home에서 section으로 감쌈.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeNaviBar.module.css';

// 아이콘 (네가 올린 SVG를 그대로 사용: 색/윤곽 유지)
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
    { key: 'magazine',    label: '매거진',  icon: iconMessage, to: routes.magazine,   disabled: true }, // 강제 비활성
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
              {/* 원본 SVG 노출 (mask X, 색 변형 X) */}
              <img src={item.icon} alt="" className={styles.iconImg} />
            </div>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
