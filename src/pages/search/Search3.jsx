import React, { useState } from 'react';
import './Search3.css';
import { useNavigate } from 'react-router-dom';
import { Bell, BellOff, Heart } from 'lucide-react';
import Searchbar from '../../components/ui/searchbar';
import Tab from '../../components/ui/tab';

const initialArtists = ['김삼문', '김사문', '김오문'];

function Search3({ keyword: initialKeyword = '' }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [tab, setTab] = useState('아티스트');
  const navigate = useNavigate();

  const tabOptions = ['공연/공연장', '아티스트', '자유게시판'];

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === '공연/공연장') {
      navigate(`/search1/result?keyword=${keyword}`);
    } else if (newTab === '자유게시판') {
      navigate(`/search4?keyword=${keyword}`);
    }
    // 현재 탭이 '아티스트'일 때는 현재 페이지 유지
  };

  const [alarmState, setAlarmState] = useState({});
  const [likedState, setLikedState] = useState({});

  const toggleAlarm = (name) => {
    setAlarmState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleLike = (name) => {
    setLikedState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const filtered = initialArtists.filter((name) => name.includes(keyword));

  return (
    <div className="search3-page">
      <Searchbar onSearch={setKeyword} defaultValue={keyword} />
      <Tab options={tabOptions} activeTab={tab} onChange={handleTabChange} />

      {tab === '아티스트' && (
        <div className="artist-list">
          {filtered.map((name, i) => (
            <div className="artist-item" key={i}>
              <div className="artist-info">
                <img className="artist-img" src="..." alt={name} />
                <span className="artist-name">{name}</span>
              </div>

              <div className="artist-buttons">
                <div
                  className={`notify ${alarmState[name] ? 'on' : ''}`}
                  onClick={() => toggleAlarm(name)}>
                  공연알림
                  {alarmState[name] ? (
                    <Bell size={16} />
                  ) : (
                    <BellOff size={16} />
                  )}
                </div>
                <Heart
                  className={`heart ${likedState[name] ? 'on' : ''}`}
                  size={20}
                  onClick={() => toggleLike(name)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search3;
