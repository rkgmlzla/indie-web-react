import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  padding: 1rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const Poster = styled.img`
  width: 20vw;
  max-width: 5rem;
  height: auto;
  aspect-ratio: 0.8;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem; /* 12px */
  flex: 1;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  display: -webkit-box;
  -webkit-line-clamp: 2;      /* 최대 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const Venue = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.black};
`;

const Date = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.darkGray};
`;

export default function PerformanceCardHorizontal({ performance }) {
  const { posterUrl, title, venue, date } = performance;

  console.log("포스터 URL:", posterUrl);

  return (
    <Card>
      <Poster src={posterUrl} alt={title} referrerPolicy="no-referrer" />
      <Info>
        <Title>{title}</Title>
        <Venue>{venue}</Venue>
        <Date>{date}</Date>
      </Info>
    </Card>
  );
}
