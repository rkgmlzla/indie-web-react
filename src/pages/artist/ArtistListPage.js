// src/pages/artist/ArtistListPage.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
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

  // ✅ 아티스트 데이터 로드 함수
  const loadArtists = async (append = false) => {
    try {
      const { artists: chunk, totalPages: tp } = await fetchArtistList({
        page,
        size: PAGE_SIZE,
      });

      const list = Array.isArray(chunk) ? chunk : [];

      if (append) {
        setArtists((prev) => [...prev, ...list]);
      } else {
        setArtists(list);
      }

      if (list.length < PAGE_SIZE) setHasMore(false);
      else setHasMore(true);

      console.log('🎯 [아티스트 목록] 최종 리스트:', list);
    } catch (err) {
      console.error('📛 아티스트 목록 API 호출 실패:', err);
      setArtists([]);
    }
  };

  // ✅ 최초 로드 및 페이지 변경 시 호출
  useEffect(() => {
    loadArtists(page > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <Spacer />
      <Container>
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
      </Container>
    </>
  );
}

const Spacer = styled.div`height:56px;`;
const Container = styled.div`
  display:flex;
  flex-direction:column;
  padding-bottom:120px; /* ✅ 언더바 겹침 방지 */
`;
const CardWrapper = styled.div`cursor:pointer; caret-color:transparent;`;
const Loader = styled.div`text-align:center; padding:16px; color:#999;`;
const End = styled.div`text-align:center; padding:16px; color:#bbb;`;
const Empty = styled.div`padding:24px; text-align:center;`;
const Sentinel = styled.div`height:1px;`;

const MoreButton = styled.button`
  width: 100%;
  height: 48px;
  margin: 16px 0;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.darkGray}; /* ✅ #4B4B4B */
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 8px; /* ✅ 둥근 모서리 */
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;
