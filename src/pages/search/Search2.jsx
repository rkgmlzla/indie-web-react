import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Searchbar from '../../components/ui/searchbar';
import Tab from '../../components/ui/tab';
import './Search2.css';

function Search2() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const keywordFromURL = searchParams.get('keyword') || '';
  const [currentKeyword, setCurrentKeyword] = useState(keywordFromURL);
  const [tab, setTab] = useState('공연/공연장');
  const tabOptions = ['공연/공연장', '아티스트', '자유게시판'];

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === '아티스트') {
      navigate(`/search3?keyword=${currentKeyword}`);
    } else if (newTab === '자유게시판') {
      navigate(`/search4?keyword=${currentKeyword}`);
    }
    // '공연/공연장'은 현재 페이지 유지
  };

  const concerts = [
    { title: '공연1', artist: '아티스트1' },
    { title: '공연2', artist: '아티스트2' },
    { title: '공연3', artist: '아티스트3' },
  ];
  const venues = [
    { name: '공연장1', address: '주소1' },
    { name: '공연장2', address: '주소2' },
    { name: '공연장3', address: '주소3' },
  ];
  const matchedConcerts = concerts.filter(
    (item) =>
      item.title.includes(currentKeyword) ||
      item.artist.includes(currentKeyword)
  );

  const matchedVenues = venues.filter((item) =>
    item.name.includes(currentKeyword)
  );

  return (
    <div className="search2-page">
      <Searchbar onSearch={setCurrentKeyword} defaultValue={currentKeyword} />
      <Tab options={tabOptions} activeTab={tab} onChange={handleTabChange} />

      {tab === '공연/공연장' && (
        <div className="search-section">
          <div className="section">
            <h3>공연</h3>
            {matchedConcerts.length === 0 ? (
              <p>
                <strong>{currentKeyword}</strong>와(과) 일치하는 검색결과가
                없습니다.
              </p>
            ) : (
              matchedConcerts.map((item, i) => (
                <p key={i}>
                  🎤 {item.title} - {item.artist}
                </p>
              ))
            )}
          </div>

          <div className="section">
            <h3>공연장</h3>
            {matchedVenues.length === 0 ? (
              <p>
                <strong>{currentKeyword}</strong>와(과) 일치하는 검색결과가
                없습니다.
              </p>
            ) : (
              matchedVenues.map((item, i) => (
                <div key={i} className="venue-item">
                  <img src={item.thumbnail} alt="공연장" />
                  <span>
                    <strong>{item.name}</strong>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search2;
