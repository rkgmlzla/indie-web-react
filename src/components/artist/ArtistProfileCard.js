import styled from 'styled-components';

export default function ArtistProfileCard({ artist, onClick }) {
  // ✅ 안전한 이미지 URL
  const safeImage = artist?.image_url && artist.image_url.trim() !== ''
    ? artist.image_url
    : '/default_profile.png';

  return (
    <Card onClick={onClick}>
      <ImageWrapper>
        <ProfileImage 
          src={safeImage} 
          alt={artist?.name || '아티스트'} 
          onError={(e) => { 
            if (e.target.src !== window.location.origin + '/default_profile.png') {
              e.target.src = '/default_profile.png';
            }
          }} 
        />
      </ImageWrapper>
      <Name>{artist?.name}</Name>
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

const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
`;

const Name = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`;
