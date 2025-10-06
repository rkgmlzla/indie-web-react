import dayjs from 'dayjs';

export default function getDday(dateString) {
  const today = dayjs().startOf('day');
  const performanceDate = dayjs(dateString).startOf('day');
  const diff = performanceDate.diff(today, 'day');

  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return 'D-Day';
  return '종료됨';
}
