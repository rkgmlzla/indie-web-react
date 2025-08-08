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
  return (
    <li className="post-item" onClick={onClick}>
      <div className="post-text">
        <h3>{post.title || '제목 없음'}</h3>
        <p>{post.content || '내용 없음'}</p>

        <div className="meta">
          <span className="comment-count">
            <MessageCirclePlus size={16} color="#f4511e" />
            {post.commentCount}
          </span>
          {post.created_at && <span>{formatDate(post.created_at)}</span>}
          {post.author && <span>{post.author}</span>}
        </div>
      </div>

      {post.thumbnail && (
        <img
          src={`http://localhost:8000${post.thumbnail}`}
          alt="썸네일"
          className="thumbnail"
        />
      )}
    </li>

  );
}

export default PostItem;
