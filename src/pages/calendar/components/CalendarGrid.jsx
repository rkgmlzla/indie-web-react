// ✅ src/pages/calendar/components/CalendarGrid.jsx
import React from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, addDays, getDay } from 'date-fns';
import styles from './CalendarGrid.module.css';

function CalendarGrid({ currentMonth, selectedDate, setSelectedDate, concerts }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startWeekday = getDay(monthStart); // 0 (일) ~ 6 (토)
  const days = [];

  // 빈 칸 생성
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  // 1일부터 말일까지
  let day = monthStart;
  while (day <= monthEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const concertDates = concerts.map((concert) => format(new Date(concert.date), 'yyyy-MM-dd'));
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className={styles.grid}>
      {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
        <div key={day} className={styles.dayLabel}>{day}</div>
      ))}

      {days.map((dayItem, index) => {
        if (!dayItem) {
          return <div key={`blank-${index}`} className={styles.blank}></div>;
        }

        const dateStr = format(dayItem, 'yyyy-MM-dd');
        const hasConcert = concertDates.includes(dateStr);
        const isSelected = isSameDay(dayItem, selectedDate);
        const isToday = dateStr === today;

        let dayClass = styles.day;
        if (isToday) {
          dayClass += ` ${styles.today}`;
        } else if (hasConcert && isSelected) {
          dayClass += ` ${styles.selectedAndHasConcert}`;
        } else if (hasConcert) {
          dayClass += ` ${styles.concert}`;
        } else if (isSelected) {
          dayClass += ` ${styles.selectedOnly}`;
        }

        return (
          <div
            key={dateStr}
            className={dayClass}
            onClick={() => setSelectedDate(dayItem)}
          >
            {isToday && <div className={styles.redDot}></div>}
            <span className={styles.dayNumber}>{format(dayItem, 'd')}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;