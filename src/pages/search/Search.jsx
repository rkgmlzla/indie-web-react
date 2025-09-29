import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, BellOff, Heart } from 'lucide-react';
import Searchbar from '../../components/ui/searchbar';
//import Tab from '../../components/ui/tab';
import styled from 'styled-components';

import './Search.css';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';

// ✅ API Import
import { searchPerformanceAndVenue, searchArtist } from '../../api/searchApi';
import {
  likeArtist,
  unlikeArtist,
  registerArtistAlert,
  cancelArtistAlert,
} from '../../api/likeApi';


/* ===== styles ===== */
const TabRow = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineGray};
  margin-bottom: 0.5rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ active, theme }) =>
    active ? theme.colors.textRed : theme.colors.darkGray};
  border: none;
  border-bottom: ${({ active, theme }) =>
    active ? `1.5px solid ${theme.colors.textRed}` : 'none'};
  background-color: transparent;
  cursor: pointer;
`;


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

  const [alarmState, setAlarmState] = useState({});
  const [likedState, setLikedState] = useState({});

  // ✅ 다른 페이지들과 동일: 컴포넌트 상단에서 accessToken 한 번 읽음
  const authToken = localStorage.getItem('accessToken');

  // ---- 헬퍼들 ----
  const ensureHttp = (u) => {
    if (!u) return null;
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    if (u.startsWith('//')) return `https:${u}`;
    if (u.startsWith('/')) return `http://localhost:8001${u}`; // 백엔드 상대경로 처리
    return `https://${u}`; // placeholder 같은 문자열 처리
  };

  const formatRange = (startISO, endISO) => {
    if (!startISO && !endISO) return null;
    const toK = (d) =>
      new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return startISO && endISO ? `${toK(startISO)} ~ ${toK(endISO)}` : toK(startISO || endISO);
  };

  // ✅ 공연 → PostItem 포맷 정규화 (이미지/날짜/장소 보강)
  const toPostFromPerformance = (p) => {
    const rawThumb =
      p.poster_url ?? p.posterUrl ?? p.poster ??
      p.image_url ?? p.imageUrl ?? p.image ??
      p.thumbnail_url ?? p.thumbnailUrl ?? p.thumbnail ??
      p.main_image ?? p.mainImage ?? null;

    const start =
      p.start_at ?? p.startAt ??
      p.performance_start_at ?? p.performanceStartAt ??
      p.open_date ?? p.openDate ??
      p.performance_date ?? p.performanceDate ??
      p.date ?? p.startDate ?? null;

    const end =
      p.end_at ?? p.endAt ??
      p.performance_end_at ?? p.performanceEndAt ??
      p.endDate ?? null;

    return {
      id: p.id,
      title: p.title ?? p.performanceTitle ?? p.name ?? '제목 없음',
      content: p.subtitle ?? p.description ?? '',
      thumbnail: ensureHttp(rawThumb) || '/no-image.png',
      dateText: formatRange(start, end),
      author: p.venue_name ?? p.venueName ?? p.venue ?? '',
    };
  };

  const fetchSearchResults = useCallback(async (searchKeyword, currentTab) => {
    if (!searchKeyword) return;

    setConcerts([]);
    setVenues([]);
    setArtists([]);
 

    try {
      if (currentTab === '공연/공연장') {
        const res = await searchPerformanceAndVenue({ keyword: searchKeyword, page: 1, size: 10 });
        const uniqueConcerts = Array.from(new Map((res.performances || []).map(p => [p.id, p])).values());
        const uniqueVenues = Array.from(new Map((res.venues || []).map(v => [v.id, v])).values());
        setConcerts(uniqueConcerts);
        setVenues(uniqueVenues);
      } else if (currentTab === '아티스트') {
        const artistRes = await searchArtist({ keyword: searchKeyword, page: 1, size: 10 });
        setArtists(artistRes);

        // ✅ 상태 초기화
        const initialLiked = {};
        const initialAlarm = {};
        artistRes.forEach((artist) => {
          initialLiked[artist.id] = artist.isLiked;
          initialAlarm[artist.id] = artist.isAlarmEnabled;
        });
        setLikedState(initialLiked);
        setAlarmState(initialAlarm);
      } 
    } catch (err) {
      console.error('📛 검색 API 호출 실패:', err);
    }
  }, []);

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    setRecent((prev) => [newKeyword, ...prev.filter((w) => w !== newKeyword)].slice(0, 10));
    navigate(`/search?keyword=${newKeyword}`, { state: { initialTab: tab } });
    fetchSearchResults(newKeyword, tab);
  };

  useEffect(() => {
    if (keyword) fetchSearchResults(keyword, tab);
  }, [tab, keyword, fetchSearchResults]);

  // ✅ 알림 토글: 다른 상세 페이지들과 동일하게 토큰 스킵 로직 제거
  const handleToggleAlarm = async (artistId) => {
    const isOn = alarmState[artistId];
    try {
      if (isOn) {
        await cancelArtistAlert(artistId, authToken);
      } else {
        await registerArtistAlert(artistId, authToken);
      }
      setAlarmState((prev) => ({ ...prev, [artistId]: !isOn }));
    } catch (err) {
      if (err.response?.status === 409) {
        console.warn('🔔 이미 처리된 상태입니다');
      } else {
        console.error('📛 알림 토글 실패:', err);
      }
    }
  };

  // ✅ 찜 토글: 동일하게 스킵 로직 제거
  const handleToggleLike = async (artistId) => {
    const isOn = likedState[artistId];
    try {
      if (isOn) {
        await unlikeArtist(artistId, authToken);
      } else {
        await likeArtist(artistId, authToken);
      }
      setLikedState((prev) => ({ ...prev, [artistId]: !isOn }));
    } catch (err) {
      if (err.response?.status === 409) {
        console.warn('❤️ 이미 처리된 상태입니다');
      } else {
        console.error('📛 찜 토글 실패:', err);
      }
    }
  };

  return (
    <div className="search-page">
      <Header title="검색" showBack initialSearchTab={tab} showSearch={false} />
      <div style={{ height: '30px' }} />

      <Searchbar value={keyword} onChange={(e) => setKeyword(e.target.value)} onSearch={handleSearch} />
    
      <TabRow>
        <TabButton
          active={tab === '공연/공연장'}
          onclick={()=>setTab('공연/공연장')}>
          공연/공연장
        </TabButton>
        <TabButton
          active={tab === '아티스트'}
          onClick={()=>setTab('아티스트')}>
          아티스트
        </TabButton>
      </TabRow>

      {/* 🔍 최근 검색어 */}
      <div className="recent">
        <h4>최근 검색어</h4>
        <div className="recent-list">
          {recent.slice(0, 4).map((word, idx) => (
            <div key={idx} className="recent-chip" onClick={() => handleSearch(word)}>
              {word}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRecent((prev) => prev.filter((w) => w !== word));
                }}
                className="close-btn"
              >
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
            {concerts.length > 0 ? concerts.map((item) => {
              const postLike = toPostFromPerformance(item);
              return (
                <PostItem
                  key={postLike.id}
                  post={postLike}
                  onClick={() => navigate(`/performance/${item.id}`)}
                />
              );
            }) : <p><strong>{keyword}</strong>와(과) 일치하는 공연이 없습니다.</p>}
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
            <div className="artist-item" key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)}>
              <div className="artist-info">
                <img className="artist-img" src={artist.profile_url || '/no-image.png'} alt={artist.name} />
                <span className="artist-name">{artist.name}</span>
              </div>
              <div className="artist-buttons">
                <div
                  className={`notify ${alarmState[artist.id] ? 'on' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleAlarm(artist.id);
                  }}
                >
                  공연알림 {alarmState[artist.id] ? <Bell size={16} /> : <BellOff size={16} />}
                </div>
                <Heart
                  className={`heart ${likedState[artist.id] ? 'on' : ''}`}
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(artist.id);
                  }}
                />
              </div>
            </div>
          )) : <p><strong>{keyword}</strong>와(과) 일치하는 아티스트가 없습니다.</p>}
        </div>
      )}

      
    </div>
  );
}

export default Search;

