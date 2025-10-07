// ✅ src/components/performance/TicketOpenList.jsx
import React from 'react';
import styled from 'styled-components';
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

  if (performances.length === 0) {
    return <EmptyMessage>티켓 오픈 예정 공연이 없습니다.</EmptyMessage>;
  }

  return (
    <div className={styles.listContainer}>
      {performances.map((item) => (
        <TicketOpenCard
          key={item.id}
          title={item.title}
          posterUrl={item.thumbnail}                         // ✅ 백엔드 thumbnail 매핑
          place={item.venue}
          ticketOpenDate={item.ticket_open_date}             // ✅ 'YYYY-MM-DD'
          ticketOpenTime={item.time ?? item.ticket_open_time ?? null} // ✅ 서버가 준 시간만 사용
          onClick={() => navigate(`/performance/${item.id}`)}
        />
      ))}
    </div>
  );
};

export default TicketOpenList;

const EmptyMessage = styled.div`
  padding: 0 16px;
  margin-bottom: 56px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;