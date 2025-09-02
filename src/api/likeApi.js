// src/api/likeApi.js
import http from './http'; // baseURL: '/', withCredentials: true, validateStatus: s => s < 500

/**
 * 공연 찜 등록 (ON)
 * POST /like  { type: "performance", refId }
 */
export const likePerformance = async (refId) => {
  const res = await http.post('/like', { type: 'performance', refId });
  return res;
};

/**
 * 공연 찜 해제 (OFF)
 * DELETE /like/{refId}?type=performance
 */
export const unlikePerformance = async (refId) => {
  const res = await http.delete(`/like/${refId}`, { params: { type: 'performance' } });
  return res;
};

/**
 * 아티스트 찜 등록 (ON)
 * POST /like  { type: "artist", refId }
 */
export const likeArtist = async (artistId) => {
  const res = await http.post('/like', { type: 'artist', refId: artistId });
  return res;
};

/**
 * 아티스트 찜 해제 (OFF)
 * DELETE /like/{artistId}?type=artist
 */
export const unlikeArtist = async (artistId) => {
  const res = await http.delete(`/like/${artistId}`, { params: { type: 'artist' } });
  return res;
};

/**
 * (옵션) 토글
 * POST /like/{id}/toggle?type=performance|artist  ← 서버에 있으면 사용
 */
export const toggleLike = async (refId, kind /* 'performance' | 'artist' */) => {
  const res = await http.post(`/like/${refId}/toggle`, { }, { params: { type: kind } });
  return res;
};

/**
 * 찜한 공연 목록
 * GET /user/me/like/performance?page&size
 * 로그인 안 했으면 null 반환하도록 하고 싶으면 호출부에서 분기
 */
export const fetchLikedPerformances = async (page, size) => {
  const res = await http.get('/user/me/like/performance', { params: { page, size } });
  return res.status === 200 ? res.data : null; // 401 → null
};

/**
 * 찜한 아티스트 목록
 * GET /user/me/like/artist?page&size
 */
export const fetchLikedArtists = async (page, size) => {
  const res = await http.get('/user/me/like/artist', { params: { page, size } });
  return res.status === 200 ? res.data : null; // 401 → null
};

/**
 * 아티스트 알림 등록/해제
 * POST /alert  { type: "artist", refId }
 * DELETE /alert/{artistId}?type=artist
 */
export const registerArtistAlert = async (artistId) => {
  const res = await http.post('/alert', { type: 'artist', refId: artistId });
  return res;
};

export const cancelArtistAlert = async (artistId) => {
  const res = await http.delete(`/alert/${artistId}`, { params: { type: 'artist' } });
  return res;
};
