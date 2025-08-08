import React from 'react';
import styled from 'styled-components';
import IconMore from '../../../assets/icons/icon_y_more.svg';
import IconCopy from '../../../assets/icons/icon_y_copy.svg';
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 94%;
  margin: 0 16px;
  padding: 4px;
  box-sizing: border-box;
  background: #ffdabaff;
  border-radius: 13px;
  padding-top: ${({ $noTopPadding }) => ($noTopPadding ? '0' : '16px')};
`;

const Poster = styled.img`
  width: 90px;
  height: 120px;
  border-radius: 5px;
  object-fit: cover;
`;

const InfoBox = styled.div`
  margin-left: 12px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  min-width: 0;
`;

const TopInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 6px;
  line-height: 18px;
`;

const BottomInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
`;

const VenueText = styled.div`
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  line-height: 20px;
  min-width: 0;
`;

const AddressText = styled.div`
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 18px;
  min-width: 0;
`;

const FixedIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 6px;
  flex-shrink: 0;
`;

const formatTimeOnly = (timeStr) => {
  if (!timeStr) return '-';
  const [hourStr, minuteStr] = timeStr.split(':');
  const h = parseInt(hourStr, 10);
  const m = parseInt(minuteStr, 10);
  const period = h >= 12 ? '오후' : '오전';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${hour12}시${m === 0 ? '' : ` ${m}분`}`;
};

const MapWideCard = ({ data, noTopPadding = false }) => {
  const navigate = useNavigate();
  const { name, address, upcomingPerformance = [] } = data;
  console.log('🔥 upcomingPerformance:', data.upcomingPerformance);
  const perf = upcomingPerformance[0]; // ✅ 그냥 이거 하나만 씀

  const handleVenueClick = () => {
    if (data?.venue_id || data?.id) {
      navigate(`/venue/${data.venue_id ?? data.id}`);
    }
  };

  const handleAddressClick = () => {
    const copyTarget = perf?.address ?? address;
    if (copyTarget) {
      navigator.clipboard.writeText(copyTarget).then(() => {
        alert('주소가 복사되었습니다.');
      });
    }
  };

  return (
    <CardWrapper $noTopPadding={noTopPadding}>
      <Poster src={perf?.image_url ?? '/default.jpg'} alt="poster" />
      <InfoBox>
        <TopInfoBox>
          <Title>{perf?.title ?? '공연 없음'}</Title>
          <Time>{perf?.time ? formatTimeOnly(perf.time) : '-'}</Time>
        </TopInfoBox>

        <BottomInfoBox>
          <RowWrapper onClick={handleVenueClick}>
            <TextWrapper>
              <VenueText>{name}</VenueText>
              <FixedIcon src={IconMore} alt="more" />
            </TextWrapper>
          </RowWrapper>

          <RowWrapper onClick={handleAddressClick}>
            <TextWrapper>
              <AddressText>📍 {perf?.address ?? address ?? '-'}</AddressText>
              <FixedIcon src={IconCopy} alt="copy" />
            </TextWrapper>
          </RowWrapper>
        </BottomInfoBox>
      </InfoBox>
    </CardWrapper>
  );
};

export default MapWideCard;
