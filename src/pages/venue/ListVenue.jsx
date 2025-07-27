// src/pages/venue/ListVenue.jsx
import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import VenueItem from './components/VenueItem';
import RegionSelectButton from './components/RegionSelectButton';
import RegionSelectSheet from './components/RegionSelectSheet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { venueSampleData } from '../../data/venueSampleData';
const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ScrollableList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

function ListVenue() {
  const navigate = useNavigate();

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
        updated = selectedRegions.filter((r) => r !== '전체').concat(region);
      }

      setSelectedRegions(updated);
    }
  };

  // ✅ 지역 필터링 적용
  const filteredVenues = venueSampleData.filter((venue) => {
    return (
      selectedRegions.includes('전체') || selectedRegions.includes(venue.region)
    );
  });

  return (
    <PageWrapper>
      <Header title="공연장" initialSearchTab="공연/공연장" />
      <div style={{ height: '30px' }} />
      <RegionSelectButton
        onClick={toggleSheet}
        selectedRegions={selectedRegions}
      />
      <Divider mt="16px" />

      <ScrollableList>
        {filteredVenues.map((venue) => (
          <VenueItem
            key={venue.id}
            image={venue.profileImg}
            name={venue.title}
            onClick={() => navigate(`/venue/${venue.id}`)}
          />
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
