// src/pages/map/components/MapWideSelectCard.jsx
import React from 'react';
import styled from 'styled-components';
import MapWideCard from './MapWideCard';

const Wrapper = styled.div`
  width: calc(100% - 32px); // ✅ 제대로 된 CSS 계산식
  max-width: 100%;
  border-radius: 13px;
  box-sizing: border-box;
  caret-color: transparent;
  cursor: default;
`;

const MapWideSelectCard = ({
  title,
  time,
  name,
  address,
  poster,
  nextPerformance,
  upcomingPerformance,
  venue_id,
}) => {
  return (
    <Wrapper>
      <MapWideCard
        data={{
          id: venue_id,
          name,
          address,
          upcomingPerformance: Array.isArray(upcomingPerformance)
            ? upcomingPerformance.filter(Boolean)
            : [],
          image_url: poster,
        }}
        noTopPadding
      />
    </Wrapper>
  );
};

export default MapWideSelectCard;
