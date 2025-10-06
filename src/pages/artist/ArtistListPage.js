// src/pages/artist/ArtistListPage.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import ArtistListCardLike from '../../components/artist/ArtistListCardLike.js';
import { fetchArtistList } from '../../api/artistApi';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 20;

export default function ArtistListPage() {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);   
  const sentinelRef = useRef(null);
  const navigate = useNavigate();
  const seenIds = useRef(new Set());          

  const load = useCallback(async (nextPage) => {
  if (loading || done) return;
  setLoading(true);

  const { artists: chunk, totalPages: tp } =
    await fetchArtistList({ page: nextPage, size: PAGE_SIZE });

  setTotalPages(tp ?? 1);

  // 중복 방지해서 추가
  const deduped = chunk.filter(a => {
    if (!a?.id || seenIds.current.has(a.id)) return false;
    seenIds.current.add(a.id);
    return true;
  });

  // ✅ 이름으로 정렬 추가
  const sorted = deduped.sort((a, b) => {
  const nameA = a?.name || '';
  const nameB = b?.name || '';
  
  // 한글 여부 체크 (ㄱ-ㅎ, ㅏ-ㅣ, 가-힣)
  const isKoreanA = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(nameA);
  const isKoreanB = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(nameB);
  
  // 둘 다 한글이거나 둘 다 아니면 일반 정렬
  if (isKoreanA === isKoreanB) {
    return nameA.localeCompare(nameB, 'ko-KR');
  }
  
  // 한글이 먼저 오도록
  return isKoreanA ? -1 : 1;
});

  setArtists(prev => [...prev, ...sorted]);
  setLoading(false);

  // 마지막 페이지 판단
  if (nextPage >= (tp ?? 1) || sorted.length === 0) {
    setDone(true);
  }
}, [loading, done]);

  // 최초 로드
  useEffect(() => {
    load(1);
  }, [load]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      const [ent] = entries;
      if (ent.isIntersecting && !loading && !done) {
        const next = page + 1;
        setPage(next);
        load(next);
      }
    }, { rootMargin: '600px 0px' }); // 미리 당겨 로드

    io.observe(node);
    return () => io.disconnect();
  }, [page, load, loading, done]);

  return (
    <PageWrapper>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <div style={{ height: "16px" }} />
      <ScrollableList>
        <Container>
          {artists.map((artist) => (
            <CardWrapper
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.id}`)}>
              <ArtistListCardLike artist={artist} />
            </CardWrapper>
          ))}

          {/* 로딩/끝 표시 + 관찰용 센티넬 */}
          {!done && <Loader>불러오는 중…</Loader>}
          <Sentinel ref={sentinelRef} />
        </Container>
      </ScrollableList>
    </PageWrapper>
  );
}

const Container = styled.div`display:flex; flex-direction:column;`;
const CardWrapper = styled.div`cursor:pointer; caret-color:transparent;`;
const Loader = styled.div`text-align:center; padding:16px; color:#999;`;
const End = styled.div`text-align:center; padding:16px; color:#bbb;`;
const Empty = styled.div`padding:24px; text-align:center;`;
const Sentinel = styled.div`height:1px;`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ScrollableList = styled.div`
  margin-top: 16px;
  margin-bottom: 125px;
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; 
  }

  -ms-overflow-style: none; 
  scrollbar-width: none;
`;