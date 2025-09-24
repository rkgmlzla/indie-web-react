// src/components/stamp/StampMyCard.jsx
import React from "react";
import styled from "styled-components";

export default function StampMyCard({ posterUrl, title, venue, date }) {
  return (
    <CardWrapper>
      <Poster src={posterUrl} alt={title} />
      <Info>
        <Title>{title}</Title>
        <Venue>{venue}</Venue>
        <Date>{date}</Date>
      </Info>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  background:  ${({ theme }) => theme.colors.bgwhite};
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 10px;
  display: flex;
  padding: 16px; 
  box-sizing: border-box;
`;

const Poster = styled.img`
  width: 96px;
  height: 128px;
  border-radius: 5px;
  object-fit: cover;
  flex-shrink: 0; 
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px; 
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.black};

  display: -webkit-box;        
  -webkit-line-clamp: 3;        
  -webkit-box-orient: vertical; 
  overflow: hidden;            
  text-overflow: ellipsis;     
`;

const Venue = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 20px;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 4px;

  display: -webkit-box;        
  -webkit-line-clamp: 1;        
  -webkit-box-orient: vertical; 
  overflow: hidden;            
  text-overflow: ellipsis; 
`;

const Date = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-top: 4px;
`;
