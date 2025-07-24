// src/components/RegionSelectButton.jsx
import styled from 'styled-components';
import DropIcon from '../../../assets/icons/icon_y_drop.svg';

const Button = styled.button`
  width: 96px;
  height: 28px;
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 16px 0;  
  margin-left: 4px;
  cursor: pointer;
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
`;

const RegionSelectButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Label>지역 선택</Label>
      <Icon src={DropIcon} alt="dropdown icon" />
    </Button>
  );
};

export default RegionSelectButton;
