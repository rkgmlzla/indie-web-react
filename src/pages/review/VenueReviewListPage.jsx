// src/pages/venue/VenueReviewListPage.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { fetchVenueReviewList } from '../../api/reviewApi';
import './VenueReviewListPage.css';

const AVATAR_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="100%" height="100%" rx="10" fill="#e6e6ea"/></svg>'
  );

// 절대URL/루트상대(/...)은 그대로, 그 외는 루트에 붙임
const resolveUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const s = url.trim().replace(/"/g, '');
  if (!s) return '';
  if (s.startsWith('http')) return s;
  if (s.startsWith('/')) return s;
  return `/${s.replace(/^\//, '')}`;
};

function ReviewCard({ item, onReport }) {
  // 서버가 주는 다양한 키 흡수
  const rawAvatar =
    item.profile_url ||
    item.avatar_url ||
    item.avatarUrl ||
    item.user?.profile_url ||
    '';

  // 서버 기본값(/default_profile.png)을 절대 쓰지 않도록 차단
  const isBadDefault =
    /(^|\/)default_profile\.png$/.test((rawAvatar || '').trim());

  // 최종 src
  const avatarSrc = (!rawAvatar || isBadDefault)
    ? AVATAR_PLACEHOLDER
    : resolveUrl(rawAvatar);

  const dateISO = item.created_at || item.createdAt || '';
  const date = dateISO ? dateISO.slice(0, 10) : '';

  return (
    <div className="review-card">
      <p className="review-card__content">{item.content}</p>

      <div className="review-card__bottom">
        <div className="review-card__left">
          <img
            className="review-card__avatar"
            src={avatarSrc}
            alt="작성자 프로필"
            onError={(e) => {
              // 무한 루프 방지 + 즉시 회색 플레이스홀더
              e.currentTarget.onerror = null;
              e.currentTarget.src = AVATAR_PLACEHOLDER;
            }}
          />
          <span className="review-card__author">{item.author || '익명'}</span>
          <span className="review-card__date">{date}</span>
        </div>

        <button
          type="button"
          className="review-card__report"
          onClick={() => onReport(item.id)}
        >
          신고
        </button>
      </div>
    </div>
  );
}

export default function VenueReviewListPage() {
  const { id } = useParams();
  const venueId = Number(id);
  const navigate = useNavigate();

  const PAGE_SIZE = 10;

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 최신 상태 ref
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const sentinelRef = useRef(null);

  // 페이지 로더
  const loadPage = async (targetPage, replace = false) => {
    if (!Number.isFinite(venueId)) return;
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const { total: totalCount, items: list } = await fetchVenueReviewList(
        venueId,
        { page: targetPage, size: PAGE_SIZE }
      );

      setTotal(Number(totalCount ?? 0));
      setItems((prev) => (replace ? list : [...prev, ...list]));
      pageRef.current = targetPage;

      const fetched = targetPage * PAGE_SIZE - (PAGE_SIZE - list.length);
      const noMore = !list.length || fetched >= Number(totalCount ?? 0);
      if (noMore) {
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } catch (e) {
      console.error('[VenueReviewListPage] load error:', e);
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // venueId 바뀔 때 초기화 + 첫 페이지 로드
  useEffect(() => {
    setTotal(0);
    setItems([]);
    setLoading(false);
    setHasMore(true);
    pageRef.current = 0;
    loadingRef.current = false;
    hasMoreRef.current = true;

    if (Number.isFinite(venueId)) {
      loadPage(1, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueId]);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const next = pageRef.current + 1;
          loadPage(next);
        }
      },
      { root: null, rootMargin: '200px 0px 400px', threshold: 0 }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueId]);

  const handleReport = (id) => {
    alert('신고가 접수되었습니다.');
    // TODO: 신고 API 연결
  };

  return (
    <div className="page page--reviews">
      <Header title="리뷰" showBack />
      <div className="header-spacer" />

      <div className="review-summary">
        <span>총 {total}개</span>
        <button
          type="button"
          className="review-write-btn"
          disabled={!Number.isFinite(venueId)}
          onClick={() => navigate(`/review/write?venueId=${venueId}`)}
        >
          작성하기
        </button>
      </div>

      <div className="review-list">
        {items.map((it) => (
          <ReviewCard key={it.id} item={it} onReport={handleReport} />
        ))}

        {!items.length && !loading && (
          <div className="empty">아직 작성된 리뷰가 없어요.</div>
        )}

        <div ref={sentinelRef} className="sentinel" />
        {loading && <div className="loading">불러오는 중…</div>}
        {!hasMore && items.length > 0 && (
          <div className="end">마지막 리뷰입니다.</div>
        )}
      </div>
    </div>
  );
}
