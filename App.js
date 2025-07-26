// src/App.js
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Header_main from './components/layout/Header_main';
import Header_back from './components/layout/Header_back';
import ListVenue from './pages/venue/ListVenue';
import DetailVenue from './pages/venue/DetailVenue';
import RegionSelectButton from './pages/venue/components/RegionSelectButton';
import RegionSelectSheet from './pages/venue/components/RegionSelectSheet';
import MapPage from './pages/map/MapPage';
import MapTime from './pages/map/components/MapTime';
import MapGrid from './pages/map/components/MapGrid';
import MapWideCard from './pages/map/components/MapWideCard';

import samplePosterItem1 from './assets/samplePosterItem1.png';
import samplePosterItem2 from './assets/samplePosterItem2.png';
import samplePosterItem3 from './assets/samplePosterItem3.png';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Routes>
      {routes.map(({ path, element }, idx) => (
        <Route key={idx} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;

// const profileData = {
//   profileImg: sampleVenueItem4,
//   title: '언드',
//   instagram: '@und_space',
//   address: '경남 거제시 거제대로 3734 지하1층 eeeeeeed  eeeeeddddddddeeeeeee',
// };
