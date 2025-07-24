// src/pages/venue/ListVenue.jsx
import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import VenueItem from './components/VenueItem'
import RegionSelectButton from './components/RegionSelectButton';
import RegionSelectSheet from './components/RegionSelectSheet';
import sampleVenueImage1 from '../../assets/sampleVenueItem1.jpg';
import sampleVenueImage2 from '../../assets/sampleVenueItem2.png';
import sampleVenueImage3 from '../../assets/sampleVenueItem3.jpg';

import styled from 'styled-components';

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FixedHeaderArea = styled.div`
  flex-shrink: 0;
  position: relative;
`;

const ScrollableList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

function ListVenue() {
  const venues = [
  { id: 1, name: '홍대 언플러그드', image: sampleVenueImage1 },
  { id: 2, name: '어어어어어어어어어어어어어어엄청 긴 이르으으으으으으으으으으으음', image: sampleVenueImage2 },
  { id: 3, name: '제비다방', image: sampleVenueImage3 },
  { id: 4, name: '스튜디오 산보', image: sampleVenueImage2 },
  { id: 5, name: '홍대 언플러그드', image: sampleVenueImage1 },
  { id: 6, name: '성수 언플러그드', image: sampleVenueImage1 },
  { id: 7, name: '인천 언플러그드', image: sampleVenueImage1 },
  { id: 8, name: '강남 언플러그드', image: sampleVenueImage1 },
  { id: 9, name: '이태원 언플러그드', image: sampleVenueImage1 },
  { id: 10, name: '용산 언플러그드', image: sampleVenueImage1 },
  { id: 11, name: '부산 언플러그드', image: sampleVenueImage1 },
  { id: 12, name: '대구 언플러그드', image: sampleVenueImage1 },
  { id: 13, name: '울릉도 언플러그드', image: sampleVenueImage1 },
  { id: 14, name: '제주도 언플러그드', image: sampleVenueImage1 },
  { id: 15, name: '양산 언플러그드', image: sampleVenueImage1 },
  // ...
];

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState(['전체']);

  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  const handleSelectRegion = (region) => {
    if (region === '전체') {
      setSelectedRegions(['전체']);
    } else {
      const alreadySelected = selectedRegions.includes(region);
      let updated;

      if (alreadySelected) {
        updated = selectedRegions.filter((r) => r !== region);
        if (updated.length === 0) updated = ['전체'];
      } else {
        updated = selectedRegions
          .filter((r) => r !== '전체')
          .concat(region);
      }

      setSelectedRegions(updated);
    }
  };

  return (
    <PageWrapper>
      <FixedHeaderArea>
        <Header title="공연장" />
        <RegionSelectButton onClick={toggleSheet} />
        <Divider mt="16px" />
      </FixedHeaderArea>

      <ScrollableList>
        {venues.map((venue) => (
          <VenueItem key={venue.id} image={venue.image} name={venue.name} />
        ))}
      </ScrollableList>

      {isSheetOpen && (
        <RegionSelectSheet
          selectedRegions={selectedRegions}
          onSelectRegion={handleSelectRegion}
          onClose={() => setIsSheetOpen(false)}
        />
      )}
    </PageWrapper>
  );
}

export default ListVenue;
