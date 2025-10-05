import styled from 'styled-components';

const options = [
  { label: '최근등록순', value: 'latest' },
  { label: '공연임박순', value: 'date' },
  { label: '인기많은순', value: 'popular' },
];

export default function SortModal({ selected, onSelect, onClose }) {
  return (
    <>
      <Overlay onClick={onClose} />
      <Frame>
        <Sheet onClick={(e) => e.stopPropagation()}>
          <TitleWrapper>
            <Title>정렬 선택</Title>
          </TitleWrapper>

          <OptionWrapper>
            {options.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={selected === opt.value}
                onClick={() => {
                  onSelect(opt.value);
                  onClose();
                }}
              >
                {opt.label}
              </OptionButton>
            ))}
          </OptionWrapper>
        </Sheet>
      </Frame>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(228, 228, 228, 0.8);
  z-index: 1000;
`;

const Frame = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 1001;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: var(--app-max-width, 512px);
  margin: 0 auto;
  pointer-events: auto;

  background: #fff;
  border-radius: 12px 12px 0 0;
  animation: slideUp 0.3s ease-out;
  box-sizing: border-box;
  padding-bottom: 16px;

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
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

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px 24px 16px;
  box-sizing: border-box;
`;

const OptionButton = styled.button`
  flex: 1;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ selected, theme }) =>
    selected ? 'rgba(60, 156, 103, 0.2)' : theme.colors.white};
  border: 1px solid
    ${({ selected, theme }) => (selected ? theme.colors.themeGreen : theme.colors.outlineGray)};
  color: ${({ selected, theme }) => (selected ? theme.colors.themeGreen : theme.colors.darkGray)};
  font-size: 14px;
  font-weight: ${({ selected, theme }) => (selected ? theme.fontWeights.semibold : theme.fontWeights.medium)};
  text-align: center;
  cursor: pointer;
`;