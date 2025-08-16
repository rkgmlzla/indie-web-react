// ✅ src/pages/HomePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import TodayConcertCarousel from '../../components/performance/TodayConcertCarousel';
import NewConcertList from '../../components/performance/NewConcertList';
import TicketOpenList from '../../components/performance/TicketOpenList';
import RecommendedConcertList from '../../components/performance/RecommendedConcertList';
import styles from './home.module.css';
import iconCalendar from '../../assets/icons/icon_calendar_hyunjin.svg';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

import {
  fetchTodayPerformances,
  fetchRecentPerformances,
  fetchTicketOpeningPerformances,
  fetchRecommendedPerformances
} from '../../api/performanceApi';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const carouselRef = useRef();

  const [todayPerformances, setTodayPerformances] = useState([]);
  const [recentPerformances, setRecentPerformances] = useState([]);
  const [ticketOpenPerformances, setTicketOpenPerformances] = useState([]);
  const [recommendedPerformances, setRecommendedPerformances] = useState([]);

  const fetchedRef = useRef(false);

  const todayStr = new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date());

  const handleGoNext = () => {
    if (carouselRef.current) carouselRef.current.slickNext();
  };

  const getDateRange = () => {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return { today, sevenDaysLater };
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const loadHomeData = async () => {
      try {
        const { today, sevenDaysLater } = getDateRange();

        const todayData = await fetchTodayPerformances();
        const recentData = await fetchRecentPerformances(6);
        const ticketOpeningData = await fetchTicketOpeningPerformances(today, sevenDaysLater);

        // ✅ 하드코딩 제거: 동적 accessToken 사용 (없으면 추천 섹션만 스킵)
const accessToken = localStorage.getItem('accessToken');
    let recommendedData = [];
    try {
      // DEV: 토큰이 없어도 호출 → 백엔드가 dev fallback이면 user=1 기준 추천 반환
      // (fetchRecommendedPerformances는 token이 있으면 Authorization 헤더를 붙이고,
      // 없으면 헤더 없이 호출하도록 구현되어 있어야 합니다)
      recommendedData = await fetchRecommendedPerformances(accessToken || undefined);
    } catch (err) {
      console.warn('[HomePage] 추천 공연 로딩 실패(무시 가능):', err);
   }


        ticketOpeningData.forEach(item => {
          console.log('🎫 티켓 오픈 날짜 확인:', item.title, item.ticketOpenDate);
        });

        setTodayPerformances(todayData || []);
        setRecentPerformances(recentData || []);
        setTicketOpenPerformances(ticketOpeningData || []);
        setRecommendedPerformances(recommendedData || []);
      } catch (err) {
        console.error('📛 홈 API 호출 중 오류 발생:', err);
      }
    };

    loadHomeData();
  }, []);

  return (
    <>
      <Header title="김삼문" onMenuClick={() => setIsSidebarOpen(true)} />
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className={styles.pageContainer}>
        <section className={styles.todaySection}>
          <div className={styles.todayHeader}>
            <h2 className={styles.todayTitle}>{todayStr} 공연</h2>
          </div>
          <TodayConcertCarousel
            ref={carouselRef}
            performances={todayPerformances}
            onGoClick={handleGoNext}
            onClickPerformance={(id) => navigate(`/performance/${id}`)}
          />
        </section>

        <section className={styles.calendarSection}>
          <div className={styles.calendarBox} onClick={() => navigate('/calendar')}>
            <img src={iconCalendar} alt="calendar" className={styles.calendarIcon} />
            <span className={styles.calendarText}>캘린더로 공연 일정 확인하기</span>
          </div>
        </section>

        <section>
          <NewConcertList performances={recentPerformances} />
        </section>

        <section>
          <TicketOpenList performances={ticketOpenPerformances} />
        </section>

        <section>
          <RecommendedConcertList performances={recommendedPerformances} />
        </section>
      </div>
    </>
  );
};

export default HomePage;
