import './postitem.css';
import { MessageCirclePlus } from 'lucide-react';
import { postcommentSampleData } from '../../data/postcommentSampleData';

// 날짜 포맷 함수
const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleString(); // 한국어 포맷으로 자동 변환
};

function PostItem({ post, performance, onClick }) {
  const item = post || performance;
  const commentCount = post
    ? postcommentSampleData.filter((comment) => comment.post_id === post.id).length
    : null;

  // ✅ 이미지 URL 확인 (백엔드에서 `thumbnail_url` 사용)
  const imageSrc = item.thumbnail_url || '/no-image.png';  // 기본 이미지 사용

  console.log('이미지 URL 확인:', imageSrc);  // 디버깅 로그 추가

  return (
    <li className="post-item" onClick={onClick}>
      <h3>{item.title || '제목 없음'}</h3>  {/* 제목이 없을 때 기본 텍스트 처리 */}
      {item.content && <p>{item.content}</p>}
      <div className="meta">
        {commentCount !== null && (
          <span className="comment-count">
            <MessageCirclePlus size={16} color="#f4511e" />
            {commentCount}
          </span>
        )}
        {item.date && <span>{formatDate(item.date)}</span>}  {/* 날짜 포맷팅 */}
        {item.author && <span>{item.author}</span>}
      </div>
      {/* 이미지 출력 */}
      {imageSrc && <img src={imageSrc} alt="썸네일" className="thumbnail" />}
    </li>
  );
}

export default PostItem;
