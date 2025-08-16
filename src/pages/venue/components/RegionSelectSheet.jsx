// src/components/RegionSelectSheet.jsx
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(228, 228, 228, 0.8);
  z-index: 1000;
`;

const Frame = styled.div`
  /* 화면 전체를 덮되, 내부 컨텐츠를 앱 폭에 맞춰 가운데 정렬 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;      /* 가운데 정렬 */
  pointer-events: none;         /* 시트 외부 클릭 전달 막지 않음 */
  z-index: 1001;
`;

const Sheet = styled.div`
  /* 메인 실행 화면 폭 = 앱 max-width 를 그대로 따름 */
  width: 100%;
  max-width: var(--app-max-width, 512px); /* 프로젝트 전역에서 쓰는 값과 동일해야 함 */
  margin: 0 auto;
  pointer-events: auto;         /* 시트는 클릭 가능 */

  background: #fff;
  border-radius: 12px 12px 0 0;
  animation: slideUp 0.3s ease-out;
  box-sizing: border-box;
  padding-bottom: 16px;

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
`;

const TitleWrapper = styled.div`
  height: 24px;
  padding: 16px 16px 0 16px;
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
  grid-template-columns: repeat(auto-fit, minmax(84px, 1fr)); /* 앱 폭 내에서 균등 채움 */
  column-gap: 12px;
  row-gap: 16px;
  padding: 12px 16px 24px 16px;
  box-sizing: border-box;
`;

const RegionButton = styled.button`
  height: 32px;
  width: 100%;
  border-radius: 16px;
  background-color: ${({ selected, theme }) =>
    selected ? 'rgba(241, 79, 33, 0.3)' : theme.colors.white};
  border: 1px solid
    ${({ selected, theme }) => (selected ? theme.colors.themeOrange : theme.colors.outlineGray)};
  color: ${({ selected, theme }) => (selected ? theme.colors.themeOrange : theme.colors.darkGray)};
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`;

const regions = [
  '전체', '서울', '경기', '인천', '부산',
  '대구', '광주', '대전', '울산', '세종',
  '강원', '충청', '전라', '경상', '제주',
];

const RegionSelectSheet = ({ selectedRegions = [], onSelectRegion, onClose }) => {
  const effectiveSelected = selectedRegions.length === 0 ? ['전체'] : selectedRegions;

  return (
    <>
      <Overlay onClick={onClose} />
      <Frame>
        <Sheet>
          <TitleWrapper>
            <Title>지역 선택</Title>
          </TitleWrapper>

          <RegionListWrapper>
            {regions.map((region) => (
              <RegionButton
                key={region}
                selected={effectiveSelected.includes(region)}
                onClick={() => onSelectRegion(region)}
              >
                {region}
              </RegionButton>
            ))}
          </RegionListWrapper>
        </Sheet>
      </Frame>
    </>
  );
};

export default RegionSelectSheet;
