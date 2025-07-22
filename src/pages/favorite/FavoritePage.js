import React, { useState } from 'react';
import styled from 'styled-components';
import { performanceSampleData } from '../../data/performanceSampleData';
import { artistSampleData } from '../../data/artistSampleData';
import PerformanceListCard from '../../components/performance/PerformanceListCard';
import ArtistListCard from '../../components/artist/ArtistListCard';
import HeartButton from '../../components/common/HeartButton';
import NotifyButton from '../../components/common/NotifyButton';

export default function FavoritePage() {
    const [selectedTab, setSelectedTab] = useState('performance');

    const [likedPerformances, setLikedPerformances] = useState(
        performanceSampleData.filter((p) => p.isLiked)
    );
    const [likedArtists, setLikedArtists] = useState(
        artistSampleData.filter((a) => a.isLiked)
    );

    const togglePerformanceLike = (id) => {
        setLikedPerformances((prev) => prev.filter((p) => p.id !== id));
    };

    const toggleArtistLike = (id) => {
        setLikedArtists((prev) => prev.filter((a) => a.id !== id));
    };

  return (
    <Container>
      <TabRow>
        <TabButton
          active={selectedTab === 'performance'}
          onClick={() => setSelectedTab('performance')}
        >
          공연
        </TabButton>
        <TabButton
          active={selectedTab === 'artist'}
          onClick={() => setSelectedTab('artist')}
        >
          아티스트
        </TabButton>
      </TabRow>

      <List>
        {selectedTab === 'performance' &&
          likedPerformances.map((performance) => (
            <PerformanceListCard
              key={performance.id}
              performance={performance}
              onToggleLike={togglePerformanceLike}
            />
          ))}

        {selectedTab === 'artist' &&
          likedArtists.map((artist) => (
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
  color: ${({ active, theme }) => (active ? theme.colors.textRed : theme.colors.darkGray)};
  border: none;
  border-bottom: ${({ active, theme }) => (active ? `1.5px solid ${theme.colors.textRed}` : 'none')};
  background-color: transparent;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`
