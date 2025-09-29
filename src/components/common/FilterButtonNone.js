//src/components/common/FilterButtonNone.js
import React from 'react'; 
import styled from 'styled-components';

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 4px 12px; 
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.black};
    border: 1.5px solid ${({ theme }) => theme.colors.outlineGray};
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    cursor: pointer;

    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
    
    pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
`;

const FilterButtonNone = ({ children, onClick, $isDisabled = false }) => {
    return (
        <Button onClick={onClick} $isDisabled={$isDisabled}>
            {children}
        </Button>
    );
};

export default FilterButtonNone;