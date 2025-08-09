import './postitem.css';
import { MessageCirclePlus } from 'lucide-react';

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
};

function PostItem({ post, onClick }) {
  if (!post) return null; // ✅ 안전가드

  // 썸네일(다양한 키 대응). Search.jsx에서 ensureHttp로 보정해 넘겨줌.
  const thumbnailSrc = post.thumbnail ?? post.image_url ?? post.thumbnailUrl ?? null;

  return (
    <li className="post-item" onClick={onClick}>
      <div className="post-text">
        <h3>{post.title || '제목 없음'}</h3>

        {/* 공연용 날짜 라인 */}
        {!!post.dateText && <p className="date">{post.dateText}</p>}

        {/* 자유게시판 본문은 있을 때만 */}
        {!!post.content && <p>{post.content}</p>}

        <div className="meta">
          {typeof post.commentCount === 'number' && (
            <span className="comment-count">
              <MessageCirclePlus size={16} />
              {post.commentCount}
            </span>
          )}

          {(post.created_at || post.date) && (
            <span>{formatDate(post.created_at ?? post.date)}</span>
          )}

          {!!post.author && <span>{post.author}</span>}
        </div>
      </div>

      {/* 썸네일 */}
      {!!thumbnailSrc && <img src={thumbnailSrc} alt="썸네일" className="thumbnail" />}
    </li>
  );
}

export default PostItem;
