// src/components/performance/TicketOpenCard.jsx
import React from 'react';
import styles from './TicketOpenCard.module.css';

// ✅ 'YYYY-MM-DD' → 'YYYY.M.D' 로만 변환 (Date 객체 사용 금지: 09:00 착시 방지)
const formatYmd = (ymd) => {
  if (!ymd || typeof ymd !== 'string') return null;
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return ymd; // 형식이 다르면 원본 그대로
  const year = m[1];
  const month = String(parseInt(m[2], 10)); // 앞 0 제거
  const day = String(parseInt(m[3], 10));
  return `${year}.${month}.${day}`;
};

const TicketOpenCard = ({
  title,
  posterUrl,
  place,
  ticketOpenDate,  // 'YYYY-MM-DD'
  ticketOpenTime,  // 'HH:MM' | null
  onClick,
}) => {
  const dateText = formatYmd(ticketOpenDate);
  const timeText = ticketOpenTime ?? null; // 서버가 준 시간만 표기 (없으면 미정)

  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <img className={styles.poster} src={posterUrl} alt={title} />
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.place}>{place}</p>
        <p className={styles.ticketDate}>
          {/* 예: "예매 오픈 - 2025.8.16 15:00" / 시간이 없으면 "예매 오픈 - 2025.8.16" */}
          예매 오픈{dateText ? ` - ${dateText}${timeText ? ` ${timeText}` : ''}` : ' -'}
        </p>
      </div>
    </div>
  );
};

export default TicketOpenCard;
