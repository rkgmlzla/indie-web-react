import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, BellOff, Heart } from 'lucide-react';
import Searchbar from '../../components/ui/searchbar';
import Tab from '../../components/ui/tab';
import './Search.css';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';

// ✅ API Import
import { searchPerformanceAndVenue, searchArtist, searchPost } from '../../api/searchApi';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const keywordFromURL = searchParams.get('keyword') || '';

  const [keyword, setKeyword] = useState(keywordFromURL);
  const [recent, setRecent] = useState([]);
  const [tab, setTab] = useState(location.state?.initialTab || '공연/공연장');

  const [concerts, setConcerts] = useState([]);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const [posts, setPosts] = useState([]);

  const [alarmState, setAlarmState] = useState({});
  const [likedState, setLikedState] = useState({});

  // ✅ API 호출 함수
  const fetchSearchResults = useCallback(async (searchKeyword, currentTab) => {
    if (!searchKeyword) return;

    setConcerts([]);
    setVenues([]);
    setArtists([]);
    setPosts([]);

    try {
      if (currentTab === '공연/공연장') {
        const res = await searchPerformanceAndVenue({ keyword: searchKeyword, page: 1, size: 10 });
        const uniqueConcerts = Array.from(new Map((res.performances || []).map(p => [p.id, p])).values());
        const uniqueVenues = Array.from(new Map((res.venues || []).map(v => [v.id, v])).values());
        setConcerts(uniqueConcerts);
        setVenues(uniqueVenues);
      } else if (currentTab === '아티스트') {
        const artistRes = await searchArtist({ keyword: searchKeyword, page: 1, size: 10 });
        setArtists(Array.isArray(artistRes) ? artistRes : []);
      } else if (currentTab === '자유게시판') {
        const postRes = await searchPost({ keyword: searchKeyword, page: 1, size: 10 });
        setPosts(Array.isArray(postRes) ? postRes : []);
      }
    } catch (err) {
      console.error('📛 검색 API 호출 실패:', err);
    }
  }, []);

  // ✅ 검색 버튼 클릭 시
  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    setRecent((prev) => [newKeyword, ...prev.filter((w) => w !== newKeyword)].slice(0, 10));
    navigate(`/search?keyword=${newKeyword}`, { state: { initialTab: tab } });
    fetchSearchResults(newKeyword, tab);
  };

  // ✅ 탭 변경 시 자동 검색
  useEffect(() => {
    if (keyword) fetchSearchResults(keyword, tab);
  }, [tab, keyword, fetchSearchResults]);

  const toggleAlarm = (id) => setAlarmState((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleLike = (id) => setLikedState((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="search-page">
      <Header title="검색" showBack initialSearchTab={tab} showSearch={false} />
      <div style={{ height: '30px' }} />

      <Searchbar value={keyword} onChange={(e) => setKeyword(e.target.value)} onSearch={handleSearch} />
      <Tab options={['공연/공연장', '아티스트', '자유게시판']} activeTab={tab} onChange={setTab} />

      {/* 🔍 최근 검색어 */}
      <div className="recent">
        <h4>최근 검색어</h4>
        <div className="recent-list">
          {recent.map((word, idx) => (
            <div key={idx} className="recent-chip" onClick={() => handleSearch(word)}>
              {word}
              <button onClick={(e) => { e.stopPropagation(); setRecent((prev) => prev.filter((w) => w !== word)); }} className="close-btn">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* 🎤 공연/공연장 */}
      {keyword && tab === '공연/공연장' && (
        <div className="search-section">
          <div className="section">
            <h3>공연</h3>
            {concerts.length > 0 ? concerts.map((item) => (
              <PostItem
                key={item.id}
                performance={item}   // ✅ 공연 데이터 전달
                onClick={() => navigate(`/performance/${item.id}`)}
              />
            )) : <p><strong>{keyword}</strong>와(과) 일치하는 공연이 없습니다.</p>}
          </div>

          <div className="section">
            <h3>공연장</h3>
            {venues.length > 0 ? venues.map((item) => (
              <div key={item.id} className="venue-item" onClick={() => navigate(`/venue/${item.id}`)}>
                <img src={item.image_url || '/no-image.png'} alt={item.name} />
                <span>{item.name}</span>
              </div>
            )) : <p><strong>{keyword}</strong>와(과) 일치하는 공연장이 없습니다.</p>}
          </div>
        </div>
      )}

      {/* 🎤 아티스트 */}
      {keyword && tab === '아티스트' && (
        <div className="artist-list">
          {artists.length > 0 ? artists.map((artist) => (
            <div className="artist-item" key={artist.id}>
              <div className="artist-info">
                <img className="artist-img" src={artist.profile_url || '/no-image.png'} alt={artist.name} />
                <span className="artist-name">{artist.name}</span>
              </div>
              <div className="artist-buttons">
                <div className={`notify ${alarmState[artist.id] ? 'on' : ''}`} onClick={() => toggleAlarm(artist.id)}>
                  공연알림 {alarmState[artist.id] ? <Bell size={16} /> : <BellOff size={16} />}
                </div>
                <Heart className={`heart ${likedState[artist.id] ? 'on' : ''}`} size={20} onClick={() => toggleLike(artist.id)} />
              </div>
            </div>
          )) : <p><strong>{keyword}</strong>와(과) 일치하는 아티스트가 없습니다.</p>}
        </div>
      )}

      {/* 📝 자유게시판 */}
      {keyword && tab === '자유게시판' && (
        <div className="freeboard-section">
          {posts.length > 0 ? posts.map((post) => (
            <PostItem key={post.id} post={post} onClick={() => navigate(`/freeboard/${post.id}`)} />
          )) : <p><strong>{keyword}</strong>에 대한 자유게시판 게시물이 없습니다.</p>}
        </div>
      )}
    </div>
  );
}

export default Search;
