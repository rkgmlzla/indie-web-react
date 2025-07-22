import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HeartButton from '../common/HeartButton';
import NotifyButton from '../common/NotifyButton';

export default function ArtistListCard({ artist, onToggleLike }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(artist.isLiked);

  const handleClick = () => {
    navigate(`/artist/${artist.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Profile>
        <Image src={artist.profileImageUrl} alt={artist.name} />
        <Name>{artist.name}</Name>
      </Profile>
      <Right onClick={(e) => e.stopPropagation()}>
        {location.pathname === '/favorite' && (
          <>
            <NotifyButton
              isNotified={artist.isLiked}
              onClick={() => onToggleLike(artist.id)}
              label="공연알림"
            />
          </>
        )}
        <HeartButton
          isLiked={artist.isLiked}
          onClick={() => onToggleLike(artist.id)}
        />
      </Right>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;