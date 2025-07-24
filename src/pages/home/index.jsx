// src/pages/home/index.jsx
import React from "react";
import TodayConcertCarousel from "../../components/performance/TodayConcertCarousel";
import NewConcertList from "../../components/performance/NewConcertList";
import TicketOpenList from "../../components/performance/TicketOpenList";
import RecommendedConcertList from "../../components/performance/RecommendedConcertList";
import styles from "./home.module.css";
import iconCalendar from "../../assets/icons/icon_calendar_hyunjin.svg"; // ✅ 아이콘 import
import iconGo from "../../assets/icons/icon_go_hyunjin.svg";             // ✅ 아이콘 import

const HomePage = () => {
  const todayStr = new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
  }).format(new Date());

  const carouselRef = React.useRef();

  const handleGoNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.todaySection}>
        <div className={styles.todayHeader}>
          <h2 className={styles.todayTitle}>{todayStr} 공연</h2>
        </div>
        <TodayConcertCarousel ref={carouselRef} onGoClick={handleGoNext} />
      </section>

      <section className={styles.calendarSection}>
        <div className={styles.calendarBox}>
          <img
            src={iconCalendar} // ✅ 경로 수정
            alt="calendar"
            className={styles.calendarIcon}
          />
          <span className={styles.calendarText}>
            캘린더로 공연 일정 확인하기
          </span>
          <img
            src={iconGo} // ✅ 경로 수정
            alt="go"
            className={styles.calendarGoIcon}
          />
        </div>
      </section>

      <section>
        <NewConcertList />
      </section>

      <section>
        <TicketOpenList />
      </section>

      <section>
        <RecommendedConcertList />
      </section>
    </div>
  );
};

export default HomePage;
