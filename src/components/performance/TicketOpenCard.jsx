// src/components/performance/TicketOpenCard.jsx
//티켓 오픈 예정 공연에 필요한 카드 + 리스트 코드 한 번에 다 줄게.
import React from 'react';
import styles from './TicketOpenCard.module.css';

const TicketOpenCard = ({
  title,
  posterUrl,
  place,
  ticketOpenDate,
  onClick,
}) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <img className={styles.poster} src={posterUrl} alt={title} />
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.place}>{place}</p>
        <p className={styles.ticketDate}>예매 오픈 {ticketOpenDate || '-'}</p>
      </div>
    </div>
  );
};

export default TicketOpenCard;
