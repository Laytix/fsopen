const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return <div className={`added ${color}`}>{message}</div>;
};

export default Notification;
