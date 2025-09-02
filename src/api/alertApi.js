// src/api/alertApi.js
import http from './http'; // baseURL: '/', withCredentials: true, validateStatus: s => s < 500

// 내부 공통 헬퍼
const _postAlert = (type, refId) => {
  return http.post('/alert', { type, refId }); // 2xx/4xx는 호출부에서 status로 분기
};

const _deleteAlert = (type, refId) => {
  return http.delete(`/alert/${refId}`, { params: { type } });
};

/* =======================
 *  구독형 알림 ON/OFF
 * ======================= */

// 공연 티켓오픈 알림
export const registerTicketOpenAlert = (performanceId) =>
  _postAlert('ticket_open', performanceId);
export const cancelTicketOpenAlert = (performanceId) =>
  _deleteAlert('ticket_open', performanceId);

// 공연 알림
export const registerPerformanceAlert = (performanceId) =>
  _postAlert('performance', performanceId);
export const cancelPerformanceAlert = (performanceId) =>
  _deleteAlert('performance', performanceId);

// 아티스트 알림
export const registerArtistAlert = (artistId) =>
  _postAlert('artist', artistId);
export const cancelArtistAlert = (artistId) =>
  _deleteAlert('artist', artistId); // ✅ 인자 순서/개수 수정

/* =======================
 *  알림 리스트 / 읽음 / 삭제
 * ======================= */

export const fetchNotifications = async () => {
  const res = await http.get('/notifications', {
    params: { _t: Date.now() }, // 캐시 버스터
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  return res.status === 200 ? res.data : [];
};

export const markNotificationRead = (id) =>
  http.patch(`/notifications/${id}/read`);

export const removeNotification = (id) =>
  http.delete(`/notifications/${id}`);
