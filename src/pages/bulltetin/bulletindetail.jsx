import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { dummyPosts } from '../../data/post';
import './bulletindetail.css';
import Header from '../../components/layout/Header';

function Bulletindetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const currentUser = '춘식이';

  useEffect(() => {
    const found = dummyPosts.find((p) => p.id === Number(id));
    if (found) {
      setPost(found);
      setComments(found.commentList || []); // 게시물별 댓글 초기화
    }
  }, [id]);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      author: currentUser,
      content: comment,
      time: new Date().toLocaleString(),
    };

    setComments((prev) => [...prev, newComment]);
    setComment('');
  };

  return (
    <div className="post-detail">
      <Header title="자유게시판" initialSearchTab="자유게시판" />
      <div style={{ height: '30px' }} />

      {/* 게시글 내용 */}
      {post && (
        <div className="post">
          <div className="author">{post.author}</div>
          <div className="post-meta">
            <span className="post-time">{post.time}</span>
          </div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      )}

      {/* 댓글 영역 */}
      <div className="comment-area">
        <h4>댓글 {comments.length}</h4>
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment-meta">
              <span className="comment-author">{c.author}</span>
              <span className="comment-time">{c.time}</span>
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="comment-input">
        <input
          type="text"
          placeholder="댓글을 입력하세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>등록</button>
      </div>
    </div>
  );
}

export default Bulletindetail;
