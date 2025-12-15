export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      ...options,
    });
  }
};

export const scheduleReminder = (activity) => {
  const now = new Date();
  const activityDateTime = new Date(`${activity.date}T${activity.startTime}`);
  const reminderTime = new Date(activityDateTime.getTime() - 15 * 60 * 1000); // 15 minutes before

  if (reminderTime > now) {
    const timeout = reminderTime.getTime() - now.getTime();
    setTimeout(() => {
      showNotification(`Reminder: ${activity.title}`, {
        body: `Starting in 15 minutes at ${activity.startTime}`,
      });
    }, timeout);
  }
};