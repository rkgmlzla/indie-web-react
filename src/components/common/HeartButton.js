import styled from 'styled-components';
import HeartFilledIcon from '../../assets/icons/icon_heart_filled.svg';
import HeartOutlineIcon from '../../assets/icons/icon_heart_outline.svg';

export default function HeartButton({ isLiked, onClick, className }) {
  return <StyledButton className={className} isLiked={isLiked} onClick={onClick} />;
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.outlineGray};
  border-radius: 50%;
  background: ${({ isLiked }) =>
    isLiked ? `url(${HeartFilledIcon})` : `url(${HeartOutlineIcon})`} no-repeat center;
  background-size: 50%;
  cursor: pointer;
`;

