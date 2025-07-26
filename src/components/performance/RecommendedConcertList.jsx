// src/components/performance/RecommendedConcertList.jsx
import React from 'react';
import styles from './RecommendedConcertList.module.css';
import ConcertCard from './ConcertCard';
import { performanceSampleData } from '../../data/performanceSampleData';
import { useNavigate } from 'react-router-dom';

const RecommendedConcertList = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/performance/${id}`);
  };
  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>맞춤 추천 공연</h2>
      <div className={styles.listContainer}>
        {performanceSampleData.map((item, index) => (
          <ConcertCard
            key={item.id}
            id={item.id}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.venue}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedConcertList;
