// ✅ src/routes.js
import React from 'react';

import HomePage from './pages/home';
import CalendarPage from './pages/calendar';
import NotificationPage from './pages/notification';

import PerformanceListPage from './pages/performance/PerformanceListPage';
import PerformanceDetailPage from './pages/performance/PerformanceDetailPage';

import ArtistListPage from './pages/artist/ArtistListPage';
import ArtistDetailPage from './pages/artist/ArtistDetailPage';

import FavoritePage from './pages/favorite/FavoritePage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/mypage/MyPage';
import Search from './pages/search/Search';
import BulletinBoard from './pages/bulltetin/bulletinboard';
import BulletinWrite from './pages/bulltetin/bulletinwrite';
import Bulletindetail from './pages/bulltetin/bulletindetail';
import MapPage from './pages/map/MapPage';

import ListVenue from './pages/venue/ListVenue';
import DetailVenue from './pages/venue/DetailVenue';

import LoginSuccess from './pages/login/LoginSuccess';
import PickDetailPage from './pages/pick/PickDetailPage';

// ⬇️ 추가
import StampPage from './pages/stamp/StampPage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/notification', element: <NotificationPage /> },
  { path: '/notifications', element: <NotificationPage /> },
  { path: '/calendar', element: <CalendarPage /> },
  { path: '/performance', element: <PerformanceListPage /> },
  { path: '/performance/:id', element: <PerformanceDetailPage /> },

  { path: '/artist', element: <ArtistListPage /> },
  { path: '/artist/:id', element: <ArtistDetailPage /> },

  { path: '/favorite', element: <FavoritePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/search', element: <Search /> },
  { path: '/bulletinwrite', element: <BulletinWrite /> },
  { path: '/bulletinboard', element: <BulletinBoard /> },
  { path: '/freeboard/:id', element: <Bulletindetail /> },
  { path: '/map', element: <MapPage /> },

  { path: '/venue', element: <ListVenue /> },
  { path: '/venue/:id', element: <DetailVenue /> },

  { path: '/login/success', element: <LoginSuccess /> },
  { path: '/pick/:id', element: <PickDetailPage /> },

  // ⬇️ 추가
  { path: '/stamp', element: <StampPage /> },
];

export default routes;
