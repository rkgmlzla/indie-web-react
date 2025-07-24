// src/pages/venue/components/VenueItem.jsx
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  align-items: center; 
  padding: 12px 4px 0 4px; 
  gap: 12px;
  height: 56px; 
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  object-fit: cover;
`;

const ArtistName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

function VenueItem({ image, name }) {
  return (
    <CardWrapper>
      <ProfileImage src={image} alt={name} />
      <ArtistName>{name}</ArtistName>
    </CardWrapper>
  );
}

export default VenueItem;
