//src/components/common/OptionButton.js
// ✅ isSelected → $isSelected 로 DOM 전달 방지
import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1.5px solid ${({ theme }) => theme.colors.outlineGray};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.themeGreen : theme.colors.bgWhite};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.black};
  cursor: pointer;
`;

const OptionButton = ({ label, onClick, isSelected }) => {
  return <Button onClick={onClick} $isSelected={isSelected}>{label}</Button>;
};

export default OptionButton;
