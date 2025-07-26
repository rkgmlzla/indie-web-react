// src/pages/venue/DetailVenue.jsx
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import IconCopy from '../../assets/icons/icon_y_copy.svg';
import MapView from '../map/components/MapView';
import { useParams } from 'react-router-dom';
import { venueSampleData } from '../../data/venueSampleData';
import { performanceSampleData } from '../../data/performanceSampleData';
import { useNavigate } from 'react-router-dom';

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
  text-decoration: none;

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

const UpcomingScrollWrapper = styled.div`
  overflow-x: auto;
  padding-left: 0;
  padding-right: 0;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  box-sizing: border-box;
`;

const UpcomingCardRow = styled.div`
  display: flex;
  width: max-content;
`;

const UpcomingCardWrapper = styled.div`
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
  white-space: normal;
  word-break: break-word;
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
const UpcomingCard = ({ data, onClick }) => {
  return (
    <div onClick={onClick}>
      <Poster src={data.posterUrl} alt={data.title} />
      <Title>{data.title}</Title>
      <Date>{data.date}</Date>
    </div>
  );
};
const DetailVenue = () => {
  const { id } = useParams();
  const data = venueSampleData.find((v) => String(v.id) === String(id));

  const navigate = useNavigate();

  const handleInstagramClick = () => {
    // 추후 Instagram 링크 연결 예정
    console.log('Instagram Clicked');
  };

  const handleAddressClick = () => {
    // 추후 주소 클릭 이벤트 예정
    console.log('Address Clicked');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.address);
  };
  const upcomingData = performanceSampleData.filter((p) =>
    p.venueIds?.includes(Number(id))
  );
  return (
    <>
      <Header title="공연장 정보" />
      <div style={{ height: '28px' }} />
      <Container>
        <InnerWrapper>
          <Row>
            <ProfileImage src={data.profileImg} alt="공연장 이미지" />
            <VenueName>{data.title}</VenueName>
          </Row>

          <Divider mt="24px" mb="24px" />

          <Row>
            <InstagramTag>인스타그램</InstagramTag>
            <InstagramLabel onClick={handleInstagramClick}>
              {data.instagram}
            </InstagramLabel>
          </Row>

          <Row>
            <AddressTag>주소</AddressTag>
            <AddressContentWrapper>
              <AddressLabelWrapper>
                <AddressLabel onClick={handleAddressClick}>
                  {data.address}
                </AddressLabel>
                <CopyIcon
                  src={IconCopy}
                  alt="복사 아이콘"
                  onClick={handleCopyClick}
                />
              </AddressLabelWrapper>
            </AddressContentWrapper>
          </Row>
          <MapView />
          <UpcomingTag>예정 공연</UpcomingTag>
          <UpcomingScrollWrapper>
            <UpcomingCardRow>
              {upcomingData.map((item) => (
                <UpcomingCardWrapper key={item.id}>
                  <UpcomingCard
                    data={item}
                    onClick={() => navigate(`/performance/${item.id}`)}
                  />
                </UpcomingCardWrapper>
              ))}
            </UpcomingCardRow>
          </UpcomingScrollWrapper>
        </InnerWrapper>
      </Container>
    </>
  );
};

export default DetailVenue;
