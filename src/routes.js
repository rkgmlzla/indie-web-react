// src/routes.js
import HomePage from './pages/home';
import TestPage_yebin from './pages/TestPage_yebin';


// ...

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/header-test', element: <TestPage_yebin /> },

  // ...
];

export default routes;
