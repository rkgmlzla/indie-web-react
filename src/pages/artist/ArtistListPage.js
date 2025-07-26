import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../../components/layout/Header';
import ArtistListCard from '../../components/artist/ArtistListCard';
import { artistSampleData } from '../../data/artistSampleData';

export default function ArtistListPage() {
  const [artists, setArtists] = useState(artistSampleData);

  const toggleArtistLike = (id) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === id ? { ...artist, isLiked: !artist.isLiked } : artist
      )
    );
  };

  return (
    <>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <div style={{ height: '56px' }} />
      <Container>
        {artists.map((artist) => (
          <ArtistListCard
            key={artist.id}
            artist={artist}
            onToggleLike={toggleArtistLike}
          />
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
