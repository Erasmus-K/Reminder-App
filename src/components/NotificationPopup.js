import React from 'react';

const NotificationPopup = ({ notification, onClose, onSnooze }) => {
  if (!notification) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔔</div>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Reminder</h3>
        <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{notification.title}</h4>
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>{notification.body}</p>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Got it!
          </button>
          <button
            onClick={onSnooze}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Snooze 5min
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;