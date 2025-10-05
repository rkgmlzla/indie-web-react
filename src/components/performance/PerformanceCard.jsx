// ✅ src/components/performance/PerformanceCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerformanceCard.module.css';

function PerformanceCard({ concert }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/performance/${concert.id}`);
  };

  return (
    <div className={styles.cardWrapper} onClick={handleClick}>
      <img 
        src={concert.posterUrl || concert.thumbnail} 
        alt={concert.title} 
        className={styles.poster} 
      />
      <div className={styles.title}>{concert.title}</div>
      <div className={styles.venue}>{concert.venue || concert.place}</div>
    </div>
  );
}

export default PerformanceCard;