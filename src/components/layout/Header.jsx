import styled from 'styled-components';
import { Menu, Search, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';

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

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  caret-color: transparent;
  cursor: default;
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
  showSearch = true,
  showMenu = true,
  initialSearchTab = '공연/공연장',
  keyword = '',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isHome = location.pathname === '/' || location.pathname === '/home';

  const handleBack = () => navigate(-1);
  const handleSidebarOpen = () => setIsSidebarOpen(true);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  const handleSearch = () => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`, {
      state: { initialTab: initialSearchTab },
    });
  };

  return (
    <>
      <HeaderWrapper>
        <LeftArea>
          {!isHome && (
            <IconButton onClick={handleBack}>
              <ChevronLeft size={24} color="#d55a1f" />
            </IconButton>
          )}
          {showMenu && (
            <IconButton onClick={handleSidebarOpen}>
              <Menu size={24} color="#d55a1f" />
            </IconButton>
          )}
        </LeftArea>

        <Title>{title}</Title>
        {showSearch && (
          <IconButton onClick={handleSearch}>
            <Search size={22} color="#d55a1f" />
          </IconButton>
        )}
      </HeaderWrapper>

      {isSidebarOpen && <Sidebar onClose={handleSidebarClose} />}
    </>
  );
}

export default Header;
