import { useState, memo } from 'react';

const AVATAR_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="100%" height="100%" rx="10" fill="#e6e6ea"/></svg>');

const resolveUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const s = url.trim().replace(/"/g, '');
  if (!s) return '';
  if (s.startsWith('http')) return s;
  if (s.startsWith('/')) return s;
  return `/${s.replace(/^\//, '')}`;
};

/**
 * props
 * - item: { id, author, content, created_at, profile_url, like_count, is_liked }
 * - canLike: boolean (로그인 여부)
 * - onToggleLike: (reviewId: number, nextLiked: boolean) => Promise<{like_count?:number,is_liked?:boolean}|void>
 * - onNeedLogin: () => void
 * - onReport: (reviewId:number) => void
 */
function ReviewCard({ item, canLike, onReport, onToggleLike, onNeedLogin }) {

  // 아바타/날짜
  const rawAvatar =
    item.profile_url || item.avatar_url || item.avatarUrl || item.user?.profile_url || '';
  const isBadDefault = /(^|\/)default_profile\.png$/.test((rawAvatar || '').trim());
  const avatarSrc = (!rawAvatar || isBadDefault) ? AVATAR_PLACEHOLDER : resolveUrl(rawAvatar);

  const dateISO = item.created_at || item.createdAt || '';
  const date = dateISO ? dateISO.slice(0, 10) : '';

  // 좋아요 초기값 (총 수 + 내 상태)
  const initialLiked = !!(item.is_liked ?? item.isLiked ?? false);
  const initialLikeCount =
    typeof item.like_count === 'number'
      ? item.like_count
      : (typeof item.likeCount === 'number' ? item.likeCount :
        (typeof item.likes_count === 'number' ? item.likes_count :
          (Array.isArray(item.likes) ? item.likes.length : 0)));

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [busy, setBusy] = useState(false);

  const handleLikeClick = async () => {
    if (!canLike) {
      onNeedLogin?.();
      return;
    }
    
    if (busy) return;

    setBusy(true);
    const prevLiked = liked;
    const nextLiked = !prevLiked;

    // 낙관적 업데이트
    setLiked(nextLiked);
    setLikeCount((c) => Math.max(0, c + (nextLiked ? 1 : -1)));

    try {
      const res = await onToggleLike?.(item.id, nextLiked);
      // 서버가 최신 값을 돌려주면 동기화
      if (res && typeof res.like_count === 'number') setLikeCount(res.like_count);
      if (res && typeof res.is_liked === 'boolean') setLiked(res.is_liked);
    } catch (err) {
      // 롤백
      setLiked(prevLiked);
      setLikeCount(initialLikeCount);
      console.error('[ReviewCard] like toggle failed:', err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="review-card">
      <p className="review-card__content">{item.content}</p>

      <div className="review-card__bottom">
        <div className="review-card__left">
          <img
            className="review-card__avatar"
            src={avatarSrc}
            alt="작성자 프로필"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = AVATAR_PLACEHOLDER; }}
          />
          <span className="review-card__author">{item.author || '익명'}</span>
          <span className="review-card__date">{date}</span>
        </div>

        <div className="review-card__right">
          <button
            type="button"
            className={`review-card__like ${liked ? 'is-liked' : ''}`}
            aria-pressed={liked}
            aria-disabled={busy}
            disabled={busy}
            onClick={handleLikeClick}
            title={liked ? '좋아요 취소' : '좋아요'}
          >
            <span className="review-card__like-icon">💗</span>
            <span className="review-card__like-count">{likeCount}</span>
          </button>

          <button type="button" className="review-card__report" onClick={() => onReport(item.id)}>
            신고
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ReviewCard);
