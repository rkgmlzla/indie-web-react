import styled from 'styled-components';
import { Menu, Search, ChevronLeft, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 512px;
  margin: 0 auto;
  height: 56px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  box-sizing: border-box;
`;

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightArea = styled.div`
  display: flex;3
  align-items: center;
  gap: 8px;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkblack};
  caret-color: transparent;
  white-space: nowrap;        /* 한 줄만 표시 */
  overflow: hidden;           /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis;    /* … 처리 */
  max-width: 50%;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
`;

function Header({
  title,
  logoSrc,
  showSearch = true,
  initialSearchTab = '공연/공연장',
  keyword = '',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home';
  const handleBack = () => navigate(-1);

  const handleSearch = () => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`, {
      state: { initialTab: initialSearchTab },
    });
  };
  
  const handleAlarm = () => {
    navigate(`/alarm?keyword=${encodeURIComponent(keyword)}`, {
      state: { initialTab: initialSearchTab },
    });
  };

  return (
    <>
      <HeaderWrapper>
        <LeftArea>
          {!isHome && (
            <IconButton onClick={handleBack}>
              <ChevronLeft size={28} color="#3C9C68" strokeWidth={2.2} style={{ transform: 'translateX(-10px)' }}/>
            </IconButton>
          )}
        </LeftArea>

        <Title>
          {logoSrc ? <img src={logoSrc} alt="로고" style={{ height: '24px' }} /> : title}
        </Title>
        <RightArea>
          {showSearch && (
            <IconButton onClick={handleSearch}>
              <Search size={22} color="#3C9C68" strokeWidth={2.4}/>
            </IconButton>
          )}
          <IconButton onClick={handleAlarm}>
            <Bell size={22} color="#3C9C68" strokeWidth={2.4}/>
          </IconButton>
        </RightArea>
      </HeaderWrapper>
    </>
  );
}

export default Header;
