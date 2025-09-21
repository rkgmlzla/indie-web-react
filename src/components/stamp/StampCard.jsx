// src/components/stamp/StampCard.jsx
// 스탬프 팝업 공연 카드

import React from 'react';
import styles from './StampCard.module.css';
import { useNavigate } from 'react-router-dom';

const StampCard = ({ id, posterUrl, place, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick(); 
    } else {
      navigate(`/stamp/${id}`); 
    }
  };
  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <img className={styles.poster} src={posterUrl} alt={place} />
      <p className={styles.place}>{place}</p>
    </div>
  );
};

export default StampCard;
