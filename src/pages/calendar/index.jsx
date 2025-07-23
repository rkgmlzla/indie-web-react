// ✅ src/pages/calendar/index.jsx
import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import CalendarGrid from './components/CalendarGrid';
import DailyConcertList from './components/DailyConcertList';
import concerts from '../../data/concertList_calendar';
import RegionFilterTrigger from './components/RegionFilterTrigger';
import RegionFilterBottomSheet from './components/RegionFilterBottomSheet';
import IconGo from '../../assets/icons/icon_go_hyunjin.svg';
import styles from './CalendarPage.module.css';

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [showRegionSheet, setShowRegionSheet] = useState(false);

  const concertsForCalendar = concerts.filter((concert) =>
    selectedRegions.length === 0 || selectedRegions.includes(concert.region)
  );

  const filteredConcerts = concerts.filter((concert) => {
    const isSameDate =
      format(new Date(concert.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    const regionMatch =
      selectedRegions.length === 0 || selectedRegions.includes(concert.region);
    return isSameDate && regionMatch;
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className={styles.calendarPage}>
      <div className={styles.header}>
        <img
          src={IconGo}
          alt="이전"
          onClick={handlePrevMonth}
          className={`${styles.navIcon} ${styles.leftIcon}`}
        />
        <h2 className={styles.monthTitle}>{format(currentMonth, 'M월')}</h2>
        <img
          src={IconGo}
          alt="다음"
          onClick={handleNextMonth}
          className={styles.navIcon}
        />
      </div>

      <RegionFilterTrigger
        selectedRegions={selectedRegions}
        onOpen={() => setShowRegionSheet(true)}
      />

      {showRegionSheet && (
        <RegionFilterBottomSheet
          initialSelected={selectedRegions}
          onClose={() => setShowRegionSheet(false)}
          onApply={(regions) => setSelectedRegions(regions)}
        />
      )}

      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        concerts={concertsForCalendar}
      />

      <h3 className={styles.dailyTitle}>
        {format(selectedDate, 'M월 d일')} 공연
      </h3>
      <DailyConcertList concerts={filteredConcerts} />
    </div>
  );
}

export default CalendarPage;
