// src/components/performance/ConcertCard.jsx
//맞춤추천공연과 뉴업로드공연 에 쓰는 작은 카드

import React from "react";
import styles from "./ConcertCard.module.css";

const ConcertCard = ({ title, posterUrl, place, date }) => {
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.poster}
        src={posterUrl}
        alt={title}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.place}>{place}</p>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default ConcertCard;
