// src/routes.js
import HomePage from './pages/home';
import PerformanceListPage from './pages/performance/PerformanceListPage';
import PerformanceDetailPage from './pages/performance/PerformanceDetailPage';
import ArtistListPage from './pages/artist/ArtistListPage';
import ArtistDetailPage from './pages/artist/ArtistDetailPage';
import FavoritePage from './pages/favorite/FavoritePage';

// ...

const routes = [
  { path: '/performance', element: <PerformanceListPage /> },
  { path: '/performance/:id', element: <PerformanceDetailPage /> },
  { path: '/artist', element: <ArtistListPage /> },
  { path: '/artist/:id', element: <ArtistDetailPage /> },
  { path: '/favorite', element: <FavoritePage /> },

  // ...
];

export default routes;
