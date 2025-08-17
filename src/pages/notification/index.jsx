// src/pages/notification/NotificationPage.jsx

import React, { useEffect, useState } from 'react';
import styles from './notification.module.css';
import NotificationCard from '../../components/notification/NotificationCard';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import {
  fetchNotifications,
  markNotificationRead,
  removeNotification,
} from '../../api/alertApi';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const list = await fetchNotifications();
      setNotifications(Array.isArray(list) ? list : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(); // 최초 로드
    const t = setInterval(load, 10000); // 10초 폴링
    return () => clearInterval(t);
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (e) {
      console.error('알림 삭제 실패:', e);
    }
  };

  const handleClick = async (n) => {
    try {
      if (!n.is_read) await markNotificationRead(n.id);
    } catch (e) {
      console.warn('읽음 처리 실패(무시 가능):', e);
    }
    if (n.link_url) navigate(n.link_url);
  };

  return (
    <>
      <Header title="알림" showBack showSearch={false} />
      <div style={{ height: 30 }} />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.empty}>불러오는 중…</div>
        ) : notifications.length === 0 ? (
          <div className={styles.empty}>새 알림이 없습니다.</div>
        ) : (
          <div className={styles.list}>
            {notifications.map((n) => (
              <NotificationCard
                key={n.id}
                content={n.body} // 본문
                highlight={n.title} // 파란 굵은 텍스트
                isRead={!!n.is_read} // 읽음 스타일
                onClick={() => handleClick(n)} // 카드 클릭 → 이동
                onRemove={() => handleRemove(n.id)} // X 클릭 → 삭제
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default NotificationPage;
