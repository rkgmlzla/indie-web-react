// src/pages/notification/NotificationPage.jsx

import React, { useState } from 'react';
import styles from './notification.module.css';
import notificationList from '../../data/notificationList';
import NotificationCard from '../../components/notification/NotificationCard';

function NotificationPage() {
  const [notifications, setNotifications] = useState(notificationList);

  const handleRemove = (index) => {
    const updated = [...notifications];
    updated.splice(index, 1);
    setNotifications(updated);
  };

  return (
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
  );
}

export default NotificationPage;
