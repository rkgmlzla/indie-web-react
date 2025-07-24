// src/pages/map/components/MapWideCard.jsx
// <MapWideCard data={sampleData} />
import React from 'react';
import styled from 'styled-components';
import IconMore from '../../../assets/icons/icon_y_more.svg';
import IconCopy from '../../../assets/icons/icon_y_copy.svg';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 16px;
  padding-top: ${({ noTopPadding }) => (noTopPadding ? '0' : '16px')};
  box-sizing: border-box;
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

const MapWideCard = ({ data, noTopPadding = false }) => {
  const { title, time, name, address, poster } = data;

  const handleVenueClick = () => {
    console.log('Venue clicked');
  };

  const handleAddressClick = () => {
    console.log('Address clicked');
  };

  return (
    <CardWrapper noTopPadding={noTopPadding}>
      <Poster src={poster} alt="poster" />
      <InfoBox>
        <TopInfoBox>
          <Title>{title}</Title>
          <Time>{time}</Time>
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
              <AddressText>{address}</AddressText>
              <FixedIcon src={IconCopy} alt="copy" />
            </TextWrapper>
          </RowWrapper>
        </BottomInfoBox>
      </InfoBox>
    </CardWrapper>
  );
};

export default MapWideCard;

