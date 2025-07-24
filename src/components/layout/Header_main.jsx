import styled from 'styled-components';
import menuIcon from '../../assets/icons/icon_y_menu.svg';
import searchIcon from '../../assets/icons/icon_y_search.svg';

const HeaderWrapper = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
function Header() {
  return (
    <HeaderWrapper>
      <LeftSection>
        <IconButton>
          <img src={menuIcon} alt="메뉴" />
        </IconButton>
      </LeftSection>
      <Title>페이지 제목</Title>
      <RightSection>
        <IconButton>
          <img src={searchIcon} alt="검색" />
        </IconButton>
      </RightSection>
    </HeaderWrapper>
  );
}

export default Header;
