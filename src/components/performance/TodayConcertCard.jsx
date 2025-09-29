import React from 'react';
import styles from './TodayConcertCard.module.css';
import iconGo from '../../assets/icons/icon_go_hyunjin.svg'; // ✅ 여기 수정 그대로 유지

const TodayConcertCard = ({
  title,
  posterUrl,
  place,
  date,
  onGoClick,
  onClick,
}) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <img className={styles.poster} src={posterUrl} alt={title} />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.place}>{place}</p>
        <p className={styles.date}>{date}</p>
      </div>

      {/* ✅ go 아이콘 클릭 시 상세 이동 막고 슬라이드 넘기기 */}
      <img
        className={styles.goIcon}
        src={iconGo}
        alt="다음 공연 보기"
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();        // 카드 onClick(상세 이동) 차단
          onGoClick?.();              // 캐러셀 다음 슬라이드
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            onGoClick?.();
          }
        }}
      />
    </div>
  );
};

export default TodayConcertCard;
