// components/modals/SortModal.js
import styled from 'styled-components';
import ModalWrapper from './ModalWrapper';
import OptionButton from '../common/OptionButton';

// ✅ label(한글)과 value(영문 키) 분리 → PerformanceListPage.sortMapping과 일치
const options = [
  { label: '최근등록순', value: 'latest' },
  { label: '공연임박순', value: 'date' },
  { label: '인기많은순', value: 'popular' },
];

export default function SortModal({ selected, onSelect, onClose, ...props }) {
  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()} {...props}>
      <Title>정렬 선택</Title>
      <OptionRow>
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            // ✅ selected 값은 value 기준으로 비교
            isSelected={selected === opt.value}
            onClick={() => {
              onSelect(opt.value); // ✅ 영문 키만 전달
              onClose();
            }}
          />
        ))}
      </OptionRow>
    </ModalWrapper>
  );
}

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 1rem;
`;

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
