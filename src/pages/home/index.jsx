import React, { useState, useRef, useEffect } from 'react';
import TodayConcertCarousel from '../../components/performance/TodayConcertCarousel';
import NewConcertList from '../../components/performance/NewConcertList';
import TicketOpenList from '../../components/performance/TicketOpenList';
// [DISABLED] 맞춤 추천 섹션 사용 중단
// import RecommendedConcertList from '../../components/performance/RecommendedConcertList';
import styles from './home.module.css';
// import iconCalendar from '../../assets/icons/icon_calendar_hyunjin.svg'; // [DISABLED] 캘린더 아이콘 임포트 (렌더 비활성화)
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

// [PICK] pick 카드 컴포넌트 추가 임포트 (기존 코드 보존)
import PickCard from '../../components/performance/Pick/PickCard';

// ✅ [MOOD] 무드별 공연 섹션 추가 (기존 코드 보존)
import MoodSection from '../../components/performance/mood/MoodSection';

// ✅ [POPULAR] 인기 많은 공연 섹션 컴포넌트 추가 (기존 코드 보존)
import PopularConcertList from '../../components/performance/popular/PopularConcertList';

// ✅ [NAV] 홈 간이 이동 메뉴 (새로 추가)
import HomeNaviBar from '../../components/home_navibar/HomeNaviBar';

import axios from 'axios';
import { baseUrl } from '../../api/config';

import {
  fetchTodayPerformances,
  fetchRecentPerformances,
  fetchTicketOpeningPerformances,
  // [DISABLED] 맞춤 추천 API 호출 중단
  // fetchRecommendedPerformances,
  // ✅ [POPULAR] 인기 많은 공연 API 추가 (기존 코드 보존)
  fetchPopularPerformances,
} from '../../api/performanceApi';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const carouselRef = useRef();

  const [todayPerformances, setTodayPerformances] = useState([]);
  const [recentPerformances, setRecentPerformances] = useState([]);
  const [ticketOpenPerformances, setTicketOpenPerformances] = useState([]);
  // [DISABLED] 맞춤 추천 상태 중단
  // const [recommendedPerformances, setRecommendedPerformances] = useState([]);
  // ✅ [POPULAR] 인기 많은 공연 상태
  const [popularPerformances, setPopularPerformances] = useState([]);

  const fetchedRef = useRef(false);

  const todayStr = new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date());

  const handleGoNext = () => {
    if (carouselRef.current) carouselRef.current.slickNext();
  };

  // ---- 날짜 로컬(KST) 기준으로 계산 (UTC 밀림 방지)
  const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
  const formatLocalYMD = (d) => {
    const y = d.getFullYear();
    const m = pad2(d.getMonth() + 1);
    const day = pad2(d.getDate());
    return `${y}-${m}-${day}`;
  };
  const getDateRange = () => {
    const now = new Date();
    const today = formatLocalYMD(now);
    const sevenDaysLater = formatLocalYMD(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)
    );
    return { today, sevenDaysLater };
  };

  // ---- 배열 정규화 유틸 (홈 내부 전용)
  const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      return (
        data.items ||
        data.performances ||
        data.results ||
        data.list ||
        data.data ||
        []
      );
    }
    return [];
  };

  // ✅ 공통 스키마로 표준화 (섹션 컴포넌트가 posterUrl/venue/date만 읽어도 동작)
  const normalizePerf = (p) => ({
    ...p,
    posterUrl:
      p?.posterUrl ||
      p?.image_url ||
      p?.thumbnail ||
      p?.poster_url ||
      p?.poster ||
      null,
    venue: p?.venue || p?.venue_name || p?.place || (p?.venue?.name ?? ''),
    date: p?.date || p?.performance_date || p?.start_date || p?.show_date || '',
  });

  // ---- 폴백 요청: API가 0건 줄 때만 직접 호출해서 items 등도 수용
  const fetchRecentFallback = async (limit) => {
    const res = await axios.get(`${baseUrl}/performance/home/recent`, {
      params: { limit },
    });
    return toArray(res.data);
  };

  const fetchTicketOpeningFallback = async (startDate, endDate) => {
    const res = await axios.get(`${baseUrl}/performance/home/ticket-opening`, {
      // 서버가 snake/camel 어느 쪽을 받든 걸리게 둘 다 보냄
      params: { startDate, endDate, start_date: startDate, end_date: endDate },
    });
    return toArray(res.data);
  };

  // [PICK] 임시 pick 데이터(항상 1개). API 붙이면 이 객체만 교체하면 됨.
  const pickItem = {
    id: 1,
    title: 'Wow, Rich한 자신감으로 돌아온 aespa의 [Rich Man]',
    content:
      '낙엽과 함께 듣기 좋은 톤의 독립 음반 4선을 소개합니다. 따뜻하고 담백한 보컬, 그리고 가벼운 리듬.',
    imageUrl: 'https://image.inews24.com/v1/dd35d151442f69.jpg',
    author: '김삼문관리자',
    createdAt: '2025-09-10T14:36:00+09:00',
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const loadHomeData = async () => {
      try {
        const { today, sevenDaysLater } = getDateRange();

        // 1) 오늘 공연
        const todayData = await fetchTodayPerformances();

        // 2) NEW 업로드 (API 우선, 비면 폴백)
        let recentData = await fetchRecentPerformances(6);
        if (toArray(recentData).length === 0) {
          recentData = await fetchRecentFallback(6);
        }

        // 3) 티켓 오픈 예정 (API 우선, 비면 폴백)
        let ticketOpeningData = await fetchTicketOpeningPerformances(
          today,
          sevenDaysLater
        );
        if (toArray(ticketOpeningData).length === 0) {
          ticketOpeningData = await fetchTicketOpeningFallback(
            today,
            sevenDaysLater
          );
        }

        // ✅ 4) 인기 많은 공연 (6개)
        const popularData = await fetchPopularPerformances(6);

        // 4) [DISABLED] 추천 공연 로딩 중단
        // const accessToken = localStorage.getItem('accessToken');
        // let recommendedData = [];
        // try {
        //   recommendedData = await fetchRecommendedPerformances(accessToken || undefined);
        // } catch (err) {
        //   console.warn('[HomePage] 추천 공연 로딩 실패(무시 가능):', err);
        // }

        // ✅ 여기서만 표준화해서 섹션에 내려줌
        setTodayPerformances(toArray(todayData).map(normalizePerf));
        setRecentPerformances(toArray(recentData).map(normalizePerf));
        // 티켓오픈 섹션은 기존 키(thumbnail, ticket_open_date/time 등)를 쓰므로 그대로 전달
        setTicketOpenPerformances(toArray(ticketOpeningData));
        // ✅ 인기 많은 공연
        setPopularPerformances(toArray(popularData).map(normalizePerf));
        // [DISABLED]
        // setRecommendedPerformances(toArray(recommendedData).map(normalizePerf));
      } catch (err) {
        console.error('📛 홈 API 호출 중 오류 발생:', err);
      }
    };

    loadHomeData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="김삼문" onMenuClick={() => setIsSidebarOpen(true)} />
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className={styles.pageContainer}>
        {/* 섹션 간격: 기본은 위 32 / 아래 32 */}
        <section
          className={styles.todaySection}
          /* ⬇️ 헤더와 더 붙게: 위 8px / 아래 16px (네비바와의 간격 절반) */
          style={{ margin: '8px 0 16px 0', display: 'flow-root' }}
        >
          {/* 섹션 제목과 콘텐츠 간 간격: 16 */}
          <div className={styles.todayHeader} style={{ marginBottom: 16 }}>
            <h2 className={styles.todayTitle}>{todayStr} 공연</h2>
          </div>
          <TodayConcertCarousel
            ref={carouselRef}
            performances={todayPerformances}
            onGoClick={handleGoNext}
            onClickPerformance={(id) => navigate(`/performance/${id}`)}
          />
        </section>

        {/* ✅ [NAV] 홈 간이 이동 메뉴: 캘린더 섹션 대신 노출 */}
        {/* 
        <section style={{ margin: '32px 0' }}>
          <HomeNaviBar />
        </section>
        */}
        {/* ⬆️ 위 블록은 중복 렌더를 막기 위해 렌더만 주석 처리 (코드/주석 보존) */}

        {/* 오늘의 공연 아래에 (네비바: 위 0 / 아래 40 → 인기공연과 간격 살짝 증가) */}
        <section style={{ margin: '0 0 40px 0' }}>
          <HomeNaviBar
            routes={{
              performance: '/performance',
              venues: '/venue',   // ✅ 라우터 경로에 맞게 단수(/venue)
              artists: '/artist', // ✅ 라우터 경로에 맞게 단수(/artist)
              // magazine: null
            }}
          />
        </section>

        {/* ✅ [POPULAR] 인기 많은 공연 섹션: 네비바 아래, NEW 업로드 위 */}
        <section style={{ margin: '32px 0' }}>
          {/* (PopularConcertList 내부에서 섹션 제목과 리스트 간 간격 처리) */}
          <PopularConcertList performances={popularPerformances} />
        </section>

        {/* 섹션 간격: 위 32 / 아래 32 */}
        <section style={{ margin: '32px 0' }}>
          {/* (NewConcertList 내부에서 섹션 제목과 리스트 간 간격 처리) */}
          <NewConcertList performances={recentPerformances} />
        </section>

        {/* 섹션 간격: 위 32 / 아래 32 */}
        <section style={{ margin: '32px 0' }}>
          {/* (TicketOpenList 내부에서 섹션 제목과 리스트 간 간격 처리) */}
          <TicketOpenList performances={ticketOpenPerformances} />
        </section>

        {/* [PICK] pick 섹션: 제목 중앙, 섹션 위/아래 32, 카드 1개 */}
        <section style={{ margin: '32px 0' }}>
          {/* 섹션 제목과 콘텐츠 간 간격: 16 */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                margin: 0,
                userSelect: 'none',
                cursor: 'default',
              }}
            >
              김삼문 pick !
            </h2>
          </div>
          <PickCard
            id={pickItem.id}
            title={pickItem.title}
            content={pickItem.content}
            imageUrl={pickItem.imageUrl}
            onClick={() => {
              // 상세 페이지 연결 예정: navigate(`/pick/${pickItem.id}`, { state: pickItem })
              navigate(`/pick/${pickItem.id}`, { state: pickItem });
            }}
          />
        </section>

        {/* ✅ [MOOD] 무드별 공연 섹션: 김삼문 pick! 바로 아래, 섹션 간격 32 */}
        <section style={{ margin: '32px 0' }}>
          <MoodSection />
        </section>

        {/* [DISABLED] 맞춤 추천 섹션 렌더 비활성화 */}
        {/*
        <section style={{ margin: '16px 0' }}>
          <RecommendedConcertList performances={recommendedPerformances} />
        </section>
        */}
      </div>
    </>
  );
};

export default HomePage;
