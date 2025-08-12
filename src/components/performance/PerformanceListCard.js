//src/components/performance/PerformanceListCard.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeartButton from '../common/HeartButton';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineGray};
  cursor: pointer;
`;

const LeftSection = styled.div`
  display: flex;
`;

const Poster = styled.img`
  width: 20vw;
  max-width: 5rem;
  height: auto;
  aspect-ratio: 0.8;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 1rem;
  flex: 1;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  display: -webkit-box;
  -webkit-line-clamp: 2;
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

const RightSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export default function PerformanceListCard({ performance, onToggleLike }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { posterUrl, title, venue, date, isLiked } = performance;

  const handleClick = () => {
    navigate(`/performance/${performance.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <LeftSection>
        <Poster src={posterUrl} alt={title} referrerPolicy="no-referrer" />
        <Info>
          <Title>{title}</Title>
          <Venue>{venue}</Venue>
          <Date>{date}</Date>
        </Info>
      </LeftSection>
      {location.pathname === '/favorite' && (
        <RightSectionWrapper onClick={(e) => e.stopPropagation()}>
          <HeartButton
            isLiked={isLiked}
            onClick={() => onToggleLike(performance.id)}
          />
        </RightSectionWrapper>
      )}
    </Card>
  );
}
