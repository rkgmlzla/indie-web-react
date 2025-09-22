// ✅ src/components/performance/mood/MoodSection.jsx
// - 김삼문 pick! 아래에 배치할 "MOOD별 공연" 섹션
// - 더미 데이터 제거, moodApi.js와 연동 완료
// - 기존 ConcertCard 재사용 (id, title, posterUrl, place, date)

import React, { useMemo, useState, useEffect } from 'react';
import styles from './MoodSection.module.css';
import ConcertCard from '../ConcertCard';
import { theme } from '../../../styles/theme';
import { fetchMoods, fetchPerformancesByMood } from '../../../api/moodApi';

export default function MoodSection() {
  const [moods, setMoods] = useState([]);               // ✅ DB에서 가져온 무드 목록
  const [activeMood, setActiveMood] = useState(null);   // ✅ 선택된 무드
  const [performances, setPerformances] = useState([]); // ✅ 선택된 무드별 공연

  // 테마 안전 폴백
  const ORANGE = theme?.colors?.maybethemeOrange ?? '#F68B4D';
  const WHITE  = theme?.colors?.bgWhite ?? '#FFFFFF';

  // ✅ 최초 로드 시 무드 목록 조회
  useEffect(() => {
    const loadMoods = async () => {
      try {
        const moodList = await fetchMoods();
        setMoods(moodList);
        if (moodList.length > 0) {
          setActiveMood(moodList[0]); // 첫 무드를 기본 선택
        }
      } catch (error) {
        console.error('❌ 무드 목록 불러오기 실패:', error);
      }
    };
    loadMoods();
  }, []);

  // ✅ 무드 선택 시 해당 무드의 공연 추천 조회
  useEffect(() => {
    if (!activeMood) return;
    const loadPerformances = async () => {
      try {
        const list = await fetchPerformancesByMood(activeMood.id);
        setPerformances(list);
      } catch (error) {
        console.error('❌ 무드별 공연 불러오기 실패:', error);
      }
    };
    loadPerformances();
  }, [activeMood]);

  // 🔑 useMemo로 성능 최적화 (필요 시)
  const items = useMemo(() => performances ?? [], [performances]);

  return (
    <section className={styles.section} style={{ margin: '16px 0' }}>
      {/* 타이틀 */}
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>분위기별 공연</h2>
      </div>

      {/* 무드 버튼 */}
      <div className={styles.pillRow}>
        {moods.map((m) => {
          const active = m.id === activeMood?.id;
          return (
            <button
              key={m.id}
              type="button"
              className={styles.pill}
              onClick={() => setActiveMood(m)}
              style={
                active
                  ? { background: ORANGE, color: WHITE, borderColor: ORANGE }
                  : { background: WHITE, color: ORANGE, borderColor: ORANGE }
              }
              aria-pressed={active}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {/* 카드 리스트 (가로 스크롤) */}
      <div className={styles.listContainer}>
        {items.map((item) => (
          <ConcertCard
            key={item.id}
            id={item.id}
            title={item.title}
            posterUrl={
              item.posterUrl ||
              item.image_url ||
              item.thumbnail ||
              item.poster_url ||
              null
            }
            place={item.venue?.name || item.place || ''}
            date={item.date || item.performance_date || ''}
          />
        ))}
      </div>
    </section>
  );
}
