// src/components/stamp/StampDetailCard.jsx
// 스탬프 상세 공연 카드

import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const StampDetailCard = ({ id, posterUrl, title, date, venue, onPosterClick }) => {

   return (
    <CardContainer>
      <PosterWrapper
        onClick={() => onPosterClick?.(id)}
        role="button"
        aria-label={`${title || venue || '공연'} 상세보기`}
      >
         <Poster src={posterUrl} alt={venue} />
       </PosterWrapper>
       <Date>{date}</Date>
       <InfoWrapper>
         <Title>{title}</Title>
         <Venue>{venue}</Venue>
       </InfoWrapper>
     </CardContainer>
   );
 };

export default StampDetailCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PosterWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 10px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  width: 100%;
  text-align: left;
  padding-bottom: 12px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.stampGray};
`;

const Title = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};

  display: -webkit-box;        
  -webkit-line-clamp: 3;        
  -webkit-box-orient: vertical; 
  overflow: hidden;            
  text-overflow: ellipsis; 
`;

const Venue = styled.div`
  width: 100%;
  padding-top: 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.themeGreen};
`;