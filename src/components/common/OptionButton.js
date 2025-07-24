// components/common/OptionButton.js
import React from 'react';
import styled from 'styled-components';

export default function OptionButton({ label, isSelected, onClick }) {
    return (
        <StyledButton isSelected={isSelected} onClick={onClick}>
            {label}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    padding: 0.5rem 0.75rem;
    border: 1.5px solid
        ${({ isSelected, theme }) =>
        isSelected ? theme.colors.themeOrange : theme.colors.outlineGray};
    background-color: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.themeOrangeAlpha : 'transparent'};
    color: ${({ isSelected, theme }) => 
        isSelected ? theme.colors.themeOrange : theme.colors.darkGray};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-radius: 2rem;
    white-space: nowrap;
    cursor: pointer;
`;
