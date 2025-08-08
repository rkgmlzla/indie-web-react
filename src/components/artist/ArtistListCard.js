import React, { useState } from 'react';
import styled from 'styled-components';
import ArtistProfileCard from './ArtistProfileCard';
import HeartFilledIcon from '../../assets/icons/icon_heart_filled.svg';
import HeartOutlineIcon from '../../assets/icons/icon_heart_outline.svg';
import { likeArtist, unlikeArtist } from '../../api/likeApi';

export default function ArtistListCard({ artist }) {
  const [isLiked, setIsLiked] = useState(artist?.isLiked || false);
  const authToken = 'user_token_here'; // 실제 토큰으로 교체

  const toggleLike = async (e) => {
    e.stopPropagation(); // 카드 클릭 방지
    try {
      if (isLiked) {
        await unlikeArtist(artist.id, authToken);
      } else {
        await likeArtist(artist.id, authToken);
      }
      setIsLiked((prev) => !prev);
    } catch (err) {
      console.error('📛 아티스트 찜 토글 실패:', err);
    }
  };

  return (
    <CardContainer>
      <ArtistProfileCard artist={artist} />
      <Info>
        <Name>{artist?.name || '이름 없음'}</Name>
      </Info>
      <LikeButton onClick={toggleLike}>
        <HeartIcon $isLiked={isLiked} />
      </LikeButton>
    </CardContainer>
  );
}

// ✅ 스타일
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
`;

const Info = styled.div`
  margin-left: 1rem;
  flex: 1;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

// ✅ 피그마 스타일 기반 하트 버튼
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
