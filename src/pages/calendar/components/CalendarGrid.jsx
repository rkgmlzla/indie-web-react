import React from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, addDays, getDay } from 'date-fns';
import styles from './CalendarGrid.module.css';

function CalendarGrid({ currentMonth, selectedDate, onDateClick, concerts }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startWeekday = getDay(monthStart);
  const days = [];

  for (let i = 0; i < startWeekday; i++) days.push(null);

  let day = monthStart;
  while (day <= monthEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const concertDates = concerts.map((d) => format(new Date(d), 'yyyy-MM-dd'));
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className={styles.grid}>
      {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
        <div key={d} className={styles.dayLabel}>{d}</div>
      ))}

      {days.map((dayItem, i) => {
        if (!dayItem) return <div key={`blank-${i}`} className={styles.blank}></div>;

        const dateStr = format(dayItem, 'yyyy-MM-dd');
        const hasConcert = concertDates.includes(dateStr);
        const isSelected = isSameDay(dayItem, selectedDate);
        const isToday = dateStr === today;

        let className = styles.day;
        if (isToday) className += ` ${styles.today}`;
        if (hasConcert) className += ` ${styles.concert}`;
        if (isSelected) className += ` ${styles.selectedOnly}`;
        if (hasConcert && isSelected) className += ` ${styles.selectedAndHasConcert}`;

        return (
          <div key={dateStr} className={className} onClick={() => onDateClick(dayItem)}>
            {isToday && <div className={styles.redDot}></div>}
            <span className={styles.dayNumber}>{format(dayItem, 'd')}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;
