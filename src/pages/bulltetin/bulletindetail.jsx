import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search, MoreVertical } from 'lucide-react';
import axios from 'axios';
import './bulletindetail.css';
import Header from '../../components/layout/Header';

function Bulletindetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const currentUserId = 1; // ✅ 로그인 유저 ID (임시)

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/post/${id}`, { withCredentials: true });
      setPost(res.data);
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comment/post/${id}`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await axios.post(
        '/comment',
        {
          post_id: Number(id),
          content: comment,
        },
        { withCredentials: true }
      );
      setComment('');
      fetchComments(); // 댓글 다시 불러오기
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('정말 이 게시물을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`/post/${id}`, { withCredentials: true });
      alert('게시물이 삭제되었습니다.');
      navigate('/bulletinboard');
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`/comment/${commentId}`, { withCredentials: true });
      fetchComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

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
                src={post.user.profile_url}
                alt="작성자 프로필"
                className="profile-img"
              />
              <div className="author-name-time">
                <span className="name">{post.user.nickname}</span>
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
          {post.imageURLs?.length > 0 &&
            post.imageURLs.map((url, idx) => (
              <img key={idx} src={url} alt={`첨부 이미지 ${idx + 1}`} />
            ))}
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
                  src={c.user.profile_url}
                  alt="댓글 작성자 프로필"
                  className="profile-img"
                />
                <div className="comment-info">
                  <span className="comment-author">{c.user.nickname}</span>
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
