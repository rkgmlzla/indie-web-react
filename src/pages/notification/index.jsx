// src/pages/notification/NotificationPage.jsx

import React, { useState } from 'react';
import styles from './notification.module.css';
import notificationList from '../../data/notificationList';
import NotificationCard from '../../components/notification/NotificationCard';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';

function NotificationPage() {
  const [notifications, setNotifications] = useState(notificationList);
  const navigate = useNavigate();

  const handleRemove = (index) => {
    const updated = [...notifications];
    updated.splice(index, 1);
    setNotifications(updated);
  };

  return (
    <>
      <Header title="알림" showBack showSearch={false} />
      <div style={{ height: '30px' }} />
      <div className={styles.container}>
        <div className={styles.list}>
          {notifications.map((item, idx) => (
            <NotificationCard
              key={idx}
              content={item.content}
              highlight={item.highlight}
              onRemove={() => handleRemove(idx)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default NotificationPage;
