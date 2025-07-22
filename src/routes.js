import React from 'react';
import HomePage from './pages/home'; // 메인 페이지 (있다면)
import LoginPage from './pages/login/LoginPage'; // ✅ 카카오 로그인 페이지
import MyPage from './pages/mypage/MyPage'; // ✅ 마이페이지
import Search1 from './pages/search/Search1'; // ✅ 검색 페이지
import Search2 from './pages/search/Search2';
import Search3 from './pages/search/Search3';
import Search4 from './pages/search/Search4';
import Bulletin from './pages/bulltetin/bulletin';
import Heartp from './pages/heart/heart_p';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/search1',
    element: <Search1 />,
  },
  {
    path: '/search1/result',
    element: <Search2 />,
  },
  {
    path: '/search3',
    element: <Search3 />,
  },
  {
    path: '/search4',
    element: <Search4 />,
  },
  {
    path: '/bulletin',
    element: <Bulletin />,
  },
  {
    path: '/heartp',
    element: <Heartp />,
  },
];

export default routes;
