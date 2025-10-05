import styled from 'styled-components';
import React, { useState } from 'react';

export default function PeriodModal({ startYear, startMonth, endYear, endMonth, onChange, onClose }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const [tempStartYear, setTempStartYear] = useState(startYear);
  const [tempStartMonth, setTempStartMonth] = useState(startMonth);
  const [tempEndYear, setTempEndYear] = useState(endYear);
  const [tempEndMonth, setTempEndMonth] = useState(endMonth);

  const handleApply = () => {
    onChange({
      startYear: tempStartYear,
      startMonth: tempStartMonth,
      endYear: tempEndYear,
      endMonth: tempEndMonth,
    });
    onClose();
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Title>기간 설정</Title>

        <PickerRow>
          <PickerGroup>
            <Picker>
              <SelectWrapper>
                <select
                  value={tempStartYear}
                  onChange={(e) => setTempStartYear(Number(e.target.value))}
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
                  value={tempStartMonth}
                  onChange={(e) => setTempStartMonth(Number(e.target.value))}
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
                  value={tempEndYear}
                  onChange={(e) => setTempEndYear(Number(e.target.value))}
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
                  value={tempEndMonth}
                  onChange={(e) => setTempEndMonth(Number(e.target.value))}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </SelectWrapper>
            </Picker>
          </PickerGroup>
        </PickerRow>

        <CloseButton onClick={handleApply}>적용</CloseButton>
      </Sheet>
    </>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 999;
`;

const Sheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: var(--app-max-width, 512px);
  margin: 0 auto;
  background: #fff;
  border-radius: 12px 12px 0 0;
  box-sizing: border-box;
  padding: 24px 16px 32px 16px;
  animation: slideUp 0.3s ease-out;
  z-index: 1000;

  /* ✅ 긴 화면 대응 */
  max-height: 90dvh;
  overflow-y: auto;

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: 16px;
`;

const PickerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px; 
`;

const PickerGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Picker = styled.div`
  display: flex;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border: 1.4px solid ${({ theme }) => theme.colors.outlineGray};
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
    appearance: none;
  }
`;

const Divider = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0 24px;
`;

const CloseButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.themeGreen};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;

  &:hover {
    background-color: #2a8a55;
  }
`;
