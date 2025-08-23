import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import ArtistListCardLikeOnly from '../../components/artist/ArtistListCardLike.js'; // ✅ 변경된 카드 컴포넌트 (.js 명시)
import { fetchArtistList } from '../../api/artistApi';
import { useNavigate } from 'react-router-dom';

export default function ArtistListPage() {
  const [artists, setArtists] = useState([]);
  const [page] = useState(1);
  const size = 20;
  const navigate = useNavigate();

  // ✅ 아티스트 목록 불러오기
  const loadArtists = async () => {
    try {
      const data = await fetchArtistList({ page, size });

      // ✅ API 응답 구조를 자동으로 판별
      const artistArray = Array.isArray(data) ? data : data?.artists ?? [];
      setArtists(artistArray);

      console.log('🎯 최종 artists 배열:', artistArray);
    } catch (err) {
      console.error('📛 아티스트 목록 API 실패:', err);
      setArtists([]);
    }
  };

  useEffect(() => {
    loadArtists();
  }, [page]);

  return (
    <>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <Spacer />
      <Container>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <CardWrapper
              key={artist.id}
              onClick={() => navigate(`/artist/${artist.id}`)} // ✅ 상세 페이지 이동
            >
              <ArtistListCardLikeOnly artist={artist} />
            </CardWrapper>
          ))
        ) : (
          <p>아티스트 데이터가 없습니다.</p>
        )}
      </Container>
    </>
  );
}

// ✅ 스타일
const Spacer = styled.div`
  height: 56px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  caret-color: transparent;
`;
