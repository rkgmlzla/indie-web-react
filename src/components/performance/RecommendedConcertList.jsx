// ✅ src/components/performance/RecommendedConcertList.jsx
import React from 'react';
import styles from './RecommendedConcertList.module.css';
import ConcertCard from './ConcertCard';
import { useNavigate } from 'react-router-dom';

const RecommendedConcertList = ({ performances = [] }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>맞춤 추천 공연</h2>
      <div className={styles.listContainer}>
        {performances.map((item) => (
          <ConcertCard
            key={item.id}
            id={item.id}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.venue}
            date={item.date}
            onClick={() => navigate(`/performance/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedConcertList;
