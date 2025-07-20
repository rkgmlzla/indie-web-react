// /pages/performance/PerformanceListPage.js
import React from 'react';
import styled from 'styled-components';
import PerformanceCardHorizontal from '../../components/performance/PerformanceCardHorizontal';
import { performancesSampleData } from '../../data/performanceSampleData';
import FilterButton from '../../components/common/FilterButton';
import CalendarIcon from '../../assets/icons/icon_calendar.svg';

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

// const FilterButton = styled.button`
//   padding: 6px 12px;
//   border: none;
//   border-radius: 4px;
//   background-color: ${({ theme }) => theme.colors.outlineGray};
//   font-size: ${({ theme }) => theme.fontSizes.sm};
// `;

const CalendarIconButton = styled.button`
    width: 2rem;
    height: 2rem;
    background-color: ${({ theme }) => theme.colors.outlineGray};
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
    content: '';
    display: inline-block;
    background-image: url(${CalendarIcon});
    background-size: 100% 100%;
    width: 1rem;
    height: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.outlineGray};
  width: 100%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PerformanceListPage() {
  const handleSortClick = () => {
    // TODO: 정렬 모달 or 드롭다운 열기
    console.log('정렬 버튼 클릭');
  };

  const handleRegionClick = () => {
    // TODO: 지역 필터 모달 or 드롭다운 열기
    console.log('지역 버튼 클릭');
  };

  return (
    <Container>
      {/* 공통 헤더 자리 */}
      <FilterBar>
        <FilterGroup>
          <div style={{ display: 'flex', gap: '8px' }}>
            <FilterButton onClick={handleSortClick}>최근등록순</FilterButton>
            <FilterButton onClick={handleRegionClick}>지역 전체</FilterButton>
          </div>
        </FilterGroup>
        <CalendarIconButton/>
      </FilterBar>
      <Divider />
      <List>
        {performancesSampleData.map((p) => (
          <PerformanceCardHorizontal key={p.id} performance={p} />
        ))}
      </List>
    </Container>
  );
}
