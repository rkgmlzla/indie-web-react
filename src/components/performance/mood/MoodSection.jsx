// ✅ src/components/performance/mood/MoodSection.jsx
// - 김삼문 pick! 아래에 배치할 "MOOD별 공연" 섹션
// - 더미 데이터 기반 UI (API 연동 전용)
// - 기존 ConcertCard 그대로 재사용 (id, title, posterUrl, place, date)

import React, { useMemo, useState } from 'react';
import styles from './MoodSection.module.css';
import ConcertCard from '../ConcertCard';
import { theme } from '../../../styles/theme';

const MOODS = ['신나는', '차분한', '따뜻한', '짜릿한'];

// 🖼️ 안정적인 더미 포스터 URL (seed 고정으로 캐시/안정성 ↑)
const poster = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/90/120`;

// 🔸 더미 데이터 (배포 전까지 UI 확인용)
//    운영 시 API 응답으로 교체 예정.
const DUMMY_BY_MOOD = {
  신나는: [
    { id: 'ex-1',  title: '파워락 나이트',        posterUrl: poster('ex-1'),    place: 'Rolling Hall',  date: '2025-10-03' },
    { id: 'ex-2',  title: '인디 스테이지 Vol.7', posterUrl: poster('ex-2'),    place: 'CLUB FF',       date: '2025-10-12' },
    { id: 'ex-3',  title: 'Weekend Jump!',       posterUrl: poster('ex-3'),    place: '브이홀',        date: '2025-10-19' },
  ],
  차분한: [
    { id: 'calm-1', title: '어쿠스틱 소품집',     posterUrl: poster('calm-1'),  place: '벙커스',        date: '2025-10-05' },
    { id: 'calm-2', title: '노을빛 라이브',       posterUrl: poster('calm-2'),  place: '프리즘홀',      date: '2025-10-09' },
  ],
  따뜻한: [
    { id: 'warm-1', title: 'Autumn Letter',      posterUrl: poster('warm-1'),  place: 'KT&G 상상마당', date: '2025-10-07' },
    { id: 'warm-2', title: '담백한 밤',           posterUrl: poster('warm-2'),  place: '웨스트브릿지',  date: '2025-10-18' },
  ],
  짜릿한: [
    { id: 'thrill-1', title: 'Electro Showcase', posterUrl: poster('thrill-1'), place: '무브홀',       date: '2025-10-11' },
    { id: 'thrill-2', title: 'Bass Drop',        posterUrl: poster('thrill-2'), place: '페이머스',     date: '2025-10-22' },
    { id: 'thrill-3', title: 'Night Pulse',      posterUrl: poster('thrill-3'), place: '롤링홀',       date: '2025-10-29' },
  ],
};

export default function MoodSection() {
  const [activeMood, setActiveMood] = useState(MOODS[0]);
  const items = useMemo(() => DUMMY_BY_MOOD[activeMood] ?? [], [activeMood]);

  // 테마 안전 폴백
  const ORANGE = theme?.colors?.maybethemeOrange ?? '#F68B4D';
  const WHITE  = theme?.colors?.bgWhite ?? '#FFFFFF';

  return (
    <section className={styles.section} style={{ margin: '16px 0' }}>
      {/* 타이틀 */}
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>분위기별 공연</h2>
      </div>

      {/* 무드 버튼 */}
      <div className={styles.pillRow}>
        {MOODS.map((m) => {
          const active = m === activeMood;
          return (
            <button
              key={m}
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
              {m}
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
            posterUrl={item.posterUrl}
            place={item.place}
            date={item.date}
          />
        ))}
      </div>
    </section>
  );
}
