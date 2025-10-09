// ✅ src/pages/venue/ListVenue.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import VenueItem from './components/VenueItem';
import RegionSelectButton from './components/RegionSelectButton';
import RegionSelectSheet from './components/RegionSelectSheet';
import { useNavigate } from 'react-router-dom';
import { fetchVenueList } from '../../api/venueApi'; 

function ListVenue() {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState(['전체']);
  const [venues, setVenues] = useState([]); // ✅ 공연장 리스트 상태
  const [page, setPage] = useState(1);
  const size = 20;

  // ✅ API 호출 함수
  const loadVenues = async () => {
    try {

      const regionParam = selectedRegions.includes('전체') ? undefined : selectedRegions;

      const data = await fetchVenueList({ page, size, region: regionParam });

      console.log('🎯 [공연장 목록] API 응답:', data);

      // ✅ 응답이 undefined/null일 경우 대비
      const venueList = Array.isArray(data?.content)
        ? data.content
        : Array.isArray(data)
        ? data
        : [];

      setVenues(venueList);
    } catch (err) {
      console.error('📛 공연장 목록 API 호출 실패:', err);
      setVenues([]);
    }
  };

  useEffect(() => {
    loadVenues();
  }, [selectedRegions, page]);

  const handleSelectRegion = (region) => {
    if (region === '전체') {
      setSelectedRegions(['전체']);
    } else {
      const alreadySelected = selectedRegions.includes(region);
      let updated = alreadySelected
        ? selectedRegions.filter((r) => r !== region)
        : selectedRegions.filter((r) => r !== '전체').concat(region);
      if (updated.length === 0) updated = ['전체'];
      setSelectedRegions(updated);
    }
  };

  return (
    <PageWrapper>
      <Header title="공연장" initialSearchTab="공연/공연장" />
      <div style={{ height: '16px' }} />

      <RegionSelectButton onClick={() => setIsSheetOpen(true)} selectedRegions={selectedRegions} />
      <ScrollableList>
        {Array.isArray(venues) && venues.length > 0 ? (
          venues.map((venue) => (
            <VenueItem
              key={venue.id}
              image={venue.image_url}
              name={venue.name}
              onClick={() => navigate(`/venue/${venue.id}`)}
            />
          ))
        ) : (
          <EmptyMessage>해당되는 공연장이 없습니다.</EmptyMessage>
        )}
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

const PageWrapper = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const ScrollableList = styled.div`
  padding-bottom: 109px;
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

const EmptyMessage = styled.div`
padding: 16px 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  display: flex;
  justify-content: center; 
  align-items: center;  
`;