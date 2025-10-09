// ✅ src/pages/artist/ArtistListPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import ArtistListCardLike from '../../components/artist/ArtistListCardLike.js';
import { fetchArtistList } from '../../api/artistApi';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 20;

export default function ArtistListPage() {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadArtists = async (append = false) => {
    try {
      const { artists: chunk } = await fetchArtistList({ page, size: PAGE_SIZE });
      const list = Array.isArray(chunk) ? chunk : [];

      if (append) setArtists((prev) => [...prev, ...list]);
      else setArtists(list);

      setHasMore(list.length >= PAGE_SIZE);
      console.log(`🎯 [아티스트 목록] page=${page}, count=${list.length}`, list);
    } catch (err) {
      console.error('📛 아티스트 목록 API 호출 실패:', err);
      setArtists([]);
    }
  };

  useEffect(() => {
    loadArtists(page > 1);
  }, [page]);

  return (
    <PageWrapper>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <div style={{ height: "16px" }} />
      <ScrollableList>
          {artists.length > 0 ? (
            <Container>
          {artists.map((artist) => (
            <CardWrapper
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.id}`)}>
              <ArtistListCardLike artist={artist} />
            </CardWrapper>
          ))}
            {hasMore && (
              <MoreButton onClick={() => setPage((prev) => prev + 1)}>
                더보기
              </MoreButton>
            )}
          </Container>
        ) : (
          <Empty>해당되는 아티스트가 없습니다.</Empty>
        )}
      </ScrollableList>
    </PageWrapper>
  );
}


const Container = styled.div`display:flex; flex-direction:column;`;

const PageWrapper = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const ScrollableList = styled.div`
  padding-top: 24px;
  margin-bottom: 109px;
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; 
  }

  -ms-overflow-style: none; 
  scrollbar-width: none;

  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  caret-color: transparent;
`;

const Empty = styled.div`
  padding: 24px;
  text-align: center;
`;

const MoreButton = styled.button`
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
`;