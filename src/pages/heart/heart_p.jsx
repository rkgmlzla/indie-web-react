import React, { useState } from 'react';
import Tab from '../../components/ui/tab'; // 네가 만든 탭 컴포넌트
import ConcertCard from '../../components/ui/con_card';
import './heart_p.css';

function Heartp() {
  const [tab, setTab] = useState('공연');
  const tabOptions = ['공연', '아티스트'];

  return (
    <div className="heart-page">
      <Tab options={tabOptions} activeTab={tab} onChange={setTab} />

      <div className="tab-content">
        {tab === '공연' && (
          <ConcertCard
            title="A Place Called Sound"
            subtitle="코멘터리 사운드"
            date="2025.05.06 화요일"
            liked={true}
            onLikeToggle={() => console.log('❤️ 누름')}
          />
        )}

        {tab === '아티스트' && <p>여기에 아티스트 좋아요 리스트 표시</p>}
      </div>
    </div>
  );
}

export default Heartp;
