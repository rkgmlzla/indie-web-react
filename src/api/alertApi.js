// src/api/alertApi.js
import axios from 'axios';
import { baseUrl } from './config';

console.log('[alertApi] baseUrl =', baseUrl);

// 공통 config 헬퍼 (항상 headers 객체 생성 + 병합)
const buildConfig = (authToken, extra = {}) => {
  const authHeader = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  return {
    withCredentials: true,
    headers: { ...authHeader, ...(extra.headers || {}) },
    params: extra.params, // 필요시 병합용
  };
};

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
  _deleteAlert('artist', authToken);

/** =======================
 *  알림 리스트 / 읽음 / 삭제
 *  ======================= */
export const fetchNotifications = async (authToken) => {
  const { data } = await axios.get(
    `${baseUrl}/notifications`,
    buildConfig(authToken, {
      // ✅ 캐시 버스터 & 캐시 억제
      params: { _t: Date.now() },
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })
  );
  return data; // [{ id, title, body, link_url, is_read, created_at, payload }, ...]
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
