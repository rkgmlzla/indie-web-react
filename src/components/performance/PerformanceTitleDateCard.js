import React from 'react';
import styled from 'styled-components';

export default function PerformanceTitleDateCard({ performance, onClick }) {
  return (
    <Card onClick={onClick}>
      <Poster src={performance.imageUrl} alt={performance.title} />
      <Title>{performance.title}</Title>
      <Date>{performance.date}</Date>
    </Card>
  );
}

const Card = styled.div`
  width: 5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
    flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  height: 6.75rem;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.2;
  max-height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.lightGray};
`;
