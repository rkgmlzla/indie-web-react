// src/components/common/FilterButtonNone.js
import styled from 'styled-components';

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 4px 12px; /* 상하 4px, 좌우 12px */
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.black};
    border: 1.5px solid ${({ theme }) => theme.colors.outlineGray};
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    cursor: pointer;
`;

const FilterButtonNone = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default FilterButtonNone;
