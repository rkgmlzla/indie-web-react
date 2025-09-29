import React, { useMemo, useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

/* ==================== 스타일 ==================== */
const Card = styled.article.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})`
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  ${({ variant }) =>
    variant === 'compact' &&
    css`
      padding: 10px;
      gap: 6px;
    `}
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 6px;
  font-size: 16px;
  line-height: 1;
  color: #9ca3af;
  background: transparent;
  border: 0;
  cursor: pointer;

  &:hover {
    color: #ef4444;
  }
`;

const ThumbRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ThumbItem = styled.img`
  flex: 0 0 auto;
  width: 140px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid #eee;
  background: #f2f2f2;
`;

const MoreBtn = styled.button`
  flex: 0 0 auto;
  width: 140px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #f7f7f7;
  font-size: 14px;
  color: #555;
  cursor: pointer;
`;

const BodyText = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})`
  font-size: 14px;
  color: #444;
  line-height: 1.4;
  white-space: pre-wrap;
  margin: 0;

  ${({ variant }) =>
    variant === 'compact' &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    `}
`;

const MetaBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0; /* ellipsis 안전 */
`;

const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

const MetaName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #111827;
`;

const Dot = styled.span`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #d1d5db;
`;

 const VenueInline = styled(Link)`
   display: inline-flex;
   align-items: center;
   gap: 6px;
   text-decoration: none;
   color: inherit;
   cursor: pointer;
   &:hover { opacity: .9; }
`;

 const VenueLogo = styled.img`
   width: 18px;
   height: 18px;
   border-radius: 50%;   
   object-fit: cover;
   border: 1px solid #eee;
   background: #f6f6f6;
   flex-shrink: 0;
`;

const VenueName = styled.span`
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaDate = styled.time`
  font-size: 12px;
  color: #6b7280;
  margin-left: 6px;
`;

const LikeBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active' && prop !== '$disabled',
})`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 9999px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #6b7280;

  ${({ active }) =>
    active &&
    css`
      background: #fff1f2;
      border-color: #fda4af;
      color: #e11d48;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
      cursor: default;
    `}
`;

/* 라이트박스 */
const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewerImg = styled.img`
  max-width: 92vw;
  max-height: 82vh;
  object-fit: contain;
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-size: 18px;
  line-height: 34px;
`;

const NavBtn = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-size: 20px;

  ${({ $left }) =>
    $left
      ? css`
          left: 16px;
        `
      : css`
          right: 16px;
        `}
`;

/* ==================== 컴포넌트 ==================== */
export default function ReviewCard({
  review,
  variant = 'compact',
  isLoggedIn = false,
  isOwner = false,
  onToggleLike,
  onDelete,
}) {
  // snake_case, camelCase 모두 지원 + venue 포함
  const {
    id,
    user,
    content,
    created_at,
    createdAt,
    images = [],
    like_count,
    likeCount,
    liked_by_me,
    likedByMe,
    venue, // { id, name, logo_url }가 있으면 표시
  } = review || {};

  const created = created_at ?? createdAt ?? null;
  const liked = (liked_by_me ?? likedByMe) ?? false;
  const count = (like_count ?? likeCount) ?? 0;

  // 문자열/객체 형태 모두 대응
  const getImgUrl = (im) => (typeof im === 'string' ? im : im?.image_url || '');

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIdx, setViewerIdx] = useState(0);

  const dateText = useMemo(() => {
    if (!created) return '';
    try {
      const d = new Date(created);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}.${mm}.${dd}`;
    } catch {
      return created;
    }
  }, [created]);

  const showMeta = variant === true;
  const showLike = true;
  const canDelete = isOwner && isLoggedIn;

  const handleToggleLike = () => {
    if (!isLoggedIn || !onToggleLike) return;
    onToggleLike(id, !liked);
  };

  const handleDelete = () => {
    if (!isLoggedIn || !canDelete || !onDelete) return;
    onDelete(id);
  };

  // 라이트박스
  const openViewer = (idx = 0) => {
    setViewerIdx(idx);
    setViewerOpen(true);
  };
  const closeViewer = () => setViewerOpen(false);
  const next = () => setViewerIdx((i) => (i + 1) % images.length);
  const prev = () => setViewerIdx((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen, images.length]);

  return (
    <Card variant={variant} aria-label="venue-review-card">
      {canDelete && (
        <DeleteBtn
          type="button"
          aria-label="리뷰 삭제"
          title="리뷰 삭제"
          onClick={handleDelete}
        >
          x
        </DeleteBtn>
      )}

      {/* 1) 이미지(가로) */}
      {images?.length > 0 && (
        <ThumbRow>
          {images.slice(0, 3).map((img, idx) => {
            const url = getImgUrl(img);
            return (
              <ThumbItem
                key={idx}
                loading="lazy"
                src={url}
                alt={`리뷰 이미지 ${idx + 1}`}
                onClick={() => openViewer(idx)}
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
              />
            );
          })}
          {images.length > 3 && (
            <MoreBtn onClick={() => openViewer(3)}>+{images.length - 3} 더보기</MoreBtn>
          )}
        </ThumbRow>
      )}

      {/* 2) 본문 */}
      <BodyText variant={variant}>{content}</BodyText>

      {/* 3) 메타 (닉네임 옆에 공연장칩 → 날짜) */}
      <MetaBar>
       <MetaLeft>
  <Avatar
    src={user?.profile_url || 'src/assets/icons/icon_b_my.svg'}
    alt={`${user?.nickname || '사용자'} 프로필 이미지`}
    onError={(e) => { e.currentTarget.src = 'src/assets/icons/icon_b_my.svg'; }}
  />
  <MetaName>{user?.nickname || '익명'}</MetaName>

  {venue?.id && (
    <>
      <Dot />
      <VenueInline
       to={`/venue/${venue.id}`}
       aria-label={`${venue.name} 상세로 이동`}
       title={venue.name}
     >
       <VenueLogo
         src={venue.logo_url || '/logo192.png'}
         alt={`${venue.name || '공연장'} 로고`}
         onError={(e)=>{ e.currentTarget.src='/logo192.png'; }}
       />
       <VenueName>{venue.name}</VenueName>
     </VenueInline>
    </>
  )}

  <Dot />
  <MetaDate dateTime={created ?? undefined}>{dateText}</MetaDate>
</MetaLeft>


        {showLike && (
          <LikeBtn
            type="button"
            onClick={handleToggleLike}
            active={!!liked}
            aria-pressed={!!liked}
            aria-disabled={!isLoggedIn}
            $disabled={!isLoggedIn}
            disabled={!isLoggedIn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={liked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
            </svg>
            <span>{count}</span>
          </LikeBtn>
        )}
      </MetaBar>

      {/* 라이트박스 */}
      {viewerOpen && images?.length > 0 && (
        <Lightbox onClick={closeViewer}>
          <ViewerImg
            src={getImgUrl(images[viewerIdx])}
            alt={`리뷰 이미지 ${viewerIdx + 1}/${images.length}`}
            onClick={(e) => e.stopPropagation()}
          />
          <CloseBtn onClick={closeViewer} aria-label="닫기">
            ×
          </CloseBtn>
          {images.length > 1 && (
            <>
              <NavBtn
                $left
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="이전"
              >
                ‹
              </NavBtn>
              <NavBtn
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="다음"
              >
                ›
              </NavBtn>
            </>
          )}
        </Lightbox>
      )}
    </Card>
  );
}
