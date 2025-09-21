// src/stamp/StampPopupSmall.jsx
import React from "react";
import styled from "styled-components";

export default function StampPopupSmall({ onConfirm, onCancel }) {
  return (
    <ModalBackground onClick={onCancel}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <Message>스탬프를 받으시겠습니까?</Message>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>예</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonGroup>
      </PopupContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  min-width: 280px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: #3C9C68;
  color: #FAFAFA;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #216840ff;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px 0;
  background-color: #F6F6F6;
  color: #7D7D7D;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #E4E4E4;
  }
`;