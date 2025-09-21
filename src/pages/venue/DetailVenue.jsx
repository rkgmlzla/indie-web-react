// ✅ src/pages/venue/DetailVenue.jsx
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import IconCopy from '../../assets/icons/icon_y_copy.svg';
import ChevronRightIcon from '../../assets/icons/icon_go.svg';
import MapView2 from '../map/components/MapView2';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchVenueDetail } from '../../api/venueApi'; // ✅ API import
import { fetchVenueReviewPreview } from '../../api/reviewApi'; // ✅ 미리보기 API

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;
const InnerWrapper = styled.div`
  padding: 16px 0;
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const ProfileImage = styled.img`
  width: 16%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 12px;
`;
const VenueName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
`;
const LabelTag = styled.div`
  width: 72px;
  margin-right: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 20px;
  display: flex;
  align-items: center;
`;
const InstagramTag = styled(LabelTag)``;
const InstagramLabel = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 20px;
  text-decoration: underline;
  cursor: pointer;
`;
const AddressTag = styled(LabelTag)`
  align-self: flex-start;
`;
const AddressContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;
const AddressLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
`;
const AddressLabel = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 20px;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-word;
  flex: 1;
`;
const CopyIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
`;
const UpcomingTag = styled(LabelTag)`
  margin-bottom: 8px;
`;
const PastTag = styled(LabelTag)`
  margin-bottom: 8px;
`;
const UpcomingScrollWrapper = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 8px;
`;
const PastScrollWrapper = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const UpcomingCardRow = styled.div`
  display: flex;
  width: max-content;
`;
const PastCardRow = styled.div`
  display: flex;
  width: max-content;
`;
const UpcomingCardWrapper = styled.div`
  width: 81px;
  flex-shrink: 0;
  margin-right: 24px;
`;
const PastCardWrapper = styled.div`
  width: 81px;
  flex-shrink: 0;
  margin-right: 24px;
`;
const Poster = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 5px;
  object-fit: cover;
`;
const Title = styled.div`
  margin-top: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Date = styled.div`
  margin-top: 2px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: ${({ theme }) => theme.colors.lightGray};
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ReviewHeader = styled.div`
  margin: 20px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReviewTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.black};
`;
const ReviewMore = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 0;
  padding: 6px 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
const ReviewList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  flex-wrap: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ReviewCard = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px 14px;
  min-width: 240px;
  max-width: 280px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;
const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: #e6e6ea;
`;
const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;
const ReviewTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;
const Author = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
const Dot = styled.span`
  color: #dcdde1;
`;
const RDate = styled.span`
  color: ${({ theme }) => theme.colors.lightGray};
`;
const RText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const UpcomingCard = ({ data, onClick }) => {
  if (!data) return null;
  return (
    <div onClick={onClick}>
      <Poster src={data.image_url || ''} alt={data.title || '공연명'} />
      <Title>{data.title || '제목 없음'}</Title>
      <Date>{data.date || ''}</Date>
    </div>
  );
};

const PastCard = ({ data, onClick }) => {
  if (!data) return null;
  return (
    <div onClick={onClick}>
      <Poster src={data.image_url || ''} alt={data.title || '공연명'} />
      <Title>{data.title || '제목 없음'}</Title>
      <Date>{data.date || ''}</Date>
    </div>
  );
};

const PLACEHOLDER_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><rect width="100%" height="100%" rx="14" fill="#e6e6ea"/></svg>'
  );

const DetailVenue = () => {
  const { id } = useParams();
  const venueId = Number(id);
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
  const [pastConcerts, setPastConcerts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadVenueDetail = async () => {
      try {
        const data = await fetchVenueDetail(id);
        console.log('🎯 [공연장 상세] API 응답:', data);

        setVenue(data || null);
        setUpcomingConcerts(
          Array.isArray(data?.upcomingPerformance) ? data.upcomingPerformance : []
        );
        setPastConcerts(
          Array.isArray(data?.pastPerformance) ? data.pastPerformance : []
        );

        // ✅ 리뷰 3개 미리보기 (fetchVenueReviewPreview로 교체)
        try {
          const preview = await fetchVenueReviewPreview(venueId, 3);
          const items = Array.isArray(preview) ? preview : [];
          setReviews(
            items.map((x) => ({
              id: x.id,
              authorName: x.author ?? '익명',
              createdAt: (x.created_at || '').slice(0, 10),
              content: x.content ?? '',
              // 렌더에서 r.avatar를 사용하므로 avatar 키로 매핑
              avatar: x.profile_url || '',
            }))
          );
        } catch {
          setReviews([]); // API 실패 시 섹션 비우기
        }
      } catch (err) {
        console.error('📛 공연장 상세 API 호출 실패:', err);
        setVenue(null);
        setUpcomingConcerts([]);
        setPastConcerts([]);
      }
    };
    loadVenueDetail();
    // venueId를 의존성에 포함 (ESLint 경고 해결)
  }, [id, venueId]);

  if (!venue) return <div>로딩 중...</div>;

  return (
    <>
      <Header title="공연장 정보" />
      <div style={{ height: '28px' }} />
      <Container>
        <InnerWrapper>
          <Row>
            <ProfileImage src={venue.image_url || ''} alt="공연장 이미지" />
            <VenueName>{venue.name || '공연장 이름 없음'}</VenueName>
          </Row>

          <Divider mt="24px" mb="24px" />

          <Row>
            <InstagramTag>인스타그램</InstagramTag>
            <InstagramLabel
              onClick={() =>
                venue.instagram_account &&
                window.open(venue.instagram_account, '_blank')
              }
            >
              {venue.instagram_account || '없음'}
            </InstagramLabel>
          </Row>

          <Row>
            <AddressTag>주소</AddressTag>
            <AddressContentWrapper>
              <AddressLabelWrapper>
                <AddressLabel>{venue.address || '주소 정보 없음'}</AddressLabel>
                <CopyIcon
                  src={IconCopy}
                  alt="복사 아이콘"
                  onClick={() => {
                    navigator.clipboard.writeText(venue.address || '');
                    alert('주소가 복사되었습니다');
                  }}
                />
              </AddressLabelWrapper>
            </AddressContentWrapper>
          </Row>

          <MapView2
            data={
              venue.latitude && venue.longitude
                ? [
                    {
                      name: venue.name,
                      latitude: venue.latitude,
                      longitude: venue.longitude,
                    },
                  ]
                : []
            }
          />

          <UpcomingTag>예정 공연</UpcomingTag>
          <UpcomingScrollWrapper>
            <UpcomingCardRow>
              {upcomingConcerts.length > 0 ? (
                upcomingConcerts.map((item) => (
                  <UpcomingCardWrapper key={item.id}>
                    <UpcomingCard
                      data={item}
                      onClick={() => navigate(`/performance/${item.id}`)}
                    />
                  </UpcomingCardWrapper>
                ))
              ) : (
                <div style={{ color: '#aaa', fontSize: '12px', padding: '10px' }}>
                  예정 공연이 없습니다.
                </div>
              )}
            </UpcomingCardRow>
          </UpcomingScrollWrapper>

          <PastTag>지난 공연</PastTag>
          <PastScrollWrapper>
            <PastCardRow>
              {pastConcerts.length > 0 ? (
                pastConcerts.map((item) => (
                  <PastCardWrapper key={item.id}>
                    <PastCard
                      data={item}
                      onClick={() => navigate(`/performance/${item.id}`)}
                    />
                  </PastCardWrapper>
                ))
              ) : (
                <div style={{ color: '#aaa', fontSize: '12px', padding: '10px' }}>
                  지난 공연이 없습니다.
                </div>
              )}
            </PastCardRow>
          </PastScrollWrapper>

          {/* ▶ 리뷰 미리보기 */}
          <ReviewHeader>
            <ReviewTitle>리뷰</ReviewTitle>
            <ReviewMore
              onClick={() => navigate(`/venue/${venueId}/review`)}
              disabled={!Number.isFinite(venueId)}
            >
              <img src={ChevronRightIcon} alt="더보기" />
            </ReviewMore>
          </ReviewHeader>

          <ReviewList>
            {reviews.length ? (
              reviews.map((r) => (
                <ReviewCard key={r.id}>
                  <Avatar
                    src={r.avatar || PLACEHOLDER_AVATAR}
                    alt={`${r.authorName} 프로필`}
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER_AVATAR)}
                  />
                  <ReviewBody>
                    <ReviewTop>
                      <Author>{r.authorName}</Author>
                      <Dot>•</Dot>
                      <RDate>{r.createdAt}</RDate>
                    </ReviewTop>
                    <RText>{r.content}</RText>
                  </ReviewBody>
                </ReviewCard>
              ))
            ) : (
              <div style={{ color: '#aaa', fontSize: 12, padding: '4px 2px' }}>
                아직 등록된 리뷰가 없습니다.
              </div>
            )}
          </ReviewList>
        </InnerWrapper>
      </Container>
    </>
  );
};

export default DetailVenue;
