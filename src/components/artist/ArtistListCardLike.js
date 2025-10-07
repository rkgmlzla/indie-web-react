import React, { useState } from 'react';
import styled from 'styled-components';
import HeartFilledIcon from '../../assets/icons/icon_heart_filled.svg';
import HeartOutlineIcon from '../../assets/icons/icon_heart_outline.svg';
import { likeArtist, unlikeArtist } from '../../api/likeApi';

export default function ArtistListCardLike({ artist }) {
  const accessToken = localStorage.getItem('accessToken');
  const [isLiked, setIsLiked] = useState(!!artist?.isLiked);
  const [loading, setLoading] = useState(false);

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);
      if (isLiked) {
        await unlikeArtist(artist.id, accessToken);
      } else {
        await likeArtist(artist.id, accessToken);
      }
      setIsLiked((prev) => !prev);
    } catch (err) {
      console.error('📛 아티스트 찜 토글 실패:', err);
      alert('찜 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const safeImage =
    artist?.image_url && artist.image_url.trim() !== ''
      ? artist.image_url
      : '/default_profile.png';

  return (
    <CardWrapper>
      <ProfileImage 
        src={safeImage} 
        alt={artist?.name}
        onError={(e) => {
          if (e.target.src !== window.location.origin + '/default_profile.png') {
            e.target.src = '/default_profile.png';
          }
        }}
      />
      <ArtistName>{artist?.name || '이름 없음'}</ArtistName>
      <LikeButton onClick={toggleLike} disabled={loading}>
        <HeartIcon $isLiked={isLiked} />
      </LikeButton>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
  height: 44px;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  object-fit: cover;
`;

const ArtistName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const LikeButton = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const HeartIcon = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: ${({ $isLiked }) =>
    $isLiked ? `url(${HeartFilledIcon})` : `url(${HeartOutlineIcon})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
