import React from 'react';
import styles from './TodayConcertCard.module.css';
import iconGo from '../../assets/icons/icon_go_hyunjin.svg'; // ✅ 여기 수정

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
      <img
        className={styles.goIcon}
        src={iconGo}
        alt="go"
        onClick={onGoClick}
      />
    </div>
  );
};

export default TodayConcertCard;
