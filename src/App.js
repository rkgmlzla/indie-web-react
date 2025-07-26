import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
