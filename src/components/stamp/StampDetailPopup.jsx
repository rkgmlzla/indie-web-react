// src/components/stamp/StampDetailPopup.jsx
import React from "react";
import styled from "styled-components";
import PerformanceCard from "../performance/PerformanceCard";

function StampDetailPopup({ concert, onClose }) {
  return (
    <Overlay>
      <Popup>
        <PerformanceCard concert={concert} />
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </Popup>
    </Overlay>
  );
}

export default StampDetailPopup;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  position: relative;
  width: calc(100% - 64px);   /* 좌우 32px 여백 */
  max-width: 400px;           /* 필요 시 최대 크기 */
  padding: 64px 32px 96px 32px; /* 상 64, 좌우 32, 하: 확인 버튼 아래 64 + 버튼간격 32 */
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmButton = styled.button`
  margin-top: 32px; /* PerformanceCard 아래 32px */
  padding: 12px 24px;
  background-color: #0077ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #005fcc;
  }
`;
