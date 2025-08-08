// src/components/performance/TicketOpenList.jsx
import React from 'react';
import styles from './TicketOpenList.module.css';
import TicketOpenCard from './TicketOpenCard';
import { useNavigate } from 'react-router-dom';

const TicketOpenList = ({ performances = [] }) => {
  const navigate = useNavigate();

  console.log('🎟 티켓 오픈 예정 공연들:', performances);

  performances.forEach((item) => {
    console.log('🎫 티켓 오픈 날짜 확인:', item.title, {
      ticket_open_date: item.ticket_open_date,
      전체키: Object.keys(item),
      전체값: item,
    });
  });

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
            ticketOpenDate={item.ticket_open_date} // ✅ 필드명 정확하게 매칭
            onClick={() => navigate(`/performance/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketOpenList;
