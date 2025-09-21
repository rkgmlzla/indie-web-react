// src/api/reviewApi.js
import axios from 'axios';
import { baseUrl } from './config';

// 내부 유틸: URL 보정 (게시물 쪽 resolve와 동일한 규칙)
const resolveUrl = (url) => {
  if (!url) return '';
  const s = String(url).trim().replace(/"/g, '');
  if (!s) return '';
  if (s.startsWith('http')) return s;       // 절대 URL이면 그대로
  if (s.startsWith('/')) return s;          // 서버 상대경로면 그대로 (프록시/동일도메인 가정)
  return `${baseUrl.replace(/\/$/, '')}/${s.replace(/^\//, '')}`; // 파일명 등
};

// 내부 유틸: 서버 아이템 → 안전한 형태로 정규화
const normalizeReviewItem = (raw) => {
  // 서버가 어떤 키로 주든 흡수
  const rawProfile =
    raw?.profile_url ??
    raw?.avatar_url ??
    raw?.avatarUrl ??
    raw?.avatar ??
    raw?.user?.profile_url ??
    raw?.user?.avatar_url ??
    '';

  const profile_url = resolveUrl(rawProfile) || '/default_profile.png';

  return {
    id: raw?.id,
    author: raw?.author ?? raw?.user?.nickname ?? '익명',
    content: raw?.content ?? '',
    created_at: raw?.created_at ?? raw?.createdAt ?? '',
    profile_url, // ← 프론트에서 이 키만 쓰면 됨
  };
};

/**
 * 공연장 리뷰 목록 조회
 * GET /venue/:venueId/review?page=&size=
 * 반환: { total, items: Array<{id, author, content, created_at, profile_url}> }
 */
export const fetchVenueReviewList = async (venueId, { page = 1, size = 10 } = {}) => {
  const v = Number(venueId);
  if (!Number.isFinite(v)) throw new Error(`invalid venueId: ${venueId}`);

  const res = await axios.get(`${baseUrl}/venue/${v}/review`, {
    params: { page, size },
    // withCredentials: true, // 쿠키 인증 쓰면 주석 해제
  });

  const data = res?.data ?? {};
  const rawItems = Array.isArray(data.items) ? data.items : [];
  const items = rawItems.map(normalizeReviewItem);
  const total = Number.isFinite(data.total) ? data.total : items.length;

  return { total, items };
};

/**
 * 리뷰 미리보기 N건
 * GET /venue/:venueId/review?page=1&size=limit
 */
export const fetchVenueReviewPreview = async (venueId, limit = 3) => {
  const { items } = await fetchVenueReviewList(venueId, { page: 1, size: limit });
  return items;
};

/**
 * 리뷰 작성
 * POST /venue/:venueId/review
 * body: { content }
 * 반환: 정규화된 ReviewItem
 */
export const createVenueReview = async (venueId, content, authToken) => {
  const v = Number(venueId);
  if (!Number.isFinite(v)) throw new Error(`invalid venueId: ${venueId}`);

  const res = await axios.post(
    `${baseUrl}/venue/${v}/review`,
    { content },
    {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    }
  );

  return normalizeReviewItem(res?.data ?? {});
};
