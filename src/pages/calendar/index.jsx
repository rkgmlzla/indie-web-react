// ✅ src/pages/calendar/index.jsx
import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import CalendarGrid from './components/CalendarGrid';
import DailyConcertList from './components/DailyConcertList';
import RegionFilterTrigger from './components/RegionFilterTrigger';
import RegionFilterBottomSheet from './components/RegionFilterBottomSheet';
import IconGo from '../../assets/icons/icon_go_hyunjin.svg';
import styles from './CalendarPage.module.css';
import Header from '../../components/layout/Header';
import { useNavigate } from 'react-router-dom';

// ✅ theme에서 주황/아웃라인 색 호출
import { theme } from '../../styles/theme';

// ✅ API Import
import { fetchMonthlyPerformanceDates, fetchPerformancesByDate } from '../../api/calendarApi';

function CalendarPage() {
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [showRegionSheet, setShowRegionSheet] = useState(false);

  const [monthConcertDates, setMonthConcertDates] = useState([]);
  const [dailyConcerts, setDailyConcerts] = useState([]);

  // ✅ 월별 공연 날짜 로드
  const loadMonthlyConcertDates = async (year, month, regionParam) => {
    try {
      const data = await fetchMonthlyPerformanceDates(year, month, regionParam);
      console.log('🎯 [캘린더] 월별 공연 날짜 응답:', data);
      setMonthConcertDates(data);
    } catch (err) {
      console.error('📛 월별 공연 날짜 API 호출 실패:', err);
      setMonthConcertDates([]);
    }
  };

  // ✅ 날짜별 공연 리스트 로드
  const loadDailyConcerts = async (date) => {
    try {
      const regionParam = selectedRegions.includes('전체') ? undefined : selectedRegions;
      const data = await fetchPerformancesByDate(date, regionParam);
      console.log(`🎯 [캘린더] ${date} 공연 리스트 응답:`, data);
      setDailyConcerts(data);
    } catch (err) {
      console.error('📛 날짜별 공연 리스트 API 호출 실패:', err);
      setDailyConcerts([]);
    }
  };

  // ✅ 월 변경 시 API 호출
  useEffect(() => {
    const year = format(currentMonth, 'yyyy');
    const month = format(currentMonth, 'MM');
    const regionParam = selectedRegions.includes('전체') ? undefined : selectedRegions;
    loadMonthlyConcertDates(year, month, regionParam);
  }, [currentMonth, selectedRegions]);

  // ✅ 초기 진입 시 오늘 공연 로딩
  useEffect(() => {
    const formatted = format(selectedDate, 'yyyy-MM-dd');
    loadDailyConcerts(formatted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 날짜 클릭 시 공연 로딩
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formatted = format(date, 'yyyy-MM-dd');
    loadDailyConcerts(formatted);
  };

  // ✅ 지역 변경 적용 (날짜 선택도 해제)
  const handleRegionApply = (regions) => {
    setSelectedRegions(regions);
    setShowRegionSheet(false);
    // 👉 날짜 선택 및 공연 카드 모두 해제
    setSelectedDate(null);
    setDailyConcerts([]);
  };

  return (
    <>
      <Header title="공연 캘린더" showBack onBackClick={() => navigate(-1)} />
      {/* CSS Module에서 사용할 커스텀 CSS 변수로 theme 색 주입 */}
      <div
        className={styles.calendarPage}
        style={{
          '--accent': theme.colors.maybethemeOrange,
          '--outlineGray': theme.colors.outlineGray,
        }}
      >
        {/* 🔻 헤더와 거의 맞닿도록 상단 간격 축소 */}
        <div style={{ height: '4px' }} />

        {/* 월 이동 UI */}
        <div className={styles.header}>
          <img
            src={IconGo}
            alt="이전"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className={`${styles.navIcon} ${styles.leftIcon}`}
          />
          <h2 className={styles.monthTitle}>{format(currentMonth, 'M월')}</h2>
          <img
            src={IconGo}
            alt="다음"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className={styles.navIcon}
          />
        </div>

        {/* 지역 필터 */}
        <RegionFilterTrigger selectedRegions={selectedRegions} onOpen={() => setShowRegionSheet(true)} />
        {showRegionSheet && (
          <RegionFilterBottomSheet
            initialSelected={selectedRegions}
            onClose={() => setShowRegionSheet(false)}
            onApply={handleRegionApply}
          />
        )}

        {/* 달력 */}
        <CalendarGrid
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
          concerts={monthConcertDates}
        />

        {/* 구분선 */}
        <div className={styles.divider} />

        {/* 날짜별 공연 리스트 */}
        {selectedDate ? (
          <>
            <h3 className={styles.dailyTitle}>{format(selectedDate, 'M월 d일')} 공연</h3>
            <DailyConcertList concerts={dailyConcerts} />
          </>
        ) : (
          // 날짜 선택 해제 시 아무것도 보이지 않게 처리
          <div style={{ height: '0px' }} />
        )}
      </div>
    </>
  );
}

export default CalendarPage;
