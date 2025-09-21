import HomePage from './pages/home'; // ✅ index.jsx로 변경됨
import CalendarPage from './pages/calendar'; // index.jsx로 되어 있으므로 폴더만 import
import NotificationPage from './pages/notification';
import PerformanceListPage from './pages/performance/PerformanceListPage';
import PerformanceDetailPage from './pages/performance/PerformanceDetailPage';
import ArtistListPage from './pages/artist/ArtistListPage';
import ArtistDetailPage from './pages/artist/ArtistDetailPage';
import FavoritePage from './pages/favorite/FavoritePage';
import React from 'react';
import { Navigate } from 'react-router-dom';   // ⬅️ 추가
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
import VenueReviewListPage from './pages/review/VenueReviewListPage';
import ReviewWritePage from './pages/review/ReviewWritePage';
import StampsPage from "./pages/stamp/StampPage"; // 실제 페이지 컴포넌트

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/notification', element: <NotificationPage /> },
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
  { path: '/login/success', element: <LoginSuccess/> }, 
  { path: '/venue/:id/review', element: <VenueReviewListPage /> },
  { path: '/review/write', element: <ReviewWritePage /> },
  { path: '/stamps', element: <StampsPage /> },
  { path: '/stamp', element: <Navigate to="/stamps" replace /> }
  
];

export default routes;
export default routes;
