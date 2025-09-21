import React from 'react';
import styles from './PickCard.module.css';

export default function PickCard({ id, title, content, imageUrl, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      {imageUrl && (
        <div className={styles.thumbWrap}>
          <img src={imageUrl} alt={title} className={styles.thumb} />
        </div>
      )}
      <div className={styles.textBox}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
}
