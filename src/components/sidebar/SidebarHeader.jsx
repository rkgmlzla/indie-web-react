// 📁 src/components/sidebar/SidebarHeader.jsx

import React from "react";
import styles from "./Sidebar.module.css";
import iconBack from "@/assets/icons/icon_back_hyunjin.svg";
import iconNotification from "@/assets/icons/icon_notification.svg";
import iconGo from "@/assets/icons/icon_go_hyunjin.svg";

const SidebarHeader = () => {
  return (
    <div className={styles.header}>
      {/* 🔙 상단 아이콘: 뒤로가기 + 알림 */}
      <div className={styles.headerTop}>
        <img src={iconBack} alt="뒤로가기" className={styles.iconBack} />
        <img
          src={iconNotification}
          alt="알림"
          className={styles.iconNotification}
        />
      </div>

      {/* 👤 프로필 + 닉네임 */}
      <div className={styles.profileSection}>
        <img
          src="https://via.placeholder.com/68"
          alt="프로필 이미지"
          className={styles.profileImage}
        />
        <div className={styles.nicknameArea}>
          <div className={styles.nicknameRow}>
            <span className={styles.nickname}>예빈스클럽</span>
            <img
              src={iconGo}
              alt="닉네임 이동"
              className={styles.nicknameArrow}
            />
          </div>
          <div className={styles.likeTag}>♡ 찜 목록</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
