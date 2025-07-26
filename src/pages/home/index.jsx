import React, { useState, useRef } from 'react';
import TodayConcertCarousel from '../../components/performance/TodayConcertCarousel';
import NewConcertList from '../../components/performance/NewConcertList';
import TicketOpenList from '../../components/performance/TicketOpenList';
import RecommendedConcertList from '../../components/performance/RecommendedConcertList';
import styles from './home.module.css';
import iconCalendar from '../../assets/icons/icon_calendar_hyunjin.svg';
import iconGo from '../../assets/icons/icon_go_hyunjin.svg';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const carouselRef = useRef();

  const todayStr = new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date());

  const handleGoNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  return (
    <>
      <Header title="김삼문" onMenuClick={() => setIsSidebarOpen(true)} />
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className={styles.pageContainer}>
        <section className={styles.todaySection}>
          <div className={styles.todayHeader}>
            <h2 className={styles.todayTitle}>{todayStr} 공연</h2>
          </div>
          <TodayConcertCarousel ref={carouselRef} onGoClick={handleGoNext} onClickPerformance={(id) => navigate(`/performance/${id}`)} />
        </section>

        <section className={styles.calendarSection}>
          <div
            className={styles.calendarBox}
            onClick={() => navigate('/calendar')}>
            <img
              src={iconCalendar}
              alt="calendar"
              className={styles.calendarIcon}
            />
            <span className={styles.calendarText}>
              캘린더로 공연 일정 확인하기
            </span>
            <img src={iconGo} alt="go" className={styles.calendarGoIcon} />
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
    </>
  );
};

export default HomePage;
