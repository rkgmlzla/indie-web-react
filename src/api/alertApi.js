// src/api/alertApi.js
import axios from 'axios';
import { baseUrl } from './config';
console.log('[alertApi] baseUrl =', baseUrl);
// 공통 config 헬퍼
const buildConfig = (authToken) => ({
  withCredentials: true,
  headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
});

// 내부 공통 헬퍼
const _postAlert = async (type, refId, authToken) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/alert`,
      { type, refId },
      buildConfig(authToken)
    );
    return data;
  } catch (error) {
    console.error(
      `📛 알림 등록 실패 [${type}]:`,
      error.response?.data ?? error
    );
    throw error;
  }
};

const _deleteAlert = async (type, refId, authToken) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/alert/${refId}`, {
      ...buildConfig(authToken),
      params: { type },
    });
    return data;
  } catch (error) {
    console.error(
      `📛 알림 해제 실패 [${type}]:`,
      error.response?.data ?? error
    );
    throw error;
  }
};

/** =======================
 *  구독형 알림 ON/OFF
 *  - ticket_open: 예매 오픈
 *  - performance: 공연 D-1
 *  - artist: 아티스트 새 공연
 *  ======================= */
export const registerTicketOpenAlert = (refId, authToken) =>
  _postAlert('ticket_open', refId, authToken);
export const cancelTicketOpenAlert = (refId, authToken) =>
  _deleteAlert('ticket_open', refId, authToken);

export const registerPerformanceAlert = (refId, authToken) =>
  _postAlert('performance', refId, authToken);
export const cancelPerformanceAlert = (refId, authToken) =>
  _deleteAlert('performance', refId, authToken);

export const registerArtistAlert = (artistId, authToken) =>
  _postAlert('artist', artistId, authToken);
export const cancelArtistAlert = (artistId, authToken) =>
  _deleteAlert('artist', artistId, authToken);

/** =======================
 *  알림 리스트 / 읽음 / 삭제
 *  (알림 페이지용)
 *  ======================= */
export const fetchNotifications = async (authToken) => {
  const { data } = await axios.get(
    `${baseUrl}/notifications`,
    buildConfig(authToken)
  );
  return data; // [{id,title,body,link_url,is_read,created_at}, ...]
};

export const markNotificationRead = async (id, authToken) => {
  await axios.patch(
    `${baseUrl}/notifications/${id}/read`,
    null,
    buildConfig(authToken)
  );
};

export const removeNotification = async (id, authToken) => {
  await axios.delete(`${baseUrl}/notifications/${id}`, buildConfig(authToken));
};
