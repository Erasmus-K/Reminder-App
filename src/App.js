import React, { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import NotificationPopup from './components/NotificationPopup';
import { activityAPI } from './services/api';
import { requestNotificationPermission, scheduleReminder, snoozeReminder } from './utils/notifications';

function App() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showLanding, setShowLanding] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowLanding(false);
    } else if (!hasVisited) {
      setShowLanding(true);
    } else {
      setShowLanding(false);
    }
    
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [user]);

  const loadActivities = async () => {
    try {
      if (user) {
        const response = await activityAPI.getByUserId(user.id);
        setActivities(response.data);
        
        // Schedule reminders for pending activities
        response.data
          .filter(activity => activity.status === 'pending')
          .forEach(activity => scheduleReminder(activity, setCurrentNotification));
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (activityData) => {
    try {
      const activityWithUserId = {
        ...activityData,
        userId: user.id
      };
      const response = await activityAPI.create(activityWithUserId);
      setActivities([...activities, response.data]);
      
      // Schedule reminder for new activity
      if (response.data.status === 'pending') {
        scheduleReminder(response.data, setCurrentNotification);
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

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setActivities([]);
    setActiveTab('dashboard');
  };

  const handleGetStarted = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowLanding(false);
  };

  const handleCloseNotification = () => {
    setCurrentNotification(null);
  };

  const handleSnoozeNotification = () => {
    if (currentNotification) {
      snoozeReminder(currentNotification.activity, setCurrentNotification);
      setCurrentNotification(null);
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: '0' }}>Productivity Tracker</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'white' }}>Welcome, {user.name}!</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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
      
      <NotificationPopup
        notification={currentNotification}
        onClose={handleCloseNotification}
        onSnooze={handleSnoozeNotification}
      />
    </div>
  );
}

export default App;