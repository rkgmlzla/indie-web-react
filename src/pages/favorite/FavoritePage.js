import React, { useState } from 'react';
import styled from 'styled-components';
import { performanceSampleData } from '../../data/performanceSampleData';
import { artistSampleData } from '../../data/artistSampleData';
import PerformanceListCard from '../../components/performance/PerformanceListCard';
import ArtistListCard from '../../components/artist/ArtistListCard';
import HeartButton from '../../components/common/HeartButton';
import NotifyButton from '../../components/common/NotifyButton';
import Header from '../../components/layout/Header';
import { userartistfavSampleData } from '../../data/userartistfavSampleData';
import { userperformancefavSampleData } from '../../data/userperformancefavSampleData';

export default function FavoritePage() {
  const userId = 1;
  const [selectedTab, setSelectedTab] = useState('performance');

  const likedPerformances = performanceSampleData
    .filter((p) =>
      userperformancefavSampleData.some(
        (f) => f.user_id === userId && f.performance_id === p.id
      )
    )
    .map((p) => ({ ...p, isLiked: true }));

  const likedArtists = artistSampleData
    .filter((a) =>
      userartistfavSampleData.some(
        (f) => f.user_id === userId && f.artist_id === a.id
      )
    )
    .map((a) => ({ ...a, isLiked: true }));

  const [likedPerformanceIds, setLikedPerformanceIds] = useState(
    likedPerformances.map((p) => p.id)
  );

  const [likedArtistIds, setLikedArtistIds] = useState(
    likedArtists.map((a) => a.id)
  );

  const togglePerformanceLike = (id) => {
    setLikedPerformanceIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleArtistLike = (id) => {
    setLikedArtistIds((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };
  return (
    <Container>
      <Header title="찜 목록" />

      {/* ✅ 헤더 영역 높이 확보 */}
      <div style={{ height: '30px' }} />
      <TabRow>
        <TabButton
          active={selectedTab === 'performance'}
          onClick={() => setSelectedTab('performance')}>
          공연
        </TabButton>
        <TabButton
          active={selectedTab === 'artist'}
          onClick={() => setSelectedTab('artist')}>
          아티스트
        </TabButton>
      </TabRow>

      <List>
        {selectedTab === 'performance' &&
          likedPerformances
            .filter((p) => likedPerformanceIds.includes(p.id))
            .map((performance) => (
              <PerformanceListCard
                key={performance.id}
                performance={performance}
                onToggleLike={togglePerformanceLike}
              />
            ))}

        {selectedTab === 'artist' &&
          likedArtists
            .filter((a) => likedArtistIds.includes(a.id))
            .map((artist) => (
              <ArtistListCard
                key={artist.id}
                artist={artist}
                onToggleLike={toggleArtistLike}
              />
            ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabRow = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineGray};
  margin-bottom: 0.5rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ active, theme }) =>
    active ? theme.colors.textRed : theme.colors.darkGray};
  border: none;
  border-bottom: ${({ active, theme }) =>
    active ? `1.5px solid ${theme.colors.textRed}` : 'none'};
  background-color: transparent;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;
