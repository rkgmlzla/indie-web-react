// components/artist/ArtistProfileCard.js
import styled from 'styled-components';

export default function ArtistProfileCard({ artist, onClick }) {
  return (
    <Card onClick={onClick}>
      <ProfileImage src={artist.profileImageUrl} alt={artist.name} />
      <Name>{artist.name}</Name>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 4rem;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const Name = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`;
