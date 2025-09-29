// ✅ src/components/performance/NewConcertList.jsx
import React from 'react';
import styles from './NewConcertList.module.css';
import ConcertCard from './ConcertCard';
import iconGo from '../../assets/icons/icon_go_hyunjin.svg';
import { useNavigate } from 'react-router-dom';

const NewConcertList = ({ performances = [] }) => {
  const navigate = useNavigate();

  // 서버 응답 키가 상황에 따라 다를 수 있어서 안전 매핑
  const pickPoster = (p) =>
    p.posterUrl || p.image_url || p.thumbnail || p.poster_url || p.poster || null;

  const pickPlace = (p) =>
    p.venue || p.venue_name || p.place || (p.venue?.name ?? '');

  const pickDate = (p) =>
    p.date || p.performance_date || p.start_date || '';

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.titleRow} style={{ textAlign: 'center' }}>
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center', width: '100%' }}>
          NEW 업로드 공연
        </h2>
      </div>
      <div className={styles.listContainer}>
        {performances.map((item) => (
          <ConcertCard
            key={item.id}
            id={item.id}
            title={item.title}
            posterUrl={pickPoster(item)}   
            place={pickPlace(item)}        
            date={pickDate(item)}           
            onClick={() => navigate(`/performance/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewConcertList;
