// PostItem.jsx
import './postitem.css';
import { MessageCirclePlus } from 'lucide-react';
import { baseUrl } from '../../api/config';

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  return d.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
};

// 절대 URL 보정
const resolveThumb = (u) => {
  if (!u) return null;
  if (u.startsWith?.('http')) return u; // 이미 절대
  if (u.startsWith?.('/')) return `${baseUrl}${u}`; // "/static/..." 등
  return `${baseUrl}/static/uploads/${u}`; // 파일명만 온 케이스
};

function PostItem({ post, onClick }) {
  if (!post) return null;

  // ✅ 우선순위에 thumbnail_url/thumbnail_filename 포함
  const thumbnailSrc =
    resolveThumb(post.thumbnail_url) ??
    resolveThumb(post.thumbnail_filename) ??
    resolveThumb(post.thumbnail) ??
    resolveThumb(post.image_url) ??
    resolveThumb(post.thumbnailUrl);
  return (
    <li className="post-item" onClick={onClick}>
      <div className="post-text">
        <h3>{post.title || '제목 없음'}</h3>
        {!!post.dateText && <p className="date">{post.dateText}</p>}
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

      {!!thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt="썸네일"
          className="thumbnail"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
    </li>
  );
}

export default PostItem;
