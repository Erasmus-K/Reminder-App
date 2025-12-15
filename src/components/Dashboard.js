import React, { useState, useMemo } from 'react';

const Dashboard = ({ activities }) => {
  const [viewMode, setViewMode] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const stats = useMemo(() => {
    const total = activities.length;
    const completed = activities.filter(a => a.status === 'completed').length;
    const inProgress = activities.filter(a => a.status === 'in-progress').length;
    const pending = activities.filter(a => a.status === 'pending').length;
    
    return { total, completed, inProgress, pending };
  }, [activities]);

  const filteredActivities = useMemo(() => {
    if (viewMode === 'daily') {
      return activities.filter(activity => activity.date === selectedDate);
    } else {
      // Weekly view - get activities for the week containing selectedDate
      const date = new Date(selectedDate);
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return activities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= startOfWeek && activityDate <= endOfWeek;
      });
    }
  }, [activities, viewMode, selectedDate]);

  const groupedByDate = useMemo(() => {
    return filteredActivities.reduce((acc, activity) => {
      if (!acc[activity.date]) {
        acc[activity.date] = [];
      }
      acc[activity.date].push(activity);
      return acc;
    }, {});
  }, [filteredActivities]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      
      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', flex: 1 }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Total Activities</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</p>
        </div>
        <div style={{ padding: '15px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', flex: 1 }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Completed</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>{stats.completed}</p>
        </div>
        <div style={{ padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', flex: 1 }}>
          <h4 style={{ margin: '0 0 5px 0' }}>In Progress</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{stats.inProgress}</p>
        </div>
        <div style={{ padding: '15px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', flex: 1 }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Pending</h4>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#721c24' }}>{stats.pending}</p>
        </div>
      </div>

      {/* View Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setViewMode('daily')}
          style={{
            padding: '8px 16px',
            backgroundColor: viewMode === 'daily' ? '#007bff' : '#f8f9fa',
            color: viewMode === 'daily' ? 'white' : 'black',
            border: '1px solid #dee2e6'
          }}
        >
          Daily View
        </button>
        <button
          onClick={() => setViewMode('weekly')}
          style={{
            padding: '8px 16px',
            backgroundColor: viewMode === 'weekly' ? '#007bff' : '#f8f9fa',
            color: viewMode === 'weekly' ? 'white' : 'black',
            border: '1px solid #dee2e6'
          }}
        >
          Weekly View
        </button>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '8px', border: '1px solid #dee2e6' }}
        />
      </div>

      {/* Schedule View */}
      <div>
        <h3>{viewMode === 'daily' ? 'Daily Schedule' : 'Weekly Schedule'}</h3>
        {Object.keys(groupedByDate).length === 0 ? (
          <p>No activities for the selected {viewMode === 'daily' ? 'day' : 'week'}.</p>
        ) : (
          Object.keys(groupedByDate).sort().map(date => (
            <div key={date} style={{ marginBottom: '20px' }}>
              <h4 style={{ backgroundColor: '#f8f9fa', padding: '10px', margin: '0 0 10px 0' }}>
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              {groupedByDate[date]
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(activity => (
                  <div key={activity.id} style={{
                    padding: '10px',
                    marginBottom: '5px',
                    backgroundColor: activity.status === 'completed' ? '#d4edda' : 
                                   activity.status === 'in-progress' ? '#fff3cd' : '#f8f9fa',
                    borderLeft: `4px solid ${
                      activity.status === 'completed' ? '#28a745' :
                      activity.status === 'in-progress' ? '#ffc107' : '#6c757d'
                    }`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>{activity.title}</strong>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                          {activity.description}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '14px' }}>
                        <div>{activity.startTime} - {activity.endTime}</div>
                        <div style={{ 
                          marginTop: '5px', 
                          padding: '2px 8px', 
                          backgroundColor: 'white', 
                          borderRadius: '12px',
                          fontSize: '12px'
                        }}>
                          {activity.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;