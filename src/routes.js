import HomePage from './pages/home'; // ✅ index.jsx로 변경됨
import CalendarPage from './pages/calendar'; // index.jsx로 되어 있으므로 폴더만 import
import NotificationPage from './pages/notification';
import PerformanceListPage from './pages/performance/PerformanceListPage';
import PerformanceDetailPage from './pages/performance/PerformanceDetailPage';
import ArtistListPage from './pages/artist/ArtistListPage';
import ArtistDetailPage from './pages/artist/ArtistDetailPage';
import FavoritePage from './pages/favorite/FavoritePage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/notification', element: <NotificationPage /> },
  { path: '/calendar', element: <CalendarPage /> }, // ✅ 캘린더 라우트 추가
  { path: '/performance', element: <PerformanceListPage /> },
  { path: '/performance/:id', element: <PerformanceDetailPage /> },
  { path: '/artist', element: <ArtistListPage /> },
  { path: '/artist/:id', element: <ArtistDetailPage /> },
  { path: '/favorite', element: <FavoritePage /> },
];

export default routes;
