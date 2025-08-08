import './postitem.css';
import { MessageCirclePlus } from 'lucide-react';
import { postcommentSampleData } from '../../data/postcommentSampleData';

// ✅ 날짜 포맷 함수 (초 제거)
const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

function PostItem({ post, performance, onClick }) {
  const item = post || performance;
  const commentCount = post
    ? postcommentSampleData.filter((comment) => comment.post_id === post.id).length
    : null;

  const imageSrc = item.image_url || '/no-image.png';

  return (
  <li className="post-item" onClick={onClick}>
  <div className="post-text">
    <h3>{item.title || '제목 없음'}</h3>
    {item.content && <p>{item.content}</p>}
    <div className="meta">
      {commentCount !== null && (
        <span className="comment-count">
          <MessageCirclePlus size={16} color="#f4511e" />
          {commentCount}
        </span>
      )}
      {item.date && <span>{formatDate(item.date)}</span>}
      {item.author && <span>{item.author}</span>}
    </div>
  </div>

  {/* 썸네일 */}
  {imageSrc && <img src={imageSrc} alt="썸네일" className="thumbnail" />}
</li>

  );
}

export default PostItem;
