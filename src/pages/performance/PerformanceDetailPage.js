// ✅ src/pages/performance/PerformanceDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getDday from '../../utils/getDday';
import Divider from '../../components/common/Divider';
import NotifyButton from '../../components/common/NotifyButton';
import ArtistProfileCard from '../../components/artist/ArtistProfileCard';
import Header from '../../components/layout/Header';
import HeartOutlineIcon from '../../assets/icons/icon_heart_outline.svg';
import HeartFilledIcon from '../../assets/icons/icon_heart_filled.svg';
import ChevronRightIcon from '../../assets/icons/icon_go.svg';

// ✅ API imports
import { fetchPerformanceDetail } from '../../api/performanceApi';
import { likePerformance, unlikePerformance } from '../../api/likeApi';
import { registerPerformanceAlert, cancelPerformanceAlert } from '../../api/alertApi';

export default function PerformanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [performance, setPerformance] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isNotified, setIsNotified] = useState(false);

  const authToken = 'user_token_here'; // 🔹 실제 로그인 토큰으로 교체 필요

  // ✅ 공연 상세 데이터 로딩
  useEffect(() => {
    const loadPerformance = async () => {
      try {
        const data = await fetchPerformanceDetail(id);
        console.log('🎯 [공연 상세] API 응답:', data);
        setPerformance(data);
        setIsLiked(data.isLiked || false);
        setLikeCount(data.likeCount || 0);
        setIsNotified(data.isNotified || false);
      } catch (err) {
        console.error('📛 공연 상세 API 호출 실패:', err);
      }
    };
    loadPerformance();
  }, [id]);

  // ✅ 찜 ON/OFF
  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikePerformance(id, authToken);
        setLikeCount((prev) => prev - 1);
      } else {
        await likePerformance(id, authToken);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked((prev) => !prev);
    } catch (err) {
      console.error('📛 찜 API 호출 실패:', err);
    }
  };

  // ✅ 알림 ON/OFF
  const toggleNotify = async () => {
    try {
      if (isNotified) {
        await cancelPerformanceAlert(id, authToken);
      } else {
        await registerPerformanceAlert(id, authToken);
      }
      setIsNotified((prev) => !prev);
    } catch (err) {
      console.error('📛 알림 API 호출 실패:', err);
    }
  };

  if (!performance) return <div>로딩 중...</div>;

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
            <NotifyButton isNotified={isNotified} onClick={toggleNotify} label="예매알림" />
          </InfoWrapper>
        </PosterSection>

        <Divider />

        <InfoSection>
          <LabelRow><Label>공연일시</Label><Value>{performance.date} {performance.time}</Value></LabelRow>
          <LabelRow>
            <Label>공연장</Label>
           <VenueValue onClick={() => navigate(`/venue/${performance.venueId}`)}>
  {performance.venue || '공연장 정보 없음'} <ChevronIcon src={ChevronRightIcon} />
</VenueValue>

          </LabelRow>

          <LabelRow style={{ display: 'block' }}>
            <Label>출연진</Label>
            <ScrollContainer>
              {performance.artists?.map((artist) => (
                <ArtistProfileCard key={artist.id} artist={artist} onClick={() => navigate(`/artist/${artist.id}`)} />
              ))}
            </ScrollContainer>
          </LabelRow>

          <LabelRow><Label>티켓 가격</Label><Value>{performance.price?.toLocaleString()}원</Value></LabelRow>
          <LabelRow><Label>티켓 오픈</Label><Value>{performance.ticketOpenDate} {performance.ticketOpenTime}</Value></LabelRow>
          <LabelRow><Label>상세 정보</Label><Value><a href={performance.detailLink} target="_blank" rel="noreferrer">{performance.detailLink}</a></Value></LabelRow>
        </InfoSection>
      </Container>
    </>
  );
}

// ✅ 스타일 (기존 코드 유지)
const Container = styled.div`display: flex; flex-direction: column; max-width: ${({ theme }) => theme.layout.maxWidth}; margin: 0 auto; background-color: ${({ theme }) => theme.colors.bgWhite};`;
const PosterSection = styled.div`display: flex; gap: 1rem 0.25rem; padding: 1rem 0;`;
const PosterWrapper = styled.div`flex: 2; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;`;
const Poster = styled.img`width: 20vw; max-width: 8rem; height: auto; aspect-ratio: 0.8; border-radius: 0.5rem; border: 1px solid ${({ theme }) => theme.colors.outlineGray}; object-fit: cover;`;
const LikeButton = styled.button`display: inline-flex; align-items: center; height: 1.5rem; padding: 0.75rem 0.5rem; font-size: ${({ theme }) => theme.fontSizes.xs}; font-weight: ${({ theme }) => theme.fontWeights.regular}; color: ${({ theme }) => theme.colors.outlineGray}; border: 1.5px solid ${({ theme }) => theme.colors.outlineGray}; border-radius: 1.5rem; background-color: ${({ theme }) => theme.colors.bgWhite}; cursor: pointer; gap: 0.25rem;`;
const HeartIcon = styled.span`display: inline-block; width: 1rem; height: 1rem; background-image: ${({ isLiked }) => isLiked ? `url(${HeartFilledIcon})` : `url(${HeartOutlineIcon})`}; background-size: 100% 100%;`;
const LikeCount = styled.span`color: ${({ theme }) => theme.colors.black};`;
const InfoWrapper = styled.div`flex: 3; display: flex; flex-direction: column; justify-content: flex-start; padding: 1rem;`;
const Dday = styled.div`color: ${({ theme }) => theme.colors.lightGray}; font-size: ${({ theme }) => theme.fontSizes.sm};`;
const Title = styled.h1`font-size: ${({ theme }) => theme.fontSizes.lg}; font-weight: ${({ theme }) => theme.fontWeights.semibold}; margin: 0.5rem 0;`;
const InfoSection = styled.div`display: flex; flex-direction: column; gap: 0.5rem; padding: 1.25rem;`;
const LabelRow = styled.div`display: grid; grid-template-columns: 6rem 1fr; align-items: center; gap: 1rem; padding: 0.25rem 0;`;
const Label = styled.div`font-size: ${({ theme }) => theme.fontSizes.base}; font-weight: ${({ theme }) => theme.fontWeights.medium}; color: ${({ theme }) => theme.colors.darkGray};`;
const Value = styled.div`font-size: ${({ theme }) => theme.fontSizes.base}; font-weight: ${({ theme }) => theme.fontWeights.regular}; color: ${({ theme }) => theme.colors.darkGray};`;
const VenueValue = styled.div`display: flex; align-items: center; gap: 0.25rem; font-size: ${({ theme }) => theme.fontSizes.base}; font-weight: ${({ theme }) => theme.fontWeights.regular}; color: ${({ theme }) => theme.colors.darkGray}; cursor: pointer;`;
const ChevronIcon = styled.img`width: 0.75rem; height: 0.75rem;`;
const ScrollContainer = styled.div`display: flex; overflow-x: auto; gap: 1.5rem; padding: 0.5rem; &::-webkit-scrollbar { display: none; }`;
