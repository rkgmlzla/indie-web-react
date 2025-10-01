// src/components/stamp/StampCard.jsx
// 스탬프 팝업 공연 카드

import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const StampCard = ({ id, posterUrl, venue, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/stamp/${id}`);
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <PosterWrapper>
        <Poster src={posterUrl} alt={venue} />
      </PosterWrapper>
      <Venue>{venue || "없음"}</Venue>
    </CardContainer>
  );
};

export default StampCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const PosterWrapper = styled.div`
  width: 100%;         
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 10px;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 10px;
`;

const Venue = styled.div`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.darkblack};
  text-align: center;

  display: -webkit-box;        
  -webkit-line-clamp: 2;        
  -webkit-box-orient: vertical; 
  overflow: hidden;            
  text-overflow: ellipsis; 
`;