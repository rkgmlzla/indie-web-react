// ✅ components/artist/ArtistListCard.js
import React from 'react';
import styled from 'styled-components';
import ArtistProfileCard from './ArtistProfileCard';

export default function ArtistListCard({ artist }) {
  if (!artist) return null;

  return (
    <CardContainer>
      <ArtistProfileCard artist={artist} />
      <Info>
        <Name>{artist?.name || '이름 없음'}</Name>
        {/* 🔹 필요 시 추가 정보 표시 */}
      </Info>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const Info = styled.div`
  margin-left: 1rem;
  flex: 1;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
