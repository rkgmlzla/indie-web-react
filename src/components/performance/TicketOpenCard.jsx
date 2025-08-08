// src/components/performance/TicketOpenCard.jsx
import React from 'react';
import styles from './TicketOpenCard.module.css';

const formatDate = (datetime) => {
  if (!datetime) return null;
  const date = new Date(datetime);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

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
        <p className={styles.ticketDate}>
          예매 오픈{ticketOpenDate ? ` - ${formatDate(ticketOpenDate)}` : ' -'}
        </p>
      </div>
    </div>
  );
};

export default TicketOpenCard;
