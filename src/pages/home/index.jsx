// ✅ src/pages/HomePage.jsx
import React, { useState, useRef, useEffect } from 'react';
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

// ✅ 홈 API import
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

  // ✅ API 데이터 상태
  const [todayPerformances, setTodayPerformances] = useState([]);
  const [recentPerformances, setRecentPerformances] = useState([]);
  const [ticketOpenPerformances, setTicketOpenPerformances] = useState([]);
  const [recommendedPerformances, setRecommendedPerformances] = useState([]);

  const todayStr = new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date());

  const handleGoNext = () => {
    if (carouselRef.current) carouselRef.current.slickNext();
  };

  // ✅ 날짜 범위를 오늘 ~ 7일 후로 자동 설정
  const getDateRange = () => {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return { today, sevenDaysLater };
  };

  // ✅ API 호출
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const { today, sevenDaysLater } = getDateRange();

        const todayData = await fetchTodayPerformances();
        const recentData = await fetchRecentPerformances(6);
        const ticketOpeningData = await fetchTicketOpeningPerformances(today, sevenDaysLater); // ✅ 수정됨
        const token = 'your_test_token_here';
        const recommendedData = await fetchRecommendedPerformances(token);

        // ✅ 상태 업데이트
        setTodayPerformances(todayData || []);
        setRecentPerformances(recentData || []);
        setTicketOpenPerformances(ticketOpeningData || []);
        setRecommendedPerformances(recommendedData || []);

        console.log('🎯 티켓 오픈 API 요청 날짜:', today, '→', sevenDaysLater);
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
        {/* ✅ 오늘 예정 공연 */}
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

        {/* ✅ 캘린더 이동 */}
        <section className={styles.calendarSection}>
          <div className={styles.calendarBox} onClick={() => navigate('/calendar')}>
            <img src={iconCalendar} alt="calendar" className={styles.calendarIcon} />
            <span className={styles.calendarText}>캘린더로 공연 일정 확인하기</span>
            <img src={iconGo} alt="go" className={styles.calendarGoIcon} />
          </div>
        </section>

        {/* ✅ NEW 업로드 공연 */}
        <section>
          <NewConcertList performances={recentPerformances} />
        </section>

        {/* ✅ 티켓 오픈 예정 */}
        <section>
          <TicketOpenList performances={ticketOpenPerformances} />
        </section>

        {/* ✅ 맞춤 추천 공연 */}
        <section>
          <RecommendedConcertList performances={recommendedPerformances} />
        </section>
      </div>
    </>
  );
};

export default HomePage;
