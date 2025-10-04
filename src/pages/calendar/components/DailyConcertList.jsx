// ✅ src/pages/calendar/components/DailyConcertList.jsx

import React from 'react';
import PerformanceCard from '../../../components/performance/PerformanceCard';
import styles from './DailyConcertList.module.css';

function DailyConcertList({ concerts }) {
  // 3개 단위로 끊기
  const rows = [];
  for (let i = 0; i < concerts.length; i += 3) {
    const slice = concerts.slice(i, i + 3);
    while (slice.length < 3) slice.push(null);
    rows.push(slice);
  }

  if (concerts.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.emptyMessage}>해당 날짜에는 공연이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {rows.map((rowItems, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {rowItems.map((concert, colIndex) => (
            <div key={colIndex} className={styles.cardContainer}>
              {concert && <PerformanceCard concert={concert} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DailyConcertList;