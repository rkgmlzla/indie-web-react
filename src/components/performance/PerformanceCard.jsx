// ✅ src/components/performance/PerformanceCard.jsx
import React from 'react';
import styles from './PerformanceCard.module.css';

function PerformanceCard({ concert }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <img src={concert.posterUrl} alt={concert.title} className={styles.poster} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{concert.title}</h3>
        <p className={styles.date}>{concert.date}</p>
        <p className={styles.location}>{concert.place}</p>
      </div>
    </div>
  );
}

export default PerformanceCard;
