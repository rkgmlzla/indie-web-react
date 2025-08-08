// ✅ src/pages/venue/ListVenue.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import VenueItem from './components/VenueItem';
import RegionSelectButton from './components/RegionSelectButton';
import RegionSelectSheet from './components/RegionSelectSheet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// ✅ 공연장 목록 API import
import { fetchVenueList } from '../../api/venueApi';

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
  const [venues, setVenues] = useState([]); // ✅ API 데이터 상태
  const [page, setPage] = useState(1);
  const size = 20;

  // ✅ API 호출 함수 (수정됨)
  const loadVenues = async () => {
    try {
      // ✅ '전체'가 포함되면 regionParam은 undefined → 서버에서 전체 조회
      const regionParam = selectedRegions.includes('전체')
        ? undefined
        : selectedRegions;

      // ✅ 수정된 fetchVenueList에 배열 그대로 전달
      const data = await fetchVenueList({ page, size, region: regionParam });

      console.log('🎯 [공연장 목록] API 응답:', data);
      setVenues(data.content || data); // ✅ 백엔드 응답 구조에 맞게 세팅
    } catch (err) {
      console.error('📛 공연장 목록 API 호출 실패:', err);
      setVenues([]);
    }
  };

  // ✅ 페이지 로드 & 지역 변경 시 API 호출
  useEffect(() => {
    loadVenues();
  }, [selectedRegions, page]);

  // ✅ 지역 선택 핸들러
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
      <div style={{ height: '30px' }} />
      <RegionSelectButton
        onClick={() => setIsSheetOpen(true)}
        selectedRegions={selectedRegions}
      />
      <Divider mt="16px" />

      {/* ✅ 공연장 목록 렌더링 */}
      <ScrollableList>
        {venues
          .filter((venue) => !!venue.id) // ✅ id가 있는 항목만 렌더링
          .map((venue) => (
            <VenueItem
              key={venue.id}
              image={venue.image_url}
              name={venue.name}
              onClick={() => navigate(`/venue/${venue.id}`)}
            />
          ))}
      </ScrollableList>

      {/* ✅ 지역 선택 시트 */}
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
