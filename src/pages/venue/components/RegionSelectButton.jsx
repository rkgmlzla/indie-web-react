import styled from 'styled-components';
import DropIcon from '../../../assets/icons/icon_y_drop.svg';

const Button = styled.button`
  width: fit-content;
  max-width: 200px;
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1.4px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px; 
  margin: 22px 0 16px 0;
  cursor: pointer;
`;

const Label = styled.span`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 4px;
`;

const RegionSelectButton = ({ onClick, selectedRegions = [] }) => {
  let displayText = '지역 전체';

  if (!(selectedRegions.length === 1 && selectedRegions[0] === '전체')) {
    if (selectedRegions.length === 1) {
      displayText = `${selectedRegions[0]}`;
    } else {
      const [first] = selectedRegions;
      const othersCount = selectedRegions.length - 1;
      displayText = `${first} 외 ${othersCount}곳`;
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
