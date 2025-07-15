import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
