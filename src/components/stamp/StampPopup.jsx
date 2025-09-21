// src/components/stamp/StampPopup.jsx

import React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/icons/icon_close.svg"; 
import StampCard from "./StampCard";
// ...상단 import 동일
// ...상단 import 동일

export default function StampPopup({ onClose, stamps, onStampSelect }) {
  const list = Array.isArray(stamps) ? stamps : [];

  return (
    <ModalBackground>
      <PopupContainer>
        <FixedHeader>
          <CloseButton onClick={onClose}>
            <img src={CloseIcon} alt="닫기" />
          </CloseButton>
        </FixedHeader>

        <ScrollArea>
          {list.length === 0 && (
            <Empty>표시할 공연이 없습니다.</Empty>  
          )}

          <CardGrid>
            {list.map((s) => (
              <StampCard key={s.id} item={s} onClick={() => onStampSelect?.(s)} />
            ))}
          </CardGrid>
        </ScrollArea>
      </PopupContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 16px;
  padding-bottom: 100px;
  background: rgba(0,0,0,.2); /* ← 배경 살짝 어둡게 */
  z-index: 9999;              /* ← FAB보다 위로 */
`;

const PopupContainer = styled.div`
  position: relative;
  height: 93%;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 56px auto 0;         /* margin-top 합침 */
  background: #fff;            /* ← 내용 대비 확보 */
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FixedHeader = styled.div`
  position: relative;
  height: 60px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.popGray};
  border-radius: 10px 10px 0 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  img { width: 28px; height: 28px; display: block; }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 8px 16px 8px;   /* ← 내용이 가장자리와 붙지 않게 */
  /* 스크롤바 스타일 생략 */
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  justify-items: center;
  align-content: start;
  gap: 16px 16px;
  padding: 8px 8px 16px;
  min-height: 160px;
`;

const Empty = styled.div`
  color: #9e9e9e;
  font-size: 14px;
  padding: 16px 12px;
`;
