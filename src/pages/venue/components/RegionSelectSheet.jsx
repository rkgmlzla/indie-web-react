// src/components/RegionSelectSheet.jsx
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(228, 228, 228, 0.8);
  z-index: 10;
`;

const Sheet = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #fff;
  border-radius: 12px 12px 0 0;
  z-index: 11;
  animation: slideUp 0.3s ease-out;
`;

const TitleWrapper = styled.div`
  height: 24px;
  padding-top: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.black};
`;

const RegionListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  column-gap: 20px;
  row-gap: 24px;
  padding: 0 16px 52px 16px;
  margin-top: 12px;
`;

const RegionButton = styled.button`
  height: 28px;
  width: 100%;
  border-radius: 14px;
  background-color: ${({ selected, theme }) =>
    selected ? 'rgba(241, 79, 33, 0.3)' : theme.colors.white};
  border: 1px solid
    ${({ selected, theme }) => (selected ? theme.colors.themeOrange : theme.colors.outlineGray)};
  color: ${({ selected, theme }) => (selected ? theme.colors.themeOrange : theme.colors.darkGray)};
  font-size: 14px;
  text-align: center;
  line-height: 28px;
`;

const regions = [
  '전체', '서울', '경기', '인천', '부산',
  '대구', '광주', '대전', '울산', '세종',
  '강원', '충청', '전라', '경상', '제주',
];

const RegionSelectSheet = ({ 
  selectedRegions = [], onSelectRegion, onClose }) => {
  const effectiveSelectedRegions = selectedRegions.length === 0 ? ['전체'] : selectedRegions;

  return (
    <>
      <Overlay onClick={onClose} />
      <Sheet>
        <TitleWrapper>
          <Title>지역 선택</Title>
        </TitleWrapper>
        <RegionListWrapper>
          {regions.map((region) => (
            <RegionButton
              key={region}
              selected={selectedRegions.includes(region)}
              onClick={() => onSelectRegion(region)}
            >
              {region}
            </RegionButton>
          ))}
        </RegionListWrapper>
      </Sheet>
    </>
  );
};

export default RegionSelectSheet;
