import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSampleData } from '../../data/postSampleData';
import { postcommentSampleData } from '../../data/postcommentSampleData';
import { userSampleData } from '../../data/userSampleData';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';
import { Pencil } from 'lucide-react';
import './bulletinboard.css';

function BulletinBoard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'myPosts' | 'myComments'
  const [currentUserId, setCurrentUserId] = useState(1);
  // 필터에 따라 게시글 선택
  const filteredPosts = postSampleData.filter((post) => {
    if (filter === 'myPosts') return post.user_id === currentUserId;
    if (filter === 'myComments') {
      return postcommentSampleData.some(
        (comment) =>
          comment.user_id === currentUserId && comment.post_id === post.id
      );
    }
    return true;
  });
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
