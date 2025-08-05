// ✅ src/components/performance/NewConcertList.jsx
import React from 'react';
import styles from './NewConcertList.module.css';
import ConcertCard from './ConcertCard';
import iconGo from '../../assets/icons/icon_go_hyunjin.svg';
import { useNavigate } from 'react-router-dom';

const NewConcertList = ({ performances = [] }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.titleRow}>
        <h2 className={styles.sectionTitle}>NEW 업로드 공연</h2>
      </div>
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

export default NewConcertList;
