import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MoreVertical, MessageSquareMore, CornerDownRight } from 'lucide-react';
import './bulletindetail.css';
import Header from '../../components/layout/Header';
import api from '../../lib/api'; // axios 대신 api 인스턴스 사용
import { baseUrl } from '../../api/config'; // baseUrl
function Bulletindetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 데이터
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  // 입력
  const [comment, setComment] = useState('');
  const [replyOpenFor, setReplyOpenFor] = useState(null);
  const [replyText, setReplyText] = useState('');

  // 로그인 유저 (임시)
  const currentUserId = 1;

  // URL 보정 (상대경로 → 절대경로)
  const resolveUrl = (url) =>
    url?.startsWith('http') ? url : `${baseUrl}${url || ''}`;

  // API
  const fetchPost = async () => {
    try {
      const res = await api.get(`/post/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/post/${id}/comment`);
      // spec: { page, totalPages, comment: [...] }
      setComments(res.data.comment || []);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await api.post(`/post/${id}/comment`, { content: comment });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('정말 이 게시물을 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/post/${id}`);
      alert('게시물이 삭제되었습니다.');
      navigate('/bulletinboard');
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/post/${id}/comment/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  // 답글
  const toggleReply = (commentId) => {
    setReplyOpenFor((prev) => (prev === commentId ? null : commentId));
    setReplyText('');
  };

  // ✅ 답글 등록: 본문에 parentCommentId로 전달
  // ✅ 답글 등록: 경로에 parentId 포함 (백엔드 스펙 A안)
  const handleReplySubmit = async (parentId) => {
    const text = replyText.trim();
    if (!text) return;

    try {
      await api.post(`/post/${id}/comment/${parentId}`, { content: text });
      setReplyText('');
      setReplyOpenFor(null);
      fetchComments();
    } catch (err) {
      console.log('[reply FAIL]', {
        status: err?.response?.status,
        data: err?.response?.data,
      });
      alert(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          '답글 등록에 실패했습니다.'
      );
    }
  };

  // 초기 로드
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (post) console.log('post:', post);
  }, [post]);

  // 부모/자식 분리
  const parentComments = comments.filter((c) => !c.parentCommentId);
  const childrenMap = comments.reduce((acc, c) => {
    if (c.parentCommentId) {
      (acc[c.parentCommentId] ||= []).push(c);
    }
    return acc;
  }, {});
  const topLevelCount = parentComments.length;

  return (
    <div className="post-detail">
      <Header title="자유게시판" initialSearchTab="자유게시판" />
      <div style={{ height: '30px' }} />

      {/* 게시글 */}
      {post && (
        <div className="post">
          <div className="post-header">
            <div className="author">
              {post.user?.profile_url && (
                <img
                  src={resolveUrl(post.user.profile_url)}
                  alt="작성자 프로필"
                  className="profile-img"
                />
              )}
              <div className="author-name-time">
                <span className="name">{post.user?.nickname}</span>
                <span className="time">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {post.user?.id === currentUserId && (
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

          {post.images?.length > 0 && (
            <div className="post-image-grid">
              {post.images.map((url, idx) => (
                <img
                  key={idx}
                  src={resolveUrl(url)}
                  alt={`첨부 이미지 ${idx + 1}`}
                  className="post-image"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 댓글 영역 */}
      <div className="comment-area">
        <h4>댓글 {topLevelCount}</h4>

        {parentComments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment-header">
              <div className="left">
                <img
                  src={resolveUrl(c.user?.profile_url)}
                  alt="댓글 작성자 프로필"
                  className="profile-img"
                />
                <div className="comment-info">
                  <span className="comment-author">{c.user?.nickname}</span>
                </div>
              </div>

              <div className="right">
                {/* 답글 버튼 */}
                <button className="reply-btn" onClick={() => toggleReply(c.id)}>
                  <MessageSquareMore size={16} />
                  <span>답글</span>
                </button>

                {/* 본인만 삭제 */}
                {c.user?.id === currentUserId && (
                  <MoreVertical
                    className="menu-icon comment-delete"
                    onClick={() => handleDeleteComment(c.id)}
                  />
                )}
              </div>
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

            {/* 답글 입력창 */}
            {replyOpenFor === c.id && (
              <div className="reply-input">
                <CornerDownRight size={16} className="reply-arrow" />
                <input
                  type="text"
                  placeholder="답글을 입력하세요."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleReplySubmit(c.id)
                  }
                />
                <button
                  disabled={!replyText.trim()}
                  onClick={() => handleReplySubmit(c.id)}>
                  등록
                </button>
              </div>
            )}

            {/* 자식(답글) 목록 */}
            {childrenMap[c.id]?.length > 0 && (
              <div className="reply-list">
                <CornerDownRight size={16} className="reply-arrow" />
                {childrenMap[c.id].map((rc) => (
                  <div key={rc.id} className="reply-item">
                    <div className="comment-header">
                      <div className="left">
                        <img
                          src={resolveUrl(rc.user?.profile_url)}
                          alt="답글 작성자 프로필"
                          className="profile-img"
                        />
                        <div className="comment-info">
                          <span className="comment-author">
                            {rc.user?.nickname}
                          </span>
                        </div>
                      </div>

                      {rc.user?.id === currentUserId && (
                        <MoreVertical
                          className="menu-icon comment-delete"
                          onClick={() => handleDeleteComment(rc.id)}
                        />
                      )}
                    </div>

                    <p className="comment-content">{rc.content}</p>
                    <span className="comment-time">
                      {new Date(rc.created_at).toLocaleString('ko-KR', {
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
            )}
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
