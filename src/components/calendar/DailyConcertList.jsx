// ✅ src/pages/calendar/components/DailyConcertList.jsx

import React from 'react';
import PerformanceCard from '../performance/PerformanceCard';
import styles from './DailyConcertList.module.css';

function DailyConcertList({ concerts }) {
  return (
    <div className={styles.grid}>
      {concerts.length > 0 ? (
        concerts.map((concert) => (
          <PerformanceCard key={concert.id} concert={concert} />
        ))
      ) : (
        <p>해당 날짜에는 공연이 없습니다.</p>
      )}
    </div>
  );
}

export default DailyConcertList;