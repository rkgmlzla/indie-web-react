// ✅ src/components/performance/popular/PopularConcertList.jsx
// - "인기 많은 공연" 섹션 컴포넌트
// - 기존 NewConcertList 스타일 톤 유지
// - ConcertCard 재사용 (제목/날짜만 노출되더라도 props는 동일하게 전달)
// - 섹션 제목 ↔ 리스트 간격 16px

import React from 'react';
import styles from './PopularConcertList.module.css';
import ConcertCard from '../ConcertCard';
import { useNavigate } from 'react-router-dom';

const PopularConcertList = ({ performances = [] }) => {
  const navigate = useNavigate();

  // 서버 응답 키가 다를 수 있어 안전 매핑(홈 normalizePerf와 일치)
  const pickPoster = (p) =>
    p.posterUrl || p.image_url || p.thumbnail || p.poster_url || p.poster || null;

  const pickPlace = (p) =>
    p.venue || p.venue_name || p.place || (p.venue?.name ?? '');

  const pickDate = (p) =>
    p.date || p.performance_date || p.start_date || p.show_date || '';

  return (
    <div className={styles.sectionContainer}>
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

export default PopularConcertList;
