// src/utils/dateUtils.js

// ISO 문자열 → Date 객체 (안전 파서)
export function parseDateTime(value) {
  if (!value) return null;
  // 'YYYY-MM-DD'만 오면 로컬 자정으로 보정
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00`);
  }
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/** 내부용: HH:MM -> HH:MM:00 보정 */
function normalizeTime(t) {
  if (!t) return '00:00:00';
  if (/^\d{2}:\d{2}$/.test(t)) return `${t}:00`;
  return t; // 이미 HH:MM:SS면 그대로
}

/**
 * 날짜/시간 문자열을 "YYYY-MM-DD (요일) 오전/오후 N시"로 포맷
 * ex) 2025-09-25T19:00:00 → "2025-09-25 (목) 오후 7시"
 */
export function formatKoreanDateTime(value) {
  const dt = parseDateTime(value);
  if (!dt) return '';

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[dt.getDay()];

  let hour = dt.getHours();
  const ampm = hour < 12 ? '오전' : '오후';
  let displayHour = hour % 12;
  if (displayHour === 0) displayHour = 12;

  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} (${weekday}) ${ampm} ${displayHour}시`;
}

/* date + time이 분리되어 오는 경우 */
export function formatKoreanFromParts(dateStr, timeStr) {
  if (!dateStr) return '';
  if (typeof dateStr === 'string' && dateStr.includes('T')) {
    return formatKoreanDateTime(dateStr);
  }
  const t = normalizeTime(timeStr);              
  return formatKoreanDateTime(`${dateStr}T${t}`);
}