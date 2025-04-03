export const showNotification = (title, message) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body: message });
  } else if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { body: message });
      }
    });
  } else {
    alert(`${title}: ${message}`);
  }
};
