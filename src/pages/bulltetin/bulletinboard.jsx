import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyPosts } from '../../data/post';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';
import { Pencil } from 'lucide-react';
import './bulletinboard.css';

function BulletinBoard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'myPosts' | 'myComments'

  // 필터에 따라 게시글 선택
  const filteredPosts =
    filter === 'myPosts'
      ? dummyPosts.slice(0, 3)
      : filter === 'myComments'
      ? dummyPosts.filter((post) => post.comments > 0)
      : dummyPosts;

  return (
    <div className="board">
      {/* ✅ 공통 헤더 삽입 */}
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
