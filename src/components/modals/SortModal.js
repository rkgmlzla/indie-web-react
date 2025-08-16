import styled from 'styled-components';
import OptionButton from '../common/OptionButton';

const options = [
  { label: '최근등록순', value: 'latest' },
  { label: '공연임박순', value: 'date' },
  { label: '인기많은순', value: 'popular' },
];

export default function SortModal({ selected, onSelect, onClose, ...props }) {
  return (
    <BottomSheet onClick={(e) => e.stopPropagation()} {...props}>
      <Title>정렬 선택</Title>
      <OptionRow>
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            label={opt.label}
            isSelected={selected === opt.value}
            onClick={() => {
              onSelect(opt.value);
              onClose();
            }}
          />
        ))}
      </OptionRow>
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

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;
