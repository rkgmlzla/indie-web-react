// src/components/stamp/StampPopup.jsx

import React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/icons/icon_close.svg"; 
import StampCard from "./StampCard";

export default function StampPopup({ onClose, stamps, onStampSelect }) {
  return (
    <ModalBackground>
      <PopupContainer>
        <FixedHeader>
          <CloseButton onClick={onClose}>
            <img src={CloseIcon} alt="닫기" />
          </CloseButton>
        </FixedHeader>
        <ScrollArea>
          <CardGrid>
            {stamps.map((stamp) => (
              <StampCard 
                  key={stamp.id}
                  id={stamp.id}
                  posterUrl={stamp.posterUrl}
                  place={stamp.place}
                  onClick={() => onStampSelect(stamp)}
                />
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
  background-color: transparent; 
  z-index: 1000;
`;

const PopupContainer = styled.div`
  position: relative;
  height: 93%;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.popGray};
  border-radius: 10px;
  margin-top: 56px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FixedHeader = styled.div`
  position: relative;
  height: 60px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.popGray};
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

  img {
    width: 28px; 
    height: 28px;
    display: block;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-right: 8px; 
  margin-bottom: 16px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.3);
    border-radius: 2px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 36px; 
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
`;

