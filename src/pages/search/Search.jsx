import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, BellOff, Heart } from 'lucide-react';
import Searchbar from '../../components/ui/searchbar';
import Tab from '../../components/ui/tab';
import './Search.css';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';
import { performanceSampleData } from '../../data/performanceSampleData';
import { venueSampleData } from '../../data/venueSampleData';
import { artistSampleData } from '../../data/artistSampleData';
import { postSampleData } from '../../data/postSampleData';
import { userSampleData } from '../../data/userSampleData';
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

  const matchedConcerts = performanceSampleData.filter((item) =>
    item.title.includes(keyword)
  );

  const matchedVenues = venueSampleData.filter((venue) =>
    venue.title.includes(keyword)
  );

  const matchedArtists = artistSampleData.filter((artist) =>
    artist.name.includes(keyword)
  );
  const getNicknameById = (uid) => {
    return userSampleData.find((u) => u.id === uid)?.nickname || '알 수 없음';
  };
  const matchedPosts = postSampleData.filter(
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
                <div
                  key={i}
                  className="concert-item"
                  onClick={() => navigate(`/performance/${item.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    marginBottom: '12px',
                  }}>
                  <img
                    src={item.posterUrl || 'https://via.placeholder.com/60x80'}
                    alt={item.title}
                    style={{
                      width: '60px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    {item.title}
                  </span>
                </div>
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
                <div
                  key={i}
                  className="venue-item"
                  onClick={() => navigate(`/venue/${item.id}`)}
                  style={{ cursor: 'pointer' }}>
                  <img
                    src={item.profileImg || 'https://via.placeholder.com/40'}
                    alt={item.title}
                  />
                  <span>
                    <strong>{item.title}</strong>
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
            matchedArtists.map((artist, i) => (
              <div className="artist-item" key={i}>
                <div className="artist-info">
                  <img
                    className="artist-img"
                    src={artist.profileImageUrl}
                    alt={artist.name}
                  />
                  <span className="artist-name">{artist.name}</span>
                </div>

                <div className="artist-buttons">
                  <div
                    className={`notify ${alarmState[artist.id] ? 'on' : ''}`}
                    onClick={() => toggleAlarm(artist.id)}>
                    공연알림
                    {alarmState[artist.id] ? (
                      <Bell size={16} />
                    ) : (
                      <BellOff size={16} />
                    )}
                  </div>
                  <Heart
                    className={`heart ${likedState[artist.id] ? 'on' : ''}`}
                    size={20}
                    onClick={() => toggleLike(artist.id)}
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
                  post={{
                    ...post,
                    author: getNicknameById(post.user_id), // ✅ 닉네임 전달
                    comments: postSampleData.filter(
                      (c) => c.post_id === post.id
                    ).length,
                  }}
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
