// ✅ src/pages/artist/ArtistDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeartButton from '../../components/common/HeartButton';
import NotifyButton from '../../components/common/NotifyButton';
import PerformanceTitleDateCard from '../../components/performance/PerformanceTitleDateCard';
import Divider from '../../components/common/Divider';
import Header from '../../components/layout/Header';

// ✅ API imports
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

  const authToken = 'user_token_here'; // 🔹 로그인 시 토큰으로 대체

  // ✅ 아티스트 상세 정보 API 호출
  useEffect(() => {
    const loadArtist = async () => {
      try {
        const data = await fetchArtistDetail(id);
        console.log('🎯 [아티스트 상세] API 응답:', data);

        // ✅ 필드명 매핑 (백엔드 → 프론트 변수 변환)
        const mappedData = {
          ...data,
          profileImageUrl: data.image_url,
          spotify: data.spotify_url,
          instagram: data.instagram_account
        };

        setArtist(mappedData);
        setIsLiked(data.isLiked || false);
        setIsNotified(data.isNotified || false);
        setScheduledPerformances(data.upcomingPerformances || []); // ✅ 이름 일치
        setPastPerformances(data.pastPerformances || []);
      } catch (err) {
        console.error('📛 아티스트 상세 API 호출 실패:', err);
      }
    };
    loadArtist();
  }, [id]);

  // ✅ 찜 버튼 API
  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikeArtist(id, authToken);
      } else {
        await likeArtist(id, authToken);
      }
      setIsLiked((prev) => !prev);
    } catch (err) {
      console.error('📛 아티스트 찜 API 실패:', err);
    }
  };

  // ✅ 알림 버튼 API
  const toggleNotify = async () => {
    try {
      if (isNotified) {
        await cancelArtistAlert(id, authToken);
      } else {
        await registerArtistAlert(id, authToken);
      }
      setIsNotified((prev) => !prev);
    } catch (err) {
      console.error('📛 아티스트 알림 API 실패:', err);
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
            {/* ✅ 필드명 수정 */}
            <ProfileImage src={artist.profileImageUrl} alt={artist.name} />
            <StyledHeartButton isLiked={isLiked} onClick={toggleLike} />
          </ProfileWrapper>
          <ProfileInfo>
            <Name>{artist.name}</Name>
            <NotifyButton isNotified={isNotified} onClick={toggleNotify} label="공연알림" />
          </ProfileInfo>
        </ProfileSection>

        <Divider />

        <InfoSection>
          {/* ✅ 스포티파이 링크 수정 */}
          <LabelRow>
            <Label>스포티파이</Label>
            <Value>
              {artist.spotify ? (
                <a href={artist.spotify} target="_blank" rel="noreferrer">바로가기</a>
              ) : (
                '정보 없음'
              )}
            </Value>
          </LabelRow>

          {/* ✅ 인스타그램 링크 수정 */}
          <LabelRow>
            <Label>인스타그램</Label>
            <Value>
              {artist.instagram ? (
                <a href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noreferrer">
                  @{artist.instagram}
                </a>
              ) : (
                '정보 없음'
              )}
            </Value>
          </LabelRow>

          <PerformanceSection>
            <Label>예정 공연</Label>
            <HorizontalScroll>
              {scheduledPerformances.length > 0 ? (
                scheduledPerformances.map((p) => (
                  <PerformanceTitleDateCard key={p.id} performance={p} onClick={() => navigate(`/performance/${p.id}`)} />
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
                  <PerformanceTitleDateCard key={p.id} performance={p} onClick={() => navigate(`/performance/${p.id}`)} />
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

// ✅ 스타일 유지
const Container = styled.div`display: flex; flex-direction: column; gap: 1rem;`;
const ProfileSection = styled.div`display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;`;
const ProfileWrapper = styled.div`position: relative; width: 5rem; height: 5rem; margin-right: 1rem;`;
const ProfileImage = styled.img`width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 1px solid ${({ theme }) => theme.colors.outlineGray};`;
const StyledHeartButton = styled(HeartButton)`position: absolute; bottom: -0.4rem; right: -0.4rem;`;
const ProfileInfo = styled.div`flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 0.75rem;`;
const Name = styled.div`font-size: ${({ theme }) => theme.fontSizes.lg}; font-weight: ${({ theme }) => theme.fontWeights.semibold};`;
const InfoSection = styled.div`padding: 1.25rem;`;
const LabelRow = styled.div`display: grid; grid-template-columns: 6rem 1fr; gap: 1rem; padding: 0.25rem 0;`;
const Label = styled.div`font-size: ${({ theme }) => theme.fontSizes.md}; font-weight: ${({ theme }) => theme.fontWeights.semibold};`;
const Value = styled.div`font-size: ${({ theme }) => theme.fontSizes.base}; font-weight: ${({ theme }) => theme.fontWeights.regular};`;
const PerformanceSection = styled.div`padding: 0.25rem 0;`;
const HorizontalScroll = styled.div`display: flex; overflow-x: auto; gap: 1rem; &::-webkit-scrollbar { display: none; }`;
