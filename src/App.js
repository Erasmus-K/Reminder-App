import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Dashboard from './components/Dashboard';
import { activityAPI } from './services/api';
import { requestNotificationPermission, scheduleReminder } from './utils/notifications';

function App() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
    requestNotificationPermission();
  }, []);

  const loadActivities = async () => {
    try {
      const response = await activityAPI.getAll();
      setActivities(response.data);
      
      // Schedule reminders for pending activities
      response.data
        .filter(activity => activity.status === 'pending')
        .forEach(scheduleReminder);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (activityData) => {
    try {
      const response = await activityAPI.create(activityData);
      setActivities([...activities, response.data]);
      
      // Schedule reminder for new activity
      if (response.data.status === 'pending') {
        scheduleReminder(response.data);
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleUpdateActivity = async (activityData) => {
    try {
      const response = await activityAPI.update(editingActivity.id, activityData);
      setActivities(activities.map(activity => 
        activity.id === editingActivity.id ? response.data : activity
      ));
      setEditingActivity(null);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleDeleteActivity = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await activityAPI.delete(id);
        setActivities(activities.filter(activity => activity.id !== id));
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const activity = activities.find(a => a.id === id);
      const updatedActivity = { ...activity, status: newStatus };
      const response = await activityAPI.update(id, updatedActivity);
      setActivities(activities.map(a => 
        a.id === id ? response.data : a
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#343a40', 
        padding: '1rem',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: 'white', margin: '0 0 10px 0' }}>Productivity Tracker</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['dashboard', 'activities', 'add'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === tab ? '#007bff' : 'transparent',
                color: 'white',
                border: '1px solid #007bff',
                cursor: 'pointer'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '0 20px' }}>
        {activeTab === 'dashboard' && (
          <Dashboard activities={activities} />
        )}

        {activeTab === 'activities' && (
          <div>
            <ActivityList
              activities={activities}
              onEdit={setEditingActivity}
              onDelete={handleDeleteActivity}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}

        {activeTab === 'add' && (
          <div>
            <ActivityForm
              activity={editingActivity}
              onSubmit={editingActivity ? handleUpdateActivity : handleAddActivity}
              onCancel={() => setEditingActivity(null)}
            />
            {editingActivity && (
              <button
                onClick={() => setEditingActivity(null)}
                style={{ 
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none'
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;