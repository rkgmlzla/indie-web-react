import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';
import { Pencil } from 'lucide-react';
import './bulletinboard.css';
import axios from 'axios';

function BulletinBoard() {
  const navigate = useNavigate();
  const [filter, setFilter] =
    (useState < 'all') | 'myPosts' | ('myComments' > 'all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = 1; // ✅ 추후 전역 상태에서 관리

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/post', {
        params: {
          page: 1,
          size: 50,
          sort: 'recent',
        },
        withCredentials: true, // 쿠키 기반 인증인 경우
      });
      setPosts(response.data.posts);
    } catch (err) {
      console.error('❌ 게시글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === 'myPosts') return post.user_id === currentUserId;
    if (filter === 'myComments') {
      // ⭐️ API 확장 전까진 이건 비워두는 구조
      return false;
    }
    return true;
  });
  return (
    <div className="board">
      <Header title="자유게시판" initialSearchTab="자유게시판" />
      <div style={{ height: '30px' }} />
      <div className="board__tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}>
          전체
        </button>
        <button
          className={filter === 'myPosts' ? 'active' : ''}
          onClick={() => setFilter('myPosts')}>
          내가 쓴 글
        </button>
        <button
          className={filter === 'myComments' ? 'active' : ''}
          onClick={() => setFilter('myComments')}>
          내가 댓글 단 글
        </button>
      </div>
      <ul className="board__list">
        {filteredPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onClick={() => navigate(`/freeboard/${post.id}`)}
          />
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
