import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import ReviewCard from '../../components/review/ReviewCard';
import { fetchVenueReviewList, likeReview, unlikeReview, createVenueReview } from '../../api/reviewApi';
import './VenueReviewListPage.css';


export default function VenueReviewListPage() {
  const { id } = useParams();
  const venueId = Number(id);
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const authChecked = true;

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
  
  const handleNeedLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };

  const handleToggleLike = async (reviewId, nextLiked) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (nextLiked) {
        await likeReview(venueId, reviewId, accessToken);
      } else {
        await unlikeReview(venueId, reviewId, accessToken);
      }
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        handleNeedLogin();
      } else {
        console.error(e);
        alert('잠시 후 다시 시도해주세요.');
      }
      throw e; // 카드에서 롤백 처리됨
    }
  };

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
          onClick={() => {
          navigate(`/review/write?venueId=${venueId}`);
          }}
        >
          작성하기
        </button>
      </div>

      <div className="review-list">
        {items.map((it) => (
          <ReviewCard
            key={it.id}
            item={it}
            canLike={!!localStorage.getItem('accessToken')}                 
            onNeedLogin={handleNeedLogin}    
            onReport={handleReport}
            onToggleLike={handleToggleLike}
          />
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
