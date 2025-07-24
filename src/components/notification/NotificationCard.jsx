// src/components/notification/NotificationCard.jsx

import React from 'react';
import styles from './NotificationCard.module.css';
import iconX from '../../assets/icons/icon_x_hyunjin.svg';

function NotificationCard({ content, highlight, onRemove }) {
  const highlightText = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <p className={styles.content}>{highlightText(content, highlight)}</p>
      </div>
      <button className={styles.closeButton} onClick={onRemove}>
        <img src={iconX} alt="닫기" />
      </button>
    </div>
  );
}

export default NotificationCard;
