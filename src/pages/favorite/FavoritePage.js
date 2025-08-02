// src/pages/favorite/FavoritePage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import PerformanceListCard from '../../components/performance/PerformanceListCard';
import ArtistListCard from '../../components/artist/ArtistListCard';
import { fetchLikedPerformances, fetchLikedArtists } from '../../api/likeApi';
import { likePerformance, unlikePerformance } from '../../api/likeApi';
import { likeArtist, unlikeArtist } from '../../api/likeApi';

export default function FavoritePage() {
  const [selectedTab, setSelectedTab] = useState('performance');
  const [likedPerformances, setLikedPerformances] = useState([]);
  const [likedArtists, setLikedArtists] = useState([]);
  const authToken = localStorage.getItem('accessToken'); // 🔹 토큰 가져오기

  // ✅ 찜한 공연 목록 API 호출
  useEffect(() => {
    const loadLikedPerformances = async () => {
      try {
        const data = await fetchLikedPerformances(1, 20, authToken);
        setLikedPerformances(data);
        console.log('🎯 찜한 공연 목록:', data);
      } catch (err) {
        console.error('📛 찜한 공연 목록 로딩 실패:', err);
      }
    };
    loadLikedPerformances();
  }, [authToken]);

  // ✅ 찜한 아티스트 목록 API 호출
  useEffect(() => {
    const loadLikedArtists = async () => {
      try {
        const data = await fetchLikedArtists({ page: 1, size: 20, authToken });
        setLikedArtists(data);
        console.log('🎯 찜한 아티스트 목록:', data);
      } catch (err) {
        console.error('📛 찜한 아티스트 목록 로딩 실패:', err);
      }
    };
    loadLikedArtists();
  }, [authToken]);

  // ✅ 공연 찜 토글
  const togglePerformanceLike = async (id, isLiked) => {
    try {
      if (isLiked) {
        await unlikePerformance(id, authToken);
        setLikedPerformances(prev => prev.filter(p => p.id !== id));
      } else {
        await likePerformance(id, authToken);
      }
    } catch (err) {
      console.error('📛 공연 찜 토글 실패:', err);
    }
  };

  // ✅ 아티스트 찜 토글
  const toggleArtistLike = async (id, isLiked) => {
    try {
      if (isLiked) {
        await unlikeArtist(id, authToken);
        setLikedArtists(prev => prev.filter(a => a.id !== id));
      } else {
        await likeArtist(id, authToken);
      }
    } catch (err) {
      console.error('📛 아티스트 찜 토글 실패:', err);
    }
  };

  return (
    <Container>
      <Header title="찜 목록" />
      <div style={{ height: '30px' }} />

      <TabRow>
        <TabButton active={selectedTab === 'performance'} onClick={() => setSelectedTab('performance')}>공연</TabButton>
        <TabButton active={selectedTab === 'artist'} onClick={() => setSelectedTab('artist')}>아티스트</TabButton>
      </TabRow>

      <List>
        {selectedTab === 'performance' &&
          likedPerformances.map(performance => (
            <PerformanceListCard
              key={performance.id}
              performance={performance}
              onToggleLike={(id) => togglePerformanceLike(id, performance.isLiked)}
            />
          ))}

        {selectedTab === 'artist' &&
          likedArtists.map(artist => (
            <ArtistListCard
              key={artist.id}
              artist={artist}
              onToggleLike={(id) => toggleArtistLike(id, artist.isLiked)}
            />
          ))}
      </List>
    </Container>
  );
}

// ✅ 스타일 유지
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
`;
