import React from 'react';
import styled from 'styled-components';
import OptionButton from '../common/OptionButton';

const REGION_OPTIONS = [
  ['전체', '서울', '경기', '인천'],
  ['부산', '대구', '광주', '대전', '울산', '세종'],
  ['강원', '충청', '전라', '경상', '제주'],
];

export default function RegionModal({ selected, onChange, onClose, ...props }) {
  const isSelected = (region) => selected.includes(region);

  const toggleRegion = (region) => {
    if (region === '전체') {
      onChange(['전체']);
    } else {
      let next;
      if (selected.includes(region)) {
        next = selected.filter((r) => r !== region);
        if (next.length === 0) next = ['전체'];
      } else {
        next = [...selected.filter((r) => r !== '전체'), region];
      }
      onChange(next);
    }
  };

  return (
    <BottomSheet onClick={(e) => e.stopPropagation()} {...props}>
      <Title>지역 선택</Title>
      <OptionGrid>
        {REGION_OPTIONS.flat().map((region) => (
          <OptionButton
            key={region}
            label={region}
            isSelected={isSelected(region)}
            onClick={() => toggleRegion(region)}
          />
        ))}
      </OptionGrid>
    </BottomSheet>
  );
}

/* ✅ 하단 도킹: align-self 제거, 가로 중앙은 margin으로 */
const BottomSheet = styled.div`
  width: 100%;
  max-width: var(--app-max-width, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;               /* 가로 중앙 정렬 */
  box-sizing: border-box;
  background: #fff;
  border-radius: 12px 12px 0 0;
  padding: 16px;
  padding-bottom: max(16px, env(safe-area-inset-bottom));
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 1rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
`;
