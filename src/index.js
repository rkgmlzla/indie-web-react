import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css';
import reportWebVitals from './reportWebVitals';

import App from './App'; // App에 Routes 구성되어 있어야 함
import Layout from './components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import { BrowserRouter } from 'react-router-dom'; // ✅ 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {' '}
      {/* ✅ 라우터 추가 */}
      <ThemeProvider theme={theme}>
        <Layout>
          <App />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
