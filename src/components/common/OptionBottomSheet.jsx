import { useState, useEffect } from "react";
import styles from "./OptionBottomSheet.module.css";

export default function OptionBottomSheet({
  title = "지역 선택",
  options,
  selectedOptions = [],
  onConfirm,
  onClose,
}) {
  const [localSelected, setLocalSelected] = useState(new Set());

  useEffect(() => {
    setLocalSelected(new Set(selectedOptions));
  }, [selectedOptions]);

  const toggleOption = (option) => {
    const newSet = new Set(localSelected);
    if (newSet.has(option)) {
      newSet.delete(option);
    } else {
      newSet.add(option);
    }
    setLocalSelected(newSet);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <div className={styles.topRow}>
          <div className={styles.title}>{title}</div>
          <button className={styles.closeBtn} onClick={onClose}>닫기</button>
        </div>

        <div className={styles.optionList}>
          {options.map((option) => (
            <button
              key={option}
              className={`${styles.option} ${localSelected.has(option) ? styles.selected : ""}`}
              onClick={() => toggleOption(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className={styles.applyBtn}
          onClick={() => onConfirm([...localSelected])}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
