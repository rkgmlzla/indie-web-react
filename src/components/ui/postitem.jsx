import './postitem.css';
import { MessageCirclePlus } from 'lucide-react';
import { postcommentSampleData } from '../../data/postcommentSampleData';

function PostItem({ post, onClick }) {
  const commentCount = postcommentSampleData.filter(
    (comment) => comment.post_id === post.id
  ).length;
  return (
    <li className="post-item" onClick={onClick}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="meta">
        <span className="comment-count">
          <MessageCirclePlus size={16} color="#f4511e" />
          {commentCount}
        </span>
        <span>{post.time}</span>
        <span>{post.author}</span>
      </div>
      {post.image && (
        <img src={post.image} alt="썸네일" className="thumbnail" />
      )}
    </li>
  );
}

export default PostItem;
