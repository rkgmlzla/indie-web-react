import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 이동할 때마다 맨 위로 스크롤
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
