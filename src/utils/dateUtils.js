export function parseDateTime(date, time) {
  // date: '2025-07-20', time: '20:00' or undefined
  const fullString = time ? `${date}T${time}` : `${date}T00:00`;
  return new Date(fullString);
}