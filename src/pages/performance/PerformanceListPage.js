import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/layout/Header';
import PerformanceListCard from '../../components/performance/PerformanceListCard';
import FilterButton from '../../components/common/FilterButton';
import CalendarIcon from '../../assets/icons/icon_calendar.svg';
import SortModal from '../../components/modals/SortModal';
import RegionModal from '../../components/modals/RegionModal';
import Divider from '../../components/common/Divider';
import { fetchPerformances } from '../../api/performanceApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CalendarIconButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &::after {
    content: '';
    background-image: url(${CalendarIcon});
    background-size: 100% 100%;
    width: 1rem;
    height: 1rem;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PerformanceListPage() {
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState('latest');
  const [selectedRegions, setSelectedRegions] = useState(['전체']);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const [performances, setPerformances] = useState([]);
  const [page, setPage] = useState(1);
  const size = 20;

  const loadPerformances = async () => {
    try {
      const sortMapping = { latest: 'created_at', popular: 'likes', date: 'date' };
const sortParam = sortMapping[sortOption] || 'created_at';
const regionParam = selectedRegions.includes('전체') ? undefined : selectedRegions;

      const data = await fetchPerformances({ region: regionParam, sort: sortParam, page, size });

      console.log('🎯 [공연 목록] API 응답:', data);
      setPerformances(data); // ✅ 배열 그대로 세팅
    } catch (err) {
      console.error('📛 공연 목록 API 호출 실패:', err.response?.data || err.message);
      setPerformances([]);
    }
  };

  useEffect(() => {
    loadPerformances();
  }, [sortOption, selectedRegions, page]);

  return (
    <>
      <Header title="공연" />
      <div style={{ height: '56px' }} />
      <Container>
        <FilterBar>
          <FilterGroup>
            <FilterButton onClick={() => setIsSortModalOpen(true)}>
              {sortOption === 'latest' ? '최근등록순' : '인기순'}
            </FilterButton>
            <FilterButton onClick={() => setIsRegionModalOpen(true)}>
              {selectedRegions[0] === '전체' ? '지역 전체' : `지역: ${selectedRegions.join(', ')}`}
            </FilterButton>
          </FilterGroup>
          <CalendarIconButton onClick={() => navigate('/calendar')} />
        </FilterBar>

        <Divider />

        <List>
          {performances.length > 0 ? (
            performances.map((p) => (
              <PerformanceListCard key={p.id} performance={p} onClick={() => navigate(`/performance/${p.id}`)} />
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '20px' }}>공연이 없습니다.</p>
          )}
        </List>

        {isSortModalOpen && (
          <ModalBackground onClick={() => setIsSortModalOpen(false)}>
            <SortModal selected={sortOption} onSelect={setSortOption} onClose={() => setIsSortModalOpen(false)} />
          </ModalBackground>
        )}
        {isRegionModalOpen && (
          <ModalBackground onClick={() => setIsRegionModalOpen(false)}>
            <RegionModal selected={selectedRegions} onChange={setSelectedRegions} onClose={() => setIsRegionModalOpen(false)} />
          </ModalBackground>
        )}
      </Container>
    </>
  );
}
