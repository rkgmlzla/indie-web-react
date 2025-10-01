// src/stamp/StampPopupSmall.jsx
import React from "react";
import ReactDOM from "react-dom"; 
import styled from "styled-components";

export default function StampPopupSmall({ onConfirm, onCancel }) {
  return ReactDOM.createPortal(
    <ModalBackground>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <Message>스탬프를 받으시겠습니까?</Message>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>예</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonGroup>
      </PopupContainer>
    </ModalBackground>,
    document.body 
  );
}

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
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  min-width: 280px;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
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

const CancelButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.popupGray};
  color: #7D7D7D;
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;

  &:hover {
    background-color: #c2c2c2;
  }
`;
