import HomePage from './pages/home'; // ✅ index.jsx로 변경됨
import CalendarPage from './pages/calendar'; // index.jsx로 되어 있으므로 폴더만 import
import NotificationPage from './pages/notification';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/notification', element: <NotificationPage /> },
  { path: '/calendar', element: <CalendarPage /> }, // ✅ 캘린더 라우트 추가
];

export default routes;
