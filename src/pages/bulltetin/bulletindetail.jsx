import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageSquareMore, CornerDownRight, Pencil, Check, X, Trash2 } from 'lucide-react';
import './bulletindetail.css';
import Header from '../../components/layout/Header';
import http from '../../api/http';
import { fetchUserInfo } from '../../api/userApi';
import { baseUrl } from '../../api/config';

function Bulletindetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [meId, setMeId] = useState(null);

  const [comment, setComment] = useState('');
  const [replyOpenFor, setReplyOpenFor] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // 로그인 유저
  useEffect(() => {
    (async () => {
      try {
        const me = await fetchUserInfo();
        setMeId(me?.id ?? null);
      } catch {
        setMeId(null);
      }
    })();
  }, []);

  const resolveUrl = (url) => (url?.startsWith?.('http') ? url : `${baseUrl}${url || ''}`);

  const fetchPost = async () => {
    try {
      const res = await http.get(`/post/${id}`);
      setPost(res.data);
      return true;
    } catch (error) {
      if (error?.response?.status === 404) {
        alert('없는 게시물입니다.');
        navigate('/bulletinboard', { replace: true });
      } else {
        console.error('게시물 불러오기 실패:', error);
      }
      return false;
    }
  };

  const fetchComments = async () => {
    try {
      const res = await http.get(`/post/${id}/comment`);
      setComments(res.data.comment || []);
    } catch (error) {
      if (error?.response?.status !== 404) {
        console.error('댓글 불러오기 실패:', error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (isSubmitting) return;
    const text = comment.trim();
    if (!text) return;

    setIsSubmitting(true);
    try {
      await http.post(`/post/${id}/comment`, { content: text });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('정말 이 게시물을 삭제하시겠습니까?')) return;
    try {
      await http.delete(`/post/${id}`);
      alert('게시물이 삭제되었습니다.');
      navigate('/bulletinboard', { replace: true });
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;
    try {
      await http.delete(`/post/${id}/comment/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const toggleReply = (commentId) => {
    setReplyOpenFor((prev) => (prev === commentId ? null : commentId));
    setReplyText('');
  };

  const handleReplySubmit = async (parentId) => {
    const text = replyText.trim();
    if (!text) return;
    if (isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      await http.post(`/post/${id}/comment/${parentId}`, { content: text });
      setReplyText('');
      setReplyOpenFor(null);
      fetchComments();
    } catch (err) {
      console.log('[reply FAIL]', { status: err?.response?.status, data: err?.response?.data });
      alert(err?.response?.data?.message || '답글 등록에 실패했습니다.');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const beginEditPost = () => {
    if (!post) return;
    setEditTitle(post.title || '');
    setEditContent(post.content || '');
    setIsEditingPost(true);
  };
  const cancelEditPost = () => {
    setIsEditingPost(false);
    setEditTitle('');
    setEditContent('');
  };
  const savePost = async () => {
    try {
      await http.put(`/post/${id}`, { title: editTitle, content: editContent });
      setIsEditingPost(false);
      await fetchPost();
    } catch (e) {
      alert('게시물 수정에 실패했습니다.');
      console.error(e);
    }
  };

  const beginEditComment = (c) => {
    setEditingCommentId(c.id);
    setEditingText(c.content || '');
  };
  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingText('');
  };
  const saveComment = async (cid) => {
    try {
      await http.patch(`/post/${id}/comment/${cid}`, { content: editingText });
      setEditingCommentId(null);
      setEditingText('');
      await fetchComments();
    } catch (e) {
      alert('댓글 수정에 실패했습니다.');
      console.error(e);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      const ok = await fetchPost();
      if (alive && ok) await fetchComments();
    })();
    return () => { alive = false; };
  }, [id]);

  const parentComments = comments.filter((c) => !c.parentCommentId);
  const childrenMap = comments.reduce((acc, c) => {
    if (c.parentCommentId) (acc[c.parentCommentId] ||= []).push(c);
    return acc;
  }, {});
  const topLevelCount = parentComments.length;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleCommentSubmit(); }
  };

  // 공통: “내 것인지” 판단자
  const isMine = (ownerId, flagIsMine) =>
    flagIsMine === true || Number(ownerId) === Number(meId);

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
                <img src={resolveUrl(post.user.profile_url)} alt="작성자 프로필" className="profile-img" />
              )}
              <div className="author-name-time">
                <span className="name">{post.user?.nickname}</span>
                <span className="time">{new Date(post.created_at).toLocaleString()}</span>
              </div>
            </div>

            {isMine(post?.user?.id, post?.isMine) && (
              <div className="post-menu">
                {isEditingPost ? (
                  <div className="icon-group">
                    <button className="icon-btn" title="저장" onClick={savePost}><Check /></button>
                    <button className="icon-btn" title="취소" onClick={cancelEditPost}><X /></button>
                  </div>
                ) : (
                  <div className="icon-group">
                    <button className="icon-btn" title="수정" onClick={beginEditPost}><Pencil /></button>
                    <button className="icon-btn" title="삭제" onClick={handleDeletePost}><Trash2 /></button>
                  </div>
                )}
              </div>
            )}
          </div>

          {isEditingPost ? (
            <div className="post-edit">
              <input
                className="post-title-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="제목"
              />
              <textarea
                className="post-content-input"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="내용"
                rows={5}
              />
            </div>
          ) : (
            <>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </>
          )}

          {post.images?.length > 0 && (
            <div className="post-image-grid">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={resolveUrl(typeof img === 'string' ? img : img?.image_url)}
                  alt={`첨부 이미지 ${idx + 1}`}
                  className="post-image"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 댓글 */}
      <div className="comment-area">
        <h4>댓글 {topLevelCount}</h4>

        {parentComments.map((c) => (
          <div key={c.id} className="comment">
            <div className="comment-header">
              <div className="left">
                <img src={resolveUrl(c.user?.profile_url)} alt="댓글 작성자 프로필" className="profile-img" />
                <div className="comment-info">
                  <span className="comment-author">{c.user?.nickname}</span>
                </div>
              </div>

              <div className="right">
                <button className="reply-btn" onClick={() => toggleReply(c.id)}>
                  <MessageSquareMore size={16} /><span>답글</span>
                </button>

                {isMine(c?.user?.id, c?.isMine) && (
                  <div className="icon-group">
                    {editingCommentId === c.id ? (
                      <>
                        <button className="icon-btn" onClick={() => saveComment(c.id)} aria-label="저장"><Check /></button>
                        <button className="icon-btn" onClick={cancelEditComment} aria-label="취소"><X /></button>
                      </>
                    ) : (
                      <>
                        <button className="icon-btn" onClick={() => beginEditComment(c)} aria-label="수정"><Pencil /></button>
                        <button className="icon-btn" onClick={() => handleDeleteComment(c.id)} aria-label="삭제"><Trash2 /></button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {editingCommentId === c.id ? (
              <input
                className="comment-edit-input"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveComment(c.id)}
                autoFocus
              />
            ) : (
              <p className="comment-content">{c.content}</p>
            )}

            <span className="comment-time">
              {new Date(c.created_at).toLocaleString('ko-KR', {
                month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
              })}
            </span>

            {/* 대댓글 */}
            {childrenMap[c.id]?.length > 0 && (
              <div className="replies-wrap">
                <div className="reply-arrow-wrap"><CornerDownRight className="reply-arrow" /></div>
                <div className="reply-list">
                  {childrenMap[c.id].map((rc) => (
                    <div key={rc.id} className="reply-item">
                      <div className="comment-header">
                        <div className="left">
                          <img src={resolveUrl(rc.user?.profile_url)} alt="답글 작성자 프로필" className="profile-img" />
                          <div className="comment-info"><span className="comment-author">{rc.user?.nickname}</span></div>
                        </div>

                        {isMine(rc?.user?.id, rc?.isMine) && (
                          <div className="right">
                            <div className="icon-group">
                              {editingCommentId === rc.id ? (
                                <>
                                  <button className="icon-btn" onClick={() => saveComment(rc.id)} aria-label="저장"><Check /></button>
                                  <button className="icon-btn" onClick={cancelEditComment} aria-label="취소"><X /></button>
                                </>
                              ) : (
                                <>
                                  <button className="icon-btn" onClick={() => beginEditComment(rc)} aria-label="수정"><Pencil /></button>
                                  <button className="icon-btn" onClick={() => handleDeleteComment(rc.id)} aria-label="삭제"><Trash2 /></button>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {editingCommentId === rc.id ? (
                        <input
                          className="comment-edit-input"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveComment(rc.id)}
                          autoFocus
                        />
                      ) : (
                        <p className="comment-content">{rc.content}</p>
                      )}

                      <span className="comment-time">
                        {new Date(rc.created_at).toLocaleString('ko-KR', {
                          month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 답글 입력창 */}
            {replyOpenFor === c.id && (
              <div className="reply-input">
                <CornerDownRight size={16} className="reply-arrow" />
                <input
                  type="text"
                  placeholder="답글을 입력하세요."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit(c.id)}
                />
                <button disabled={!replyText.trim()} onClick={() => handleReplySubmit(c.id)}>등록</button>
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
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleCommentSubmit}>등록</button>
      </div>
    </div>
  );
}

export default Bulletindetail;
