import styled from 'styled-components';
import DropIcon from '../../../assets/icons/icon_y_drop.svg';

const Button = styled.button`
  width: fit-content;
  max-width: 200px;
  height: 28px;
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  margin: 16px 0;
  margin-left: 4px;
  cursor: pointer;
  gap: 8px;
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
`;

const RegionSelectButton = ({ onClick, selectedRegions = [] }) => {
  let displayText = '전체 지역';

  if (!(selectedRegions.length === 1 && selectedRegions[0] === '전체')) {
    if (selectedRegions.length === 1) {
      displayText = `지역: ${selectedRegions[0]}`;
    } else if (selectedRegions.length === 2) {
      displayText = `지역: ${selectedRegions.join(', ')}`;
    } else {
      const [first, second] = selectedRegions;
      const othersCount = selectedRegions.length - 2;
      displayText = `지역: ${first}, ${second} 외 ${othersCount}곳`;
    }
  }

  return (
    <Button onClick={onClick}>
      <Label>{displayText}</Label>
      <Icon src={DropIcon} alt="dropdown icon" />
    </Button>
  );
};

export default RegionSelectButton;
