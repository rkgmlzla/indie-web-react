import React from 'react';
import styled from 'styled-components';
import ModalWrapper from './ModalWrapper';
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
        if (next.length === 0) next = ['전체']; // 최소 하나
      } else {
        next = [...selected.filter((r) => r !== '전체'), region];
      }
      onChange(next);
    }
  };

  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()} {...props}>
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
    </ModalWrapper>
  );
}

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