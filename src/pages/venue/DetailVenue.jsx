// ✅ src/pages/venue/DetailVenue.jsx
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import IconCopy from '../../assets/icons/icon_y_copy.svg';
import ChevronRightIcon from '../../assets/icons/icon_go.svg';
import MapView2 from '../../components/map/MapView2';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchVenueDetail } from '../../api/venueApi'; // ✅ API import
import { fetchReviewPreview } from '../../api/reviewApi'; // ✅ 미리보기 API
import ReviewCard from '../../components/review/ReviewCard';
import { formatKoreanDateTime } from '../../utils/dateUtils';

const Container = styled.div`
  width: 100%;
  margin: 0;donteai
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

/* ============================
 *  ⬇️ 리뷰 섹션 스타일 추가
 * ============================ */
const ReviewTag = styled(LabelTag)`
  margin: 16px 0 8px;
`;
const ReviewScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px; /* 카드 간격 (기존보다 좁게) */
  padding: 8px 0 80px; /* 하단 패딩 추가 (탭바와 겹치지 않게) */
  &::-webkit-scrollbar {
    display: none;
`;
const ReviewRow = styled.div`
  display: flex;
  width: max-content;
  gap: 12px;
  padding-right: 8px;
  align-items: flex-start;       /* 자식이 세로로 늘어나지 않게 */
`;

const ReviewCardWrapper = styled.div`
  width: 220px;          /* 카드 폭(모바일 1.1~1.2장 보이게) */
  flex-shrink: 0;
`;

const ReviewMoreCard = styled.button`
  width: auto;
  min-width: 112px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border || '#eee'};
  background: ${({ theme }) => theme.colors.white || '#fff'};
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;            /* 내부 컨텐츠 수직 가운데 정렬 */
  gap: 4px;
  cursor: pointer;
  height: auto;                   /*  높이 고정 해제 */
  align-self: center;             /*  row에서 가운데 맞춤 (stretch 방지) */

  &:hover {
    background: ${({ theme }) => theme.colors.bgGray || '#fafafa'};
  }
`;

const ReviewMoreText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.darkGray};
  white-space: nowrap;
`;

const ChevronImg = styled.img`
  width: 14px;
  height: 14px;
`;

/* ============================ */

const UpcomingCard = ({ data, onClick }) => {
  if (!data) return null;
  return (
    <div onClick={onClick}>
      <Poster src={data.image_url || ''} alt={data.title || '공연명'} />
      <Title>{data.title || '제목 없음'}</Title>
      <Date>{formatKoreanDateTime(data.date)}</Date>
    </div>
  );
};

const PastCard = ({ data, onClick }) => {
  if (!data) return null;
  return (
    <div onClick={onClick}>
      <Poster src={data.image_url || ''} alt={data.title || '공연명'} />
      <Title>{data.title || '제목 없음'}</Title>
      <Date>{formatKoreanDateTime(data.date)}</Date>
    </div>
  );
};

const DetailVenue = () => {
  const { id } = useParams();
  const venueId = Number(id);
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [upcomingConcerts, setUpcomingConcerts] = useState([]);
  const [pastConcerts, setPastConcerts] = useState([]);

  // ✅ 리뷰 미리보기 상태
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

        // ✅ 리뷰 미리보기 최대 2개
        try {
          // fetchVenueReviewPreview(venueId, limit) 형태 가정
          const preview = await fetchReviewPreview(venueId, 2);
          const items = Array.isArray(preview?.items || preview) ? (preview.items || preview) : [];
          setReviews(
            items.slice(0, 2).map((x) => ({
              id: x.id,
              user: { nickname: x.user?.nickname || x.author || '익명', profile_url: x.user?.profile_url || x.profile_url || '' },
              content: x.content ?? '',
              images: Array.isArray(x.images) ? x.images : [],
              created_at: x.created_at,
              like_count: x.like_count ?? 0,
              liked_by_me: x.liked_by_me ?? false,
            }))
          );
        } catch (e) {
          console.warn('⚠️ 리뷰 미리보기 로드 실패:', e);
          setReviews([]);
        }
      } catch (err) {
        console.error('📛 공연장 상세 API 호출 실패:', err);
        setVenue(null);
        setUpcomingConcerts([]);
        setPastConcerts([]);
        setReviews([]);
      }
    };
    loadVenueDetail();
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

          {/* ============================
              ⬇️ 리뷰 미리보기 + ‘리뷰 더보기 >’ 카드
              ============================ */}
 
          <ReviewTag>리뷰</ReviewTag>
          <ReviewScrollWrapper>
            <ReviewRow>
              {reviews.length > 0 ? (
                <>
                  {reviews.map((r) => (
                    <ReviewCardWrapper key={r.id}>
                      <ReviewCard
                        review={r}
                        variant="compact"     // 상세페이지용 미리보기: 날짜/좋아요/삭제 숨김
                        isLoggedIn={false}    // 미리보기 구역에서는 토글/삭제 안 보이도록 고정
                        isOwner={false}
                      />
                    </ReviewCardWrapper>
                  ))}

                  {/* ⬇️ 스크롤 끝에 노출되는 '리뷰 더보기 >' 카드 */}
                  <ReviewMoreCard
                    type="button"
                    onClick={() => navigate(`/venue/${venueId}/review`)}
                    aria-label="리뷰 더보기"
                    title="리뷰 더보기"
                  >
                    <ReviewMoreText>리뷰 더보기</ReviewMoreText>
                    <ChevronImg src={ChevronRightIcon} alt=">" />
                  </ReviewMoreCard>
                </>
              ) : (
                <>
                  <div style={{ color: '#aaa', fontSize: '12px', padding: '10px' }}>
                    아직 등록된 리뷰가 없습니다.
                  </div>
                  <ReviewMoreCard
                    type="button"
                    onClick={() => navigate(`/venue/${venueId}/review`)}
                    aria-label="리뷰 더보기"
                    title="리뷰 더보기"
                  >
                    <ReviewMoreText>리뷰 더보기</ReviewMoreText>
                    <ChevronImg src={ChevronRightIcon} alt=">" />
                  </ReviewMoreCard>
                </>
              )}
            </ReviewRow>
          </ReviewScrollWrapper>
          {/* ============================ */}
        </InnerWrapper>
      </Container>
    </>
  );
};

export default DetailVenue;
