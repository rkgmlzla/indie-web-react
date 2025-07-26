// src/components/performance/TicketOpenList.jsx
import React from 'react';
import styles from './TicketOpenList.module.css';
import TicketOpenCard from './TicketOpenCard';
import { performanceSampleData } from '../../data/performanceSampleData';
import { useNavigate } from 'react-router-dom';

const TicketOpenList = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/performance/${id}`);
  };
  const ticketOpenData = performanceSampleData.filter((p) => p.ticketOpenDate);

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>티켓 오픈 예정</h2>
      <div className={styles.listContainer}>
        {ticketOpenData.map((item, index) => (
          <TicketOpenCard
            key={index}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.place}
            ticketOpenDate={item.ticketOpenDate}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketOpenList;
