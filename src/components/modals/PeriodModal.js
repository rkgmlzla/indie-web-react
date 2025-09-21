// src/components/modals/PeriodModal.js
import styled from 'styled-components';

export default function PeriodModal({ startYear, startMonth, endYear, endMonth, onChange, onClose }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  return (
    <Backdrop onClick={onClose}>
      <BottomSheet onClick={(e) => e.stopPropagation()}>
        <Title>기간 설정</Title>

        <PickerRow>
          <PickerGroup>
            <Picker>
              <SelectWrapper>
                <select
                  value={startYear}
                  onChange={(e) =>
                    onChange({ startYear: Number(e.target.value), startMonth, endYear, endMonth })
                  }
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Picker>

            <Picker>
              <SelectWrapper>
                <select
                  value={startMonth}
                  onChange={(e) =>
                    onChange({ startYear, startMonth: Number(e.target.value), endYear, endMonth })
                  }
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Picker>
          </PickerGroup>

          <Divider>-</Divider>

          <PickerGroup>
            <Picker>
              <SelectWrapper>
                <select
                  value={endYear}
                  onChange={(e) =>
                    onChange({ startYear, startMonth, endYear: Number(e.target.value), endMonth })
                  }
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Picker>

            <Picker>
              <SelectWrapper>
                <select
                  value={endMonth}
                  onChange={(e) =>
                    onChange({ startYear, startMonth, endYear, endMonth: Number(e.target.value) })
                  }
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Picker>
          </PickerGroup>
        </PickerRow>

        <CloseButton onClick={onClose}>적용</CloseButton>
      </BottomSheet>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
`;

const BottomSheet = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--app-max-width, ${({ theme }) => theme.layout.maxWidth});
  background: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 12px 12px 0 0;
  height: 160px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-top: 16px;
  margin-left: 16px;
`;

const PickerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px; 
`;

const PickerGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Picker = styled.div`
  display: flex;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 16px;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.bgWhite};

  select {
    border: none;
    outline: none;
    background: transparent;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.darkGray};
    text-align: center;

    /* 기본 드롭다운 화살표 제거 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    /* IE 전용 */
    &::-ms-expand {
      display: none;
    }
  }
`;

const Divider = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0 44px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 32px; 
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.darkGray};
  border: 2px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 10px;
  cursor: pointer;
`;
