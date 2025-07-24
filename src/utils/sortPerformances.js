// /utils/sortPerformances.js
import dayjs from 'dayjs';

export default function sortPerformances(data, option) {
  const sorted = [...data];

  switch (option) {
    case '최근등록순':
      sorted.sort((a, b) => b.id - a.id);
      break;
    case '공연임박순':
      sorted.sort((a, b) => {
        const aDate = dayjs(`${a.date} ${a.time}`);
        const bDate = dayjs(`${b.date} ${b.time}`);
        return aDate - bDate;
      });
      break;
    case '인기많은순':
      sorted.sort((a, b) => b.likes - a.likes);
      break;
  }

  return sorted;
}
