import http from './http';
import { baseUrl } from './config';

// URL 보정
const resolveUrl = (url) => {
  if (!url) return '';
  const s = String(url).trim().replace(/"/g, '');
  if (!s) return '';
  if (s.startsWith('http')) return s;
  if (s.startsWith('/')) return s;
  return `${baseUrl.replace(/\/$/, '')}/${s.replace(/^\//, '')}`;
};

// ✅ 2xx만 통과, 그 외(401 포함)는 throw (http.js는 401도 resolve하므로 여기서 체크)
const ensureOk = (res) => {
  if (res && res.status >= 200 && res.status < 300) return res;
  const err = new Error(`HTTP ${res?.status ?? 'ERR'}`);
  err.response = res;
  throw err;
};

// 서버 응답 정규화
const normalizeReviewItem = (raw) => {
  const rawProfile =
    raw?.profile_url ?? raw?.avatar_url ?? raw?.avatarUrl ?? raw?.avatar ??
    raw?.user?.profile_url ?? raw?.user?.avatar_url ?? '';
  const profile_url = resolveUrl(rawProfile) || '/default_profile.png';

  return {
    id: raw?.id,
    author: raw?.author ?? raw?.user?.nickname ?? '익명',
    content: raw?.content ?? '',
    created_at: raw?.created_at ?? raw?.createdAt ?? '',
    profile_url,
    like_count:
      typeof raw?.like_count === 'number' ? raw.like_count :
      typeof raw?.likeCount === 'number' ? raw.likeCount : 0,
    is_liked: !!(raw?.is_liked ?? raw?.isLiked ?? false),
    images: Array.isArray(raw?.images) ? raw.images : [],
  };
};

/** 목록 (공개) */
export const fetchVenueReviewList = async (venueId, { page = 1, size = 10 } = {}) => {
  const v = Number(venueId);
  if (!Number.isFinite(v)) throw new Error(`invalid venueId: ${venueId}`);
  const res = await http.get(`/venue/${v}/review`, { params: { page, size } });
  ensureOk(res);
  const data = res?.data ?? {};
  const rawItems = Array.isArray(data.items) ? data.items : [];
  const items = rawItems.map(normalizeReviewItem);
  const total = Number.isFinite(data.total) ? data.total : items.length;
  return { total, items };
};

/** 미리보기 */
export const fetchVenueReviewPreview = async (venueId, limit = 3) => {
  const { items } = await fetchVenueReviewList(venueId, { page: 1, size: limit });
  return items;
};

/** 작성 (Bearer) */
export const createVenueReview = async (venueId, content, accessToken = localStorage.getItem('accessToken')) => {
  const v = Number(venueId);
  if (!Number.isFinite(v)) throw new Error(`invalid venueId: ${venueId}`);
  const headers = {
    'Content-Type': 'application/json',
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const res = await http.post(
    `/venue/${v}/review`,
    { content },
    { headers }
    
  );
  ensureOk(res);
  return normalizeReviewItem(res?.data ?? {});
};

/** 좋아요 ON (Bearer) */
export const likeReview = async (venueId, reviewId, accessToken = localStorage.getItem('accessToken')) => {
  const headers = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const res = await http.post(
    `/review/${reviewId}/like`,
    { type: 'review', refId: reviewId },
    { headers }
  );
  ensureOk(res);
  return res.data; // { review_id, like_count, liked: true }
};

/** 좋아요 OFF (Bearer) */
export const unlikeReview = async (venueId, reviewId, accessToken = localStorage.getItem('accessToken')) => {
  const headers = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const res = await http.delete(
    `/review/${reviewId}/like`,
    { headers }
  );
  ensureOk(res);
  return res.data; // { review_id, like_count, liked: false }
};
