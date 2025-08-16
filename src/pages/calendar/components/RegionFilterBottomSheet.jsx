import React, { useState } from 'react';
import styles from './RegionFilter.module.css';

const regions = [
  '서울', '경기', '인천', '부산', '대구', '광주', '대전',
  '울산', '세종', '강원', '충청', '전라', '경상', '제주'
];

function RegionFilterBottomSheet({
  onClose,
  onApply,
  initialSelected = []
}) {
  const [tempSelected, setTempSelected] = useState(initialSelected);

  const toggleRegion = (region) => {
    if (tempSelected.includes(region)) {
      setTempSelected(tempSelected.filter((r) => r !== region));
    } else {
      setTempSelected([...tempSelected, region]);
    }
  };

  const handleApply = () => {
    onApply(tempSelected);
    onClose();
  };

  return (
    <div className={styles.bottomSheetOverlay}>
      <div className={styles.bottomSheet} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.sheetTitle}>지역 선택</h3>
        <div className={styles.regionList}>
          <button
            className={`${styles.regionButton} ${tempSelected.length === 0 ? styles.selected : ''}`}
            onClick={() => setTempSelected([])}
          >
            전체
          </button>
          {regions.map((region) => (
            <button
              key={region}
              className={`${styles.regionButton} ${tempSelected.includes(region) ? styles.selected : ''}`}
              onClick={() => toggleRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
        <div className={styles.sheetActions}>
          <button className={styles.applyButton} onClick={handleApply}>적용하기</button>
          <button className={styles.cancelButton} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default RegionFilterBottomSheet;
