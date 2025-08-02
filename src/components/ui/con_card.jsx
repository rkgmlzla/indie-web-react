import { Heart } from 'lucide-react';
import './con_card.css';

function Con_Card({
  thumbnail_url,  // 변경된 부분: thumbnail을 thumbnail_url로 수정
  title,
  subtitle,
  date,
  liked = false,
  onLikeToggle,
}) {
  // 이미지를 표시하기 위한 URL 처리
  const imageSrc = thumbnail_url || '/no-image.png';  // CDN에서 제공하는 thumbnail_url을 사용, 없으면 기본 이미지

  return (
    <div className="concert-card">
      <img src={imageSrc} alt={title} className="concert-thumb" /> {/* 이미지 표시 */}
      
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
