//src/components/common/FilterButtonNone.js
import React from 'react'; 
import styled from 'styled-components';

const Button = styled.button`
  width: fit-content;
  max-width: 200px;
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1.4px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50px;

  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 6px 12px;
  margin: 0;
  cursor: pointer;

  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
`;

const Label = styled.span`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FilterButtonNone = ({ children, onClick, $isDisabled = false }) => {
  return (
    <Button onClick={onClick} $isDisabled={$isDisabled}>
      <Label>{children}</Label>
    </Button>
  );
};

export default FilterButtonNone;