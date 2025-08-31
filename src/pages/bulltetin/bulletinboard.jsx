import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';
import { Pencil } from 'lucide-react';
import './bulletinboard.css';

import http from '../../api/http';
import { fetchUserInfo } from '../../api/userApi';

function BulletinBoard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');           // 'all' | 'myPosts' | 'myComments'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meId, setMeId] = useState(null);                // 로그인 유저 id (없으면 null)
  const [meReady, setMeReady] = useState(false);         // meId 로딩 완료 여부

  // 내 정보 로딩
  useEffect(() => {
    (async () => {
      try {
        const me = await fetchUserInfo();                // /user/me (쿠키 인증)
        setMeId(me?.id ?? null);
      } catch {
        setMeId(null);
      } finally {
        setMeReady(true);
      }
    })();
  }, []);

  // 숫자 비교 보조
  const toNum = (v) => Number(v ?? NaN);
  const isMine = (ownerId, flag) => flag === true || (meId != null && toNum(ownerId) === toNum(meId));

  const fetchPosts = async () => {
    try {
      setLoading(true);

      // 1) 전체 목록
      const listRes = await http.get('/post', {
        params: { page: 1, size: 50, sort: 'recent' },
      });
      const all = Array.isArray(listRes.data?.posts) ? listRes.data.posts : [];

      // 'all' 은 바로 끝
      if (filter === 'all') {
        setPosts(all);
        return;
      }

      // me 정보 아직 없으면 계산 못함
      if (!meReady) return;

      // 2) 내 글 필터
      if (filter === 'myPosts') {
        // 상세에서 isMine 또는 user.id 확인
        const details = await Promise.allSettled(
          all.map((p) => http.get(`/post/${p.id}`))
        );

        const myIdSet = new Set(
          details
            .filter((r) => r.status === 'fulfilled')
            .map((r) => r.value.data)
            .filter((d) => isMine(d?.user?.id, d?.isMine))
            .map((d) => d.id)
        );

        setPosts(all.filter((p) => myIdSet.has(p.id)));
        return;
      }

      // 3) 내가 댓글 단 글
      if (filter === 'myComments') {
        const withMine = await Promise.allSettled(
          all.map(async (post) => {
            const res = await http.get(`/post/${post.id}/comment`);
            const list = Array.isArray(res.data?.comment) ? res.data.comment : [];
            const mineExists = list.some((c) => isMine(c?.user?.id, c?.isMine));
            return mineExists ? post : null;
          })
        );

        setPosts(
          withMine
            .filter((r) => r.status === 'fulfilled' && r.value)
            .map((r) => r.value)
        );
        return;
      }
    } catch (err) {
      console.error('❌ 게시글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // meReady 가 false일 땐 기다렸다가 실행
    if (filter === 'all') {
      fetchPosts();
    } else if (meReady) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, meReady]);

  return (
    <div className="board">
      <Header title="자유게시판" initialSearchTab="자유게시판" />
      <div style={{ height: '30px' }} />

      <div className="board__tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          전체
        </button>
        <button className={filter === 'myPosts' ? 'active' : ''} onClick={() => setFilter('myPosts')}>
          내가 쓴 글
        </button>
        <button className={filter === 'myComments' ? 'active' : ''} onClick={() => setFilter('myComments')}>
          내가 댓글 단 글
        </button>
      </div>

      {loading && <div className="board__loading">불러오는 중…</div>}

      <ul className="board__list">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onClick={() => navigate(`/freeboard/${post.id}`)} />
        ))}
      </ul>

      <button className="write-btn" onClick={() => navigate('/bulletinwrite')}>
        <Pencil size={16} strokeWidth={2} />
        글쓰기
      </button>
    </div>
  );
}

export default BulletinBoard;
