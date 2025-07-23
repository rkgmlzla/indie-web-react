// src/components/performance/RecommendedConcertList.jsx
import React from "react";
import styles from "./RecommendedConcertList.module.css";
import ConcertCard from "./ConcertCard";
import { performances } from "../../data/performanceList_home";

const RecommendedConcertList = () => {
  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>맞춤 추천 공연</h2>
      <div className={styles.listContainer}>
        {performances.map((item, index) => (
          <ConcertCard
            key={index}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.place}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedConcertList;
