import React from 'react';
import styles from './TicketOpenCard.module.css';
import { theme } from '../../styles/theme';

// 'YYYY-MM-DD' → 'YYYY.M.D'
const formatYmd = (ymd) => {
  if (!ymd || typeof ymd !== 'string') return null;
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return ymd;
  const y = m[1];
  const mo = String(parseInt(m[2], 10));
  const d = String(parseInt(m[3], 10));
  return `${y}.${mo}.${d}`;
};

const TicketOpenCard = ({
  title,
  posterUrl,
  place,
  ticketOpenDate,   // 'YYYY-MM-DD'
  ticketOpenTime,   // 'HH:MM' | null
  onClick,
}) => {
  const dateText = formatYmd(ticketOpenDate);
  const timeText = ticketOpenTime ?? null;

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <img
        className={styles.poster}
        src={posterUrl || 'https://placehold.co/300x400?text=No+Image'}
        alt={title}
      />

      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.place}>{place}</p>
        <span
          className={styles.badge}
        >
          예매 오픈
        </span>
        <p
          className={styles.ticketDate}
        >
          {dateText ? `${dateText}${timeText ? ` ${timeText}` : ''}` : ''}
        </p>
      </div>
    </div>
  );
};

export default TicketOpenCard;
