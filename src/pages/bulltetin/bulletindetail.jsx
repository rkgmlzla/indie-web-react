import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, MoreVertical } from 'lucide-react';
import { postSampleData } from '../../data/postSampleData';
import { postcommentSampleData } from '../../data/postcommentSampleData';
import { userSampleData } from '../../data/userSampleData';
import './bulletindetail.css';
import Header from '../../components/layout/Header';

function Bulletindetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const currentUserId = 1;

  const getNicknameById = (uid) => {
    return userSampleData.find((u) => u.id === uid)?.nickname || '알 수 없음';
  };
  const getProfileImageById = (uid) => {
    return userSampleData.find((u) => u.id === uid)?.profile;
  };
  useEffect(() => {
    const postItem = postSampleData.find((p) => p.id === Number(id));
    const postComments = postcommentSampleData.filter(
      (c) => c.post_id === Number(id)
    );
    if (postItem) {
      setPost(postItem);
      setComments(postComments);
    }
  }, [id]);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      post_id: Number(id),
      user_id: currentUserId,
      content: comment,
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
    setComment('');
  };

  const handleDeletePost = () => {
    if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
      // 실제 삭제 로직은 서버와 연동 필요
      alert('게시물이 삭제되었습니다.');
      navigate('/bulletinboard');
    }
  };
  const handleDeleteComment = (commentId) => {
    if (window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  };

  return (
    <div className="post-detail">
      <Header title="자유게시판" initialSearchTab="자유게시판" />
      <div style={{ height: '30px' }} />

      {/* 게시글 내용 */}
      {post && (
        <div className="post">
          <div className="post-header">
            <div className="author">
              <img
                src={getProfileImageById(post.user_id)}
                alt="작성자 프로필"
                className="profile-img"
              />
              <div className="author-name-time">
                <span className="name">{getNicknameById(post.user_id)}</span>
                <span className="time">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            {post.user_id === currentUserId && (
              <div className="post-menu">
                <MoreVertical
                  className="menu-icon"
                  onClick={handleDeletePost}
                />
              </div>
            )}
          </div>

          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="첨부 이미지" />}
        </div>
      )}

      {/* 댓글 영역 */}
      <div className="comment-area">
        <h4>댓글 {comments.length}</h4>
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment-header">
              <div className="left">
                <img
                  src={getProfileImageById(c.user_id)}
                  alt="댓글 작성자 프로필"
                  className="profile-img"
                />
                <div className="comment-info">
                  <span className="comment-author">
                    {getNicknameById(c.user_id)}
                  </span>
                </div>
              </div>

              {/* ✅ 내가 쓴 댓글일 경우 삭제 아이콘 */}
              {c.user_id === currentUserId && (
                <MoreVertical
                  className="menu-icon comment-delete"
                  onClick={() => handleDeleteComment(c.id)}
                />
              )}
            </div>

            <p className="comment-content">{c.content}</p>
            <span className="comment-time">
              {new Date(c.created_at).toLocaleString('ko-KR', {
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
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
