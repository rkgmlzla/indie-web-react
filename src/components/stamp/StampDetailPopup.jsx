// src/components/stamp/StampDetailPopup.jsx
import React from "react";
import styled from "styled-components";
import StampDetailCard from '../stamp/StampDetailCard';

function StampDetailPopup({ concert, onClose }) {
  return (
    <ModalBackground>
      <PopupContainer>
        <StampDetailCard 
          posterUrl={concert.posterUrl}
          title={concert.title}
          date={concert.date}
          venue={concert.venue}
        />
        <ButtonGroup>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ButtonGroup>
      </PopupContainer>
    </ModalBackground>
  );
}

export default StampDetailPopup;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  position: absolute; 
  width: calc(${({ theme }) => theme.layout.maxWidth} * 0.5);
  padding: 16px 24px;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 24%; 
  margin-top: 16px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.themeGreen};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;

  &:hover {
    background-color: #2a8a55ff;
  }
`;