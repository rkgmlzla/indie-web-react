// src/components/notification/NotificationCard.jsx
import React from 'react';
import styles from './NotificationCard.module.css';
import iconX from '../../assets/icons/icon_x_hyunjin.svg';

function escapeRegExp(s = '') {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function NotificationCard({
  content, // 본문 텍스트
  highlight, // 강조할 키워드 (선택)
  isRead = false, // 읽음 여부 (선택)
  onRemove, // X 버튼 핸들러
  onClick, // 카드 클릭 (페이지 이동)
}) {
  const renderHighlighted = (text = '', keyword = '') => {
    if (!keyword) return text;
    const escaped = escapeRegExp(keyword);
    const re = new RegExp(`(${escaped})`, 'gi');
    const parts = String(text).split(re);
    if (parts.length === 1) return text; // 키워드가 없으면 원문 그대로
    return parts.map((part, i) =>
      re.test(part) ? (
        <span key={i} className={styles.highlight}>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${isRead ? styles.read : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}>
      <div className={styles.text}>
        <p className={styles.content}>
          {renderHighlighted(content, highlight)}
        </p>
      </div>

      <button
        className={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭과 분리
          onRemove?.();
        }}
        aria-label="알림 삭제"
        type="button">
        <img src={iconX} alt="닫기" />
      </button>
    </div>
  );
}
