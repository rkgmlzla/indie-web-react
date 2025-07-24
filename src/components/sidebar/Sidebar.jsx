import React from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader';
import SidebarMenuItem from './SidebarMenuItem';

import iconGo from '@/assets/icons/icon_go_hyunjin.svg';

function Sidebar({ onClose }) {
  const menuItems = [
    { label: '공연', icon: iconGo },
    { label: '공연장', icon: iconGo },
    { label: '아티스트', icon: iconGo },
    { label: '자유게시판', icon: iconGo },
    { label: '가까운 공연 찾기', icon: iconGo },
  ];

  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.sidebar}>
        <SidebarHeader onClose={onClose} />
        <div className={styles.divider} />
        {menuItems.map((item, index) => (
          <SidebarMenuItem
            key={index}
            label={item.label}
            icon={item.icon}
            onClick={() => console.log(`${item.label} 클릭됨`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
