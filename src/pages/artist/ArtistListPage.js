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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);    // 더 불러올 게 없으면 true
  const sentinelRef = useRef(null);
  const navigate = useNavigate();
  const seenIds = useRef(new Set());          // 중복 방지

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

    setArtists(prev => [...prev, ...deduped]);
    setLoading(false);

    // 마지막 페이지 판단
    if (nextPage >= (tp ?? 1) || deduped.length === 0) {
      setDone(true);
    }
  }, [loading, done]);

  // 최초 로드
  useEffect(() => {
    load(1);
  }, [load]);

  // 인터섹션 옵저버: 바닥(sentinel) 보이면 다음 페이지 로드
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
    <>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <Spacer />
      <Container>
        {artists.map((artist) => (
          <CardWrapper
            key={artist.id}
            onClick={() => navigate(`/artist/${artist.id}`)}>
            <ArtistListCardLikeOnly artist={artist} />
          </CardWrapper>
        ))}

        {/* 로딩/끝 표시 + 관찰용 센티넬 */}
        {!done && <Loader>불러오는 중…</Loader>}
        <Sentinel ref={sentinelRef} />
        {done && artists.length === 0 && <Empty>아티스트가 없어요.</Empty>}
        {done && artists.length > 0 && <End>끝까지 봤어요 👋</End>}
      </Container>
    </>
  );
}

const Spacer = styled.div`height:56px;`;
const Container = styled.div`display:flex; flex-direction:column;`;
const CardWrapper = styled.div`cursor:pointer; caret-color:transparent;`;
const Loader = styled.div`text-align:center; padding:16px; color:#999;`;
const End = styled.div`text-align:center; padding:16px; color:#bbb;`;
const Empty = styled.div`padding:24px; text-align:center;`;
const Sentinel = styled.div`height:1px;`;
