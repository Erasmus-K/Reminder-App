export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const playNotificationSound = () => {
  const audio = new Audio('/sounds/notification.wav');
  audio.volume = 0.5;
  audio.play().catch(e => console.log('Audio play failed:', e));
};

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      ...options,
    });
  }
};

export const scheduleReminder = (activity, onShowPopup) => {
  const now = new Date();
  const activityDateTime = new Date(`${activity.date}T${activity.startTime}`);
  const reminderTime = new Date(activityDateTime.getTime() - 15 * 60 * 1000);

  if (reminderTime > now) {
    const timeout = reminderTime.getTime() - now.getTime();
    setTimeout(() => {
      const notification = {
        title: activity.title,
        body: `Starting in 15 minutes at ${activity.startTime}`,
        activity
      };
      
      playNotificationSound();
      showNotification(`Reminder: ${activity.title}`, {
        body: notification.body,
      });
      
      if (onShowPopup) {
        onShowPopup(notification);
      }
    }, timeout);
  }
};

export const snoozeReminder = (activity, onShowPopup) => {
  setTimeout(() => {
    const notification = {
      title: activity.title,
      body: `Snoozed reminder: Starting at ${activity.startTime}`,
      activity
    };
    
    playNotificationSound();
    showNotification(`Snoozed: ${activity.title}`, {
      body: notification.body,
    });
    
    if (onShowPopup) {
      onShowPopup(notification);
    }
  }, 5 * 60 * 1000); // 5 minutes
};