import React from 'react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        padding: '20px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>ProductivityTracker</h2>
        <button
          onClick={onGetStarted}
          style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center',
        padding: '100px 20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '48px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          Master Your Time, Achieve Your Goals
        </h1>
        <p style={{ 
          fontSize: '20px',
          marginBottom: '40px',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Transform your daily routine with our intuitive productivity tracker. 
          Schedule activities, track progress, and stay motivated with smart reminders.
        </p>
        <button
          onClick={onGetStarted}
          style={{
            padding: '15px 40px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
          }}
        >
          Start Tracking Now
        </button>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '36px',
            marginBottom: '60px'
          }}>
            Everything You Need to Stay Productive
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {/* Feature 1 */}
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                fontSize: '48px',
                marginBottom: '20px'
              }}>📅</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Smart Scheduling</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Create and organize your activities with precise time slots. 
                View daily and weekly schedules at a glance.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                fontSize: '48px',
                marginBottom: '20px'
              }}>📊</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Progress Tracking</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Monitor your productivity with real-time statistics. 
                Track completed, in-progress, and pending activities.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ 
                fontSize: '48px',
                marginBottom: '20px'
              }}>🔔</div>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Smart Reminders</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Never miss important tasks with browser notifications. 
                Get reminded 15 minutes before each activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px',
            marginBottom: '50px'
          }}>
            Join Thousands of Productive People
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px'
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>10K+</div>
              <div style={{ opacity: 0.9 }}>Active Users</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>50K+</div>
              <div style={{ opacity: 0.9 }}>Tasks Completed</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>95%</div>
              <div style={{ opacity: 0.9 }}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '80px 20px',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px',
            marginBottom: '20px'
          }}>
            Ready to Boost Your Productivity?
          </h2>
          <p style={{ 
            fontSize: '18px',
            marginBottom: '40px',
            opacity: 0.9
          }}>
            Start organizing your life today. It's free and takes less than a minute to get started.
          </p>
          <button
            onClick={onGetStarted}
            style={{
              padding: '15px 40px',
              backgroundColor: '#4ecdc4',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
            }}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <p style={{ opacity: 0.7, margin: 0 }}>
          © 2024 ProductivityTracker. Built with ❤️ for productive people.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;