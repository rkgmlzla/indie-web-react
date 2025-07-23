import React from 'react';
import styles from './Sidebar.module.css';

function SidebarMenuItem({ label, icon, onClick }) {
  return (
    <div className={styles.menuItem} onClick={onClick}>
      <span className={styles.menuLabel}>{label}</span>
      <img src={icon} alt="arrow" className={styles.menuIcon} />
    </div>
  );
}

export default SidebarMenuItem;
