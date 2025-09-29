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
      {/* ▶ 포스터: 카드 내부 세로 88px을 '꽉' 채움 (아래 흰 여백 제거) */}
      <img
        className={styles.poster}
        src={posterUrl || 'https://placehold.co/300x400?text=No+Image'}
        alt={title}
      />

      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.place}>{place}</p>

        {/* ▶ 주황색 직사각형 배지 + 흰 글씨 */}
        <span
          className={styles.badge}
          style={{ backgroundColor: theme.colors.maybethemeOrange }}
        >
          예매 오픈
        </span>

        {/* ▶ 날짜/시각: 주황색 */}
        <p
          className={styles.ticketDate}
          style={{ color: theme.colors.maybethemeOrange }}
        >
          {dateText ? `${dateText}${timeText ? ` ${timeText}` : ''}` : ''}
        </p>
      </div>
    </div>
  );
};

export default TicketOpenCard;
