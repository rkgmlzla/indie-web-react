import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import ScrollToTop from './components/layout/ScrollToTop';
import BottomNav from "./components/layout/BottomNav";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;