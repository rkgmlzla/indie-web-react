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
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.thumbnail}>
        <img src={concert.posterUrl || concert.thumbnail} alt={concert.title} className={styles.poster} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{concert.title}</h3>
        <p className={styles.location}>{concert.venue || concert.place}</p>
      </div>
    </div>
  );
}

export default PerformanceCard;
