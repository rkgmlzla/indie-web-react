import { Heart } from 'lucide-react';
import './con_card.css';

function Con_Card({
  thumbnail,
  title,
  subtitle,
  date,
  liked = false,
  onLikeToggle,
}) {
  return (
    <div className="concert-card">
      <img src={thumbnail} alt={title} className="concert-thumb" />

      <div className="concert-info">
        <h3 className="concert-title">{title}</h3>
        <p className="concert-subtitle">{subtitle}</p>
        <p className="concert-date">{date}</p>
      </div>

      <Heart
        size={20}
        className={`concert-heart ${liked ? 'on' : ''}`}
        onClick={onLikeToggle}
      />
    </div>
  );
}

export default Con_Card;
