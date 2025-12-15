import React from 'react';

const ActivityList = ({ activities, onEdit, onDelete, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#ffc107';
      case 'pending': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div>
      <h3>Activities</h3>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        activities.map(activity => (
          <div key={activity.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            marginBottom: '10px',
            borderLeft: `4px solid ${getStatusColor(activity.status)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{activity.title}</h4>
                <p style={{ margin: '0 0 10px 0', color: '#666' }}>{activity.description}</p>
                <div style={{ fontSize: '14px', color: '#888' }}>
                  <span>{activity.date} | {activity.startTime} - {activity.endTime}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '120px' }}>
                <select
                  value={activity.status}
                  onChange={(e) => onStatusChange(activity.id, e.target.value)}
                  style={{ padding: '5px', fontSize: '12px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => onEdit(activity)}
                    style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: '#17a2b8', color: 'white', border: 'none' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(activity.id)}
                    style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityList;