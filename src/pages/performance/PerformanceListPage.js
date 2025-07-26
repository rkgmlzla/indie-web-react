// /pages/performance/PerformanceListPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/layout/Header';
import PerformanceListCard from '../../components/performance/PerformanceListCard';
import { performanceSampleData } from '../../data/performanceSampleData';
import FilterButton from '../../components/common/FilterButton';
import CalendarIcon from '../../assets/icons/icon_calendar.svg';
import SortModal from '../../components/modals/SortModal';
import RegionModal from '../../components/modals/RegionModal';
import Divider from '../../components/common/Divider';
import sortPerformances from '../../utils/sortPerformances';
import filterByRegion from '../../utils/filterByRegion';

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
        display: inline-block;
        background-image: url(${CalendarIcon});
        background-size: 100% 100%;
        width: 1rem;
        height: 1rem;
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

  const [sortOption, setSortOption] = useState('최근등록순');
  const [selectedRegions, setSelectedRegions] = useState(['전체']);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [filteredAndSorted, setFilteredAndSorted] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const updateFilteredAndSorted = (sortOption, selectedRegions) => {
    const filtered = filterByRegion(performanceSampleData, selectedRegions);
    const sorted = sortPerformances(filtered, sortOption);
    setFilteredAndSorted(sorted);
  };

  useEffect(() => {
    updateFilteredAndSorted(sortOption, selectedRegions);
  }, [sortOption, selectedRegions]);

  return (
    <>
      <Header title="공연" />
      <div style={{ height: '56px' }} />
      <Container>
        <FilterBar>
          <FilterGroup>
            <div style={{ display: 'flex', gap: '8px' }}>
              <FilterButton onClick={() => setIsSortModalOpen(true)}>
                {sortOption}
              </FilterButton>
              <FilterButton onClick={() => setIsRegionModalOpen(true)}>
                {selectedRegions.length === 1 && selectedRegions[0] === '전체'
                  ? '지역 전체'
                  : `지역: ${selectedRegions.slice(0, 2).join(', ')}${
                      selectedRegions.length > 2
                        ? ` 외 ${selectedRegions.length - 2}곳`
                        : ''
                    }`}
              </FilterButton>
            </div>
          </FilterGroup>
          <CalendarIconButton onClick={handleCalendarClick} />
        </FilterBar>
        <Divider />
        <List>
          {filteredAndSorted.map((p) => (
            <PerformanceListCard key={p.id} performance={p} />
          ))}
        </List>

        {isSortModalOpen && (
          <ModalBackground onClick={() => setIsSortModalOpen(false)}>
            <SortModal
              selected={sortOption}
              onSelect={setSortOption}
              onClose={() => setIsSortModalOpen(false)}
              onClick={(e) => e.stopPropagation()}
            />
          </ModalBackground>
        )}
        {isRegionModalOpen && (
          <ModalBackground onClick={() => setIsRegionModalOpen(false)}>
            <RegionModal
              selected={selectedRegions}
              onChange={setSelectedRegions}
              onClose={() => setIsRegionModalOpen(false)}
              onClick={(e) => e.stopPropagation()}
            />
          </ModalBackground>
        )}
      </Container>
    </>
  );
}
