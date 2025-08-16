import React from 'react';
import styles from './RegionFilter.module.css';

function RegionFilterTrigger({ onOpen, selectedRegions }) {
  const label =
    selectedRegions.length === 0 ? '지역 전체' : selectedRegions.join(', ');

  return (
    <div className={styles.triggerWrapper}>
      <button className={styles.triggerButton} onClick={onOpen}>
        {label}
      </button>
    </div>
  );
}

export default RegionFilterTrigger;
