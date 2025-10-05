// ✅ src/pages/artist/ArtistListPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import ArtistListCardLikeOnly from '../../components/artist/ArtistListCardLike.js';
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
      <Spacer />

      {/* ✅ 스크롤 가능한 영역 추가 */}
      <ScrollableList>
        {artists.length > 0 ? (
          <>
            {artists.map((artist) => (
              <CardWrapper
                key={artist.id}
                onClick={() => navigate(`/artist/${artist.id}`)}>
                <ArtistListCardLikeOnly artist={artist} />
              </CardWrapper>
            ))}
            {hasMore && (
              <MoreButton onClick={() => setPage((prev) => prev + 1)}>
                더보기
              </MoreButton>
            )}
          </>
        ) : (
          <Empty>해당되는 아티스트가 없습니다.</Empty>
        )}
      </ScrollableList>
    </PageWrapper>
  );
}

const Spacer = styled.div`
  height: 56px;
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* ✅ 공연장 페이지에서 가져온 ScrollableList 스타일 */
const ScrollableList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 120px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  margin: 16px 0;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;
