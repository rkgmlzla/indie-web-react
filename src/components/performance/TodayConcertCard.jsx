// src/components/performance/TodayConcertCard.jsx
import React from 'react';
import styled from 'styled-components';

const TodayConcertCard = ({ title, posterUrl, place, date, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <Poster src={posterUrl} alt={title} />
      <TextContainer>
        <Title>{title}</Title>
        <Place>{place}</Place>
        <DateText>{date}</DateText>
      </TextContainer>
    </CardContainer>
  );
};

export default TodayConcertCard;

const CardContainer = styled.div`
  width: calc(100% - 16px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 5px;
  padding: 0 16px;
  cursor: pointer;
  height: 192px;
  box-sizing: border-box;
`;

const Poster = styled.img`
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
`;

const TextContainer = styled.div`
  flex: 1;
  margin-left: 12px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Place = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  margin-top: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateText = styled.p`
  margin-top: -8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.darkGray};
`;
