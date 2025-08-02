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
      // ✅ 다중 지역 지원 → 배열 그대로 전달
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

  // ✅ 날짜 클릭 시 공연 로딩
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formatted = format(date, 'yyyy-MM-dd');
    loadDailyConcerts(formatted);
  };

  // ✅ 지역 변경 적용
  const handleRegionApply = (regions) => {
    setSelectedRegions(regions);
    setShowRegionSheet(false);
    const formatted = format(selectedDate, 'yyyy-MM-dd');
    loadDailyConcerts(formatted);
  };

  return (
    <>
      <Header title="공연 캘린더" showBack onBackClick={() => navigate(-1)} />
      <div className={styles.calendarPage}>
        <div style={{ height: '56px' }} />

        {/* 월 이동 UI */}
        <div className={styles.header}>
          <img src={IconGo} alt="이전" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className={`${styles.navIcon} ${styles.leftIcon}`} />
          <h2 className={styles.monthTitle}>{format(currentMonth, 'M월')}</h2>
          <img src={IconGo} alt="다음" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className={styles.navIcon} />
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
          onDateClick={handleDateClick}   // ✅ 수정 포인트
          concerts={monthConcertDates}
        />

        {/* 날짜별 공연 리스트 */}
        <h3 className={styles.dailyTitle}>{format(selectedDate, 'M월 d일')} 공연</h3>
        <DailyConcertList concerts={dailyConcerts} />
      </div>
    </>
  );
}

export default CalendarPage;
