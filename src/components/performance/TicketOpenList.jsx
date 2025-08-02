// ✅ src/components/performance/TicketOpenList.jsx
import React from 'react';
import styles from './TicketOpenList.module.css';
import TicketOpenCard from './TicketOpenCard';
import { useNavigate } from 'react-router-dom';

const TicketOpenList = ({ performances = [] }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>티켓 오픈 예정</h2>
      <div className={styles.listContainer}>
        {performances.map((item) => (
          <TicketOpenCard
            key={item.id}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.venue}
            ticketOpenDate={item.ticketOpenDate}
            onClick={() => navigate(`/performance/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketOpenList;
