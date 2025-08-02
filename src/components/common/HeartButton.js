import styled from 'styled-components';
import HeartFilledIcon from '../../assets/icons/icon_heart_filled.svg';
import HeartOutlineIcon from '../../assets/icons/icon_heart_outline.svg';

export default function HeartButton({ isLiked, onClick, className }) {
  // ✅ StyledButton에 전달 시 $ 접두어를 붙여서 넘김
  return <StyledButton className={className} $isLiked={isLiked} onClick={onClick} />;
}

// ✅ $isLiked를 사용하여 DOM으로 전달되지 않도록 처리
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50%;
  background: ${({ $isLiked }) =>
    $isLiked ? `url(${HeartFilledIcon})` : `url(${HeartOutlineIcon})`} no-repeat center;
  background-size: 50%;
  cursor: pointer;
`;
