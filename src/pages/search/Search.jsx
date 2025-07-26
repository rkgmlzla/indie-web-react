import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, BellOff, Heart } from 'lucide-react';
import Searchbar from '../../components/ui/searchbar';
import Tab from '../../components/ui/tab';
import './Search.css';
import { dummyPosts } from '../../data/post';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';

const dummyConcerts = [
  { title: '공연1', artist: '아티스트1' },
  { title: '공연2', artist: '아티스트2' },
  { title: '공연3', artist: '아티스트3' },
];

const dummyVenues = [
  { name: '공연장1', address: '주소1' },
  { name: '공연장2', address: '주소2' },
  { name: '공연장3', address: '주소3' },
];

const dummyArtists = ['김삼문', '김사문', '김오문'];

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const keywordFromURL = searchParams.get('keyword') || '';

  const [keyword, setKeyword] = useState(keywordFromURL);
  const [recent, setRecent] = useState([]);
  const [alarmState, setAlarmState] = useState({});
  const [likedState, setLikedState] = useState({});
  const [tab, setTab] = useState('공연/공연장');

  // ⬇️ location 변경 시 tab 상태 초기화 (헤더에서 온 경우)
  useEffect(() => {
    if (location.state?.initialTab) {
      setTab(location.state.initialTab);
    }
  }, [location.state]);

  // ⬇️ URL이 바뀌었을 때 keyword 반영
  useEffect(() => {
    setKeyword(keywordFromURL);
  }, [keywordFromURL]);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    const updated = [newKeyword, ...recent.filter((w) => w !== newKeyword)];
    setRecent(updated.slice(0, 10));

    // ✅ 현재 탭 정보도 함께 전달
    navigate(`/search?keyword=${newKeyword}`, {
      state: { initialTab: tab },
    });
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const toggleAlarm = (name) => {
    setAlarmState((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleLike = (name) => {
    setLikedState((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const matchedConcerts = dummyConcerts.filter(
    (item) => item.title.includes(keyword) || item.artist.includes(keyword)
  );

  const matchedVenues = dummyVenues.filter((item) =>
    item.name.includes(keyword)
  );

  const matchedArtists = dummyArtists.filter((name) => name.includes(keyword));

  const matchedPosts = dummyPosts.filter(
    (post) => post.title.includes(keyword) || post.content.includes(keyword)
  );

  return (
    <div className="search-page">
      <Header title="검색" showBack initialSearchTab={tab} showSearch={false} />
      <div style={{ height: '30px' }} />
      <Searchbar
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={handleSearch}
      />

      <Tab
        options={['공연/공연장', '아티스트', '자유게시판']}
        activeTab={tab}
        onChange={handleTabChange}
      />

      {/* 🔍 최근 검색어 */}
      <div className="recent">
        <h4>최근 검색어</h4>
        <div className="recent-list">
          {recent.map((word, idx) => (
            <div
              key={idx}
              className="recent-chip"
              onClick={() => handleSearch(word)}>
              {word}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRecent((prev) => prev.filter((w) => w !== word));
                }}
                className="close-btn">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🎤 공연/공연장 */}
      {keyword && tab === '공연/공연장' && (
        <div className="search-section">
          <div className="section">
            <h3>공연</h3>
            {matchedConcerts.length === 0 ? (
              <p>
                <strong>{keyword}</strong>와(과) 일치하는 공연이 없습니다.
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
                <strong>{keyword}</strong>와(과) 일치하는 공연장이 없습니다.
              </p>
            ) : (
              matchedVenues.map((item, i) => (
                <div key={i} className="venue-item">
                  <img src="https://via.placeholder.com/40" alt="공연장" />
                  <span>
                    <strong>{item.name}</strong>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 🎤 아티스트 */}
      {keyword && tab === '아티스트' && (
        <div className="artist-list">
          {matchedArtists.length === 0 ? (
            <p>
              <strong>{keyword}</strong>와(과) 일치하는 아티스트가 없습니다.
            </p>
          ) : (
            matchedArtists.map((name, i) => (
              <div className="artist-item" key={i}>
                <div className="artist-info">
                  <img
                    className="artist-img"
                    src="https://via.placeholder.com/40"
                    alt={name}
                  />
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
            ))
          )}
        </div>
      )}

      {/* 📝 자유게시판 */}
      {keyword && tab === '자유게시판' && (
        <div className="freeboard-section">
          {matchedPosts.length === 0 ? (
            <p>
              <strong>{keyword}</strong>에 대한 자유게시판 게시물이 없습니다.
            </p>
          ) : (
            <ul className="board__list">
              {matchedPosts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/freeboard/${post.id}`)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
