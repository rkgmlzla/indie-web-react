import React from 'react';
import Header_basic from '../components/layout/Header_basic';

function HeaderTestPage() {
  return (
    <>
      <Header_basic title="테스트 헤더" />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        헤더만 빠르게 확인하는 테스트 페이지입니다.
      </main>
    </>
  );
}

export default HeaderTestPage;
