// src/routes.js
import HomePage from './pages/home';
import PerformanceListPage from './pages/performance/PerformanceListPage';

// ...

const routes = [
  { path: '/', element: <PerformanceListPage /> },

  // ...
];

export default routes;
