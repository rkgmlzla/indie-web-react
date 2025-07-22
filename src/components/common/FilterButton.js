// src/components/common/FilterButton.js
import styled from 'styled-components';
import ChevronDownIcon from '../../assets/icons/icon_chevron_down.svg';

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    height: 2rem;
    padding: 0 0.75rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.black};
    border: 1.5px solid ${({ theme }) => theme.colors.outlineGray};
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    cursor: pointer;

    &::after {
        content: '';
        display: inline-block;
        background-image: url(${ChevronDownIcon});
        background-size: 100% 100%;
        width: 1rem;
        height: 1rem;
        margin-left: 6px;
    }
`;

const FilterButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default FilterButton;
