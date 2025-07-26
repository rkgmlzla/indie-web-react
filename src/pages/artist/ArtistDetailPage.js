import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { artistSampleData } from '../../data/artistSampleData';
import { performanceSampleData } from '../../data/performanceSampleData';
import HeartButton from '../../components/common/HeartButton';
import NotifyButton from '../../components/common/NotifyButton';
import PerformanceTitleDateCard from '../../components/performance/PerformanceTitleDateCard';
import Divider from '../../components/common/Divider';
import Header from '../../components/layout/Header';

export default function ArtistDetailPage() {
  const navigate = useNavigate();
  const now = new Date();

  const { id } = useParams();
  const artist = artistSampleData.find((a) => String(a.id) === id);

  const [isLiked, setIsLiked] = useState(artist?.isLiked || false);
  const [isNotified, setIsNotified] = useState(artist?.isNotified || false);

  const toggleLike = () => setIsLiked((prev) => !prev);
  const toggleNotify = () => setIsNotified((prev) => !prev);

  const scheduledPerformances = performanceSampleData.filter(
    (p) => p.artistIds?.includes(artist.id) && new Date(p.date) >= new Date()
  );
  const pastPerformances = performanceSampleData.filter(
    (p) => p.artistIds?.includes(artist.id) && new Date(p.date) < new Date()
  );

  if (!artist) return <div>아티스트 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header title="아티스트" initialSearchTab="아티스트" />
      <div style={{ height: '56px' }} />
      <Container>
        <ProfileSection>
          <ProfileWrapper>
            <ProfileImage src={artist.profileImageUrl} alt={artist.name} />
            <StyledHeartButton isLiked={isLiked} onClick={toggleLike} />
          </ProfileWrapper>
          <ProfileInfo>
            <Name>{artist.name}</Name>
            <NotifyButton
              isNotified={isNotified}
              onClick={toggleNotify}
              label="공연알림"
            />
          </ProfileInfo>
        </ProfileSection>

        <Divider />

        <InfoSection>
          <LabelRow>
            <Label>스포티파이</Label>
            <Value>
              <a
                href={`https:///open.spotify.com/artist/${artist.spotify}`}
                target="_blank"
                rel="noreferrer">
                바로가기
              </a>
            </Value>
          </LabelRow>

          <LabelRow>
            <Label>인스타그램</Label>
            <Value>
              <a
                href={`https://instagram.com/${artist.instagram}`}
                target="_blank"
                rel="noreferrer">
                @{artist.instagram}
              </a>
            </Value>
          </LabelRow>

          <PerformanceSection>
            <Label>예정 공연</Label>
            <HorizontalScroll>
              {scheduledPerformances.map((performance) => (
                <PerformanceTitleDateCard
                  key={performance.id}
                  performance={performance}
                  onClick={() => navigate(`/performance/${performance.id}`)}
                />
              ))}
            </HorizontalScroll>
          </PerformanceSection>

          <PerformanceSection>
            <Label>지난 공연</Label>
            <HorizontalScroll>
              {pastPerformances.map((performance) => (
                <PerformanceTitleDateCard
                  key={performance.id}
                  performance={performance}
                  onClick={() => navigate(`/performance/${performance.id}`)}
                />
              ))}
            </HorizontalScroll>
          </PerformanceSection>
        </InfoSection>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 0;
  padding: 1.25rem;
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const StyledHeartButton = styled(HeartButton)`
  position: absolute;
  bottom: -0.4rem;
  right: -0.4rem;
  z-index: 1;
`;

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
  color: ${({ theme }) => theme.colors.black};
`;

const InfoSection = styled.div`
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
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0.5rem 0;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const PerformanceSection = styled.div`
  padding: 0.25rem 0;
`;

const HorizontalScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
