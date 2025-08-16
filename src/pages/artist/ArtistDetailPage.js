// src/pages/artist/ArtistDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeartButton from '../../components/common/HeartButton';
import NotifyButton from '../../components/common/NotifyButton';
import PerformanceTitleDateCard from '../../components/performance/PerformanceTitleDateCard';
import Divider from '../../components/common/Divider';
import Header from '../../components/layout/Header';

import { fetchArtistDetail } from '../../api/artistApi';
import { likeArtist, unlikeArtist } from '../../api/likeApi';
import { registerArtistAlert, cancelArtistAlert } from '../../api/alertApi';

export default function ArtistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [scheduledPerformances, setScheduledPerformances] = useState([]);
  const [pastPerformances, setPastPerformances] = useState([]);

  // 🔑 하드코딩 제거 → localStorage에서 토큰 가져오기 (변경된 한 줄)
  const authToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const loadArtist = async () => {
      try {
        const data = await fetchArtistDetail(id);
        console.log('🎯 [아티스트 상세] API 성공:', data);

        setArtist({
          ...data,
          profileImageUrl: data.image_url,
          spotify: data.spotify_url,
          instagram: data.instagram_account,
        });

        setIsLiked(data.isLiked || false);
        setIsNotified(data.isNotified || false);
        setScheduledPerformances(data.upcomingPerformances || []);
        setPastPerformances(data.pastPerformances || []);
      } catch (err) {
        console.error('📛 [아티스트 상세] API 실패:', err);
      }
    };

    loadArtist();
  }, [id]);

  // ✅ 찜 ON/OFF
  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikeArtist(id, authToken);
        console.log('💔 [찜] 아티스트 언찜 API 성공');
      } else {
        await likeArtist(id, authToken);
        console.log('❤️ [찜] 아티스트 찜 API 성공');
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error('📛 [찜] 아티스트 찜/언찜 API 실패:', error);
    }
  };

  // ✅ 알림 ON/OFF
  const toggleNotify = async () => {
    try {
      if (isNotified) {
        await cancelArtistAlert(id, authToken);
        setIsNotified(false);
        console.log('🔕 [알림] 아티스트 알림 취소 성공');
      } else {
        await registerArtistAlert(id, authToken);
        setIsNotified(true);
        console.log('🔔 [알림] 아티스트 알림 등록 성공');
      }
    } catch (error) {
      const detail = error.response?.data?.detail;

      if (detail === 'Alert already set') {
        setIsNotified(true);
        console.warn('🔔 [알림] 이미 등록된 알림입니다.');
      } else if (detail === 'Alert not found') {
        setIsNotified(false);
        console.warn('🔕 [알림] 등록되지 않은 알림입니다.');
      } else {
        console.error('📛 [알림] 알림 등록/취소 실패:', error);
        alert('알림 등록 중 오류가 발생했습니다.');
      }
    }
  };

  if (!artist) return <div>로딩 중...</div>;

  return (
    <>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <div style={{ height: '56px' }} />
      <Container>
        <ProfileSection>
          <ProfileWrapper>
            <ProfileImage src={artist.profileImageUrl || '/default_profile.png'} alt={artist.name} />
            <StyledHeartButton isLiked={isLiked} onClick={toggleLike} />
          </ProfileWrapper>
          <ProfileInfo>
            <Name>{artist.name}</Name>
            <NotifyButton isNotified={isNotified} onClick={toggleNotify} label="공연알림" />
          </ProfileInfo>
        </ProfileSection>

        <Divider />

        <InfoSection>
          <LabelRow>
            <Label>스포티파이</Label>
            <Value>
              {artist.spotify ? (
                <a href={artist.spotify} target="_blank" rel="noreferrer">바로가기</a>
              ) : '정보 없음'}
            </Value>
          </LabelRow>

          <LabelRow>
            <Label>인스타그램</Label>
            <Value>
              {artist.instagram ? (
                <a href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noreferrer">
                  @{artist.instagram}
                </a>
              ) : '정보 없음'}
            </Value>
          </LabelRow>

          <PerformanceSection>
            <Label>예정 공연</Label>
            <HorizontalScroll>
              {scheduledPerformances.length > 0 ? (
                scheduledPerformances.map((p) => (
                  <PerformanceTitleDateCard
                    key={p.id}
                    performance={p}
                    onClick={() => navigate(`/performance/${p.id}`)}
                  />
                ))
              ) : (
                <div>예정 공연 없음</div>
              )}
            </HorizontalScroll>
          </PerformanceSection>

          <PerformanceSection>
            <Label>지난 공연</Label>
            <HorizontalScroll>
              {pastPerformances.length > 0 ? (
                pastPerformances.map((p) => (
                  <PerformanceTitleDateCard
                    key={p.id}
                    performance={p}
                    onClick={() => navigate(`/performance/${p.id}`)}
                  />
                ))
              ) : (
                <div>지난 공연 없음</div>
              )}
            </HorizontalScroll>
          </PerformanceSection>
        </InfoSection>
      </Container>
    </>
  );
}

// ✅ 스타일
const Container = styled.div`display: flex; flex-direction: column; gap: 1rem;`;
const ProfileSection = styled.div`display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  aspect-ratio: 1 / 1;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const StyledHeartButton = styled(HeartButton)`position: absolute; bottom: -0.4rem; right: -0.4rem;`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const InfoSection = styled.div`padding: 1.25rem;`;

const LabelRow = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 1rem;
  padding: 0.25rem 0;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const PerformanceSection = styled.div`padding: 0.25rem 0;`;

const HorizontalScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  &::-webkit-scrollbar { display: none; }
`;
