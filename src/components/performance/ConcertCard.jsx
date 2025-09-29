// src/components/performance/ConcertCard.jsx
//맞춤추천공연x과 뉴업로드공연 에 쓰는 작은 카드
//mood공연도
import React from 'react';
import styles from './ConcertCard.module.css';
import { useNavigate } from 'react-router-dom';

const ConcertCard = ({ id, title, posterUrl, place, date }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/performance/${id}`);
  };
  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <img className={styles.poster} src={posterUrl} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default ConcertCard;
