// src/components/performance/PerformanceTitleDateCard.jsx
import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

function toAbs(url) {
  if (!url) return '';
  const s = String(url).trim().replace(/^"+|"+$/g, '');
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
  if (s.startsWith('/')) return `${window.location.origin}${s}`;
  return `${window.location.origin}/${s}`;
}

function pickPoster(p) {
  return (
    p?.posterUrl ||
    p?.poster_url ||
    p?.thumbnail ||
    p?.image ||
    p?.image_url ||
    ''
  );
}

export default function PerformanceTitleDateCard({ performance, onClick }) {
  const rawPoster = pickPoster(performance);
  const posterSrc = toAbs(rawPoster);

  return (
    <Card onClick={onClick}>
      <Poster
        src={posterSrc || undefined}
        alt={performance?.title || 'poster'}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // 깨진 이미지 아이콘 방지: 투명 1px로 대체
          e.currentTarget.src =
            'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
        }}
      />
      <Title>{performance?.title}</Title>
      <Date>{dayjs(performance?.date || performance?.start_at).format('YYYY-MM-DD')}</Date>
    </Card>
  );
}

const Card = styled.div`
  width: 5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  height: 6.75rem;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.2;
  max-height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.lightGray};
`;
