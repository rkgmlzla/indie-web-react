import './postitem.css';
import { MessageCirclePlus } from 'lucide-react';

function PostItem({ post, onClick }) {
  return (
    <li className="post-item" onClick={onClick}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="meta">
        <span className="comment-count">
          <MessageCirclePlus size={16} color="#f4511e" />
          {post.commentList?.length || 0}
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
