import React from 'react';
import HomePage from './pages/home'; // 메인 페이지 (있다면)
import LoginPage from './pages/login/LoginPage'; // ✅ 카카오 로그인 페이지
import MyPage from './pages/mypage/MyPage'; // ✅ 마이페이지
import Search from './pages/search/Search'; // ✅ 검색 페이지
import Search2 from './pages/search/Search2';
import Search3 from './pages/search/Search3';
import Search4 from './pages/search/Search4';
import BulletinBoard from './pages/bulltetin/bulletinboard';
import BulletinWrite from './pages/bulltetin/bulletinwrite';
import Bulletindetail from './pages/bulltetin/bulletindetail';

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
    path: '/search',
    element: <Search />,
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
    path: '/bulletinwrite',
    element: <BulletinWrite />,
  },
  {
    path: '/bulletinboard',
    element: <BulletinBoard />,
  },
  { path: '/freeboard/:id', element: <Bulletindetail /> },
];

export default routes;
