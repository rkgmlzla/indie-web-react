// /pages/performance/PerformanceDetailPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { performanceSampleData } from '../../data/performanceSampleData';
import { artistSampleData } from '../../data/artistSampleData';
import getDday from '../../utils/getDday';
import Divider from '../../components/common/Divider';
import NotifyButton from '../../components/common/NotifyButton';
import ArtistProfileCard from '../../components/artist/ArtistProfileCard';
import Header from '../../components/layout/Header';
import HeartOutlineIconIcon from '../../assets/icons/icon_heart_outline.svg';
import HeartFilledIcon from '../../assets/icons/icon_heart_filled.svg';
import ChevronRightIcon from '../../assets/icons/icon_go.svg';
import { venueSampleData } from '../../data/venueSampleData';
import { userperformancefavSampleData } from '../../data/userperformancefavSampleData';

export default function PerformanceDetailPage() {
  const currentUserId = 1;

  const { id } = useParams();
  const performance = performanceSampleData.find((p) => String(p.id) === id);
  const venue = venueSampleData.find((v) => v.id === performance.venueIds?.[0]);

  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(() =>
    userperformancefavSampleData.some(
      (fav) =>
        fav.user_id === currentUserId && fav.performance_id === performance.id
    )
  );
  const [likeCount, setLikeCount] = useState(
    () =>
      userperformancefavSampleData.filter(
        (fav) => fav.performance_id === performance.id
      ).length
  );

  const [isNotified, setIsNotified] = useState(false);

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
    // 실제 구현에서는 서버에 좋아요 추가/삭제 요청 필요
  };

  const toggleNotify = () => {
    setIsNotified((prev) => !prev);
  };

  return (
    <>
      <Header title="공연" />
      <div style={{ height: '56px' }} />
      <Container>
        <PosterSection>
          <PosterWrapper>
            <Poster src={performance.posterUrl} alt="poster" />
            <LikeButton onClick={toggleLike} liked={isLiked}>
              <HeartIcon isLiked={isLiked} />
              <LikeCount>{likeCount}</LikeCount>
            </LikeButton>
          </PosterWrapper>
          <InfoWrapper>
            <Dday>{getDday(performance.date)}</Dday>
            <Title>{performance.title}</Title>
            <NotifyButton
              isNotified={isNotified}
              onClick={toggleNotify}
              label="예매알림"
            />
          </InfoWrapper>
        </PosterSection>

        <Divider />

        <InfoSection>
          <LabelRow>
            <Label>공연일시</Label>
            <Value>
              {performance.date} {performance.time}
            </Value>
          </LabelRow>

          <LabelRow>
            <Label>공연장</Label>
            <VenueValue
              onClick={() =>
                navigate(`/venue/${performance.venueIds?.[0] || 1}`)
              }>
              {venue?.title || '공연장 정보 없음'}
              <ChevronIcon src={ChevronRightIcon} alt="자세히 보기" />
            </VenueValue>
          </LabelRow>

          <LabelRow style={{ display: 'block' }}>
            <Label>출연진</Label>
            <ScrollContainer>
              {artistSampleData
                .filter((artist) => performance.artistIds.includes(artist.id))
                .map((artist) => (
                  <ArtistProfileCard
                    key={artist.id}
                    artist={artist}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  />
                ))}
            </ScrollContainer>
          </LabelRow>

          <LabelRow>
            <Label>티켓 가격</Label>
            <Value>
              {performance.price?.toLocaleString()}원
              {performance.priceOnsite && (
                <>(현장 가격: {performance.priceOnsite.toLocaleString()}원)</>
              )}
            </Value>
          </LabelRow>

          <LabelRow>
            <Label>티켓 오픈</Label>
            <Value>
              {performance.ticketOpenDate} {performance.ticketOpenTime}
            </Value>
          </LabelRow>

          <LabelRow>
            <Label>상세 정보</Label>
            <Value>
              <a href={performance.detailLink} target="_blank" rel="noreferrer">
                {performance.detailLink}
              </a>
            </Value>
          </LabelRow>
        </InfoSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

const PosterSection = styled.div`
  display: flex;
  gap: 1rem 0.25rem;
  padding: 1rem 0;
`;

const PosterWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Poster = styled.img`
  width: 20vw;
  max-width: 8rem;
  height: auto;
  aspect-ratio: 0.8;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  object-fit: cover;
`;

const LikeButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: 1.5rem;
  padding: 0.75rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.outlineGray};
  border: 1.5px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  cursor: pointer;
  gap: 0.25rem;
`;

const HeartIcon = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: ${({ isLiked }) =>
    isLiked ? `url(${HeartFilledIcon})` : `url(${HeartOutlineIconIcon})`};
  background-size: 100% 100%;
`;

const LikeCount = styled.span`
  color: ${({ theme }) => theme.colors.black};
`;

const InfoWrapper = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
`;

const Dday = styled.div`
  color: ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
`;

const LabelRow = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem 0;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0.5rem;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const VenueValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;
`;

const ChevronIcon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;
