import React, { useState, useEffect } from 'react';

const ActivityForm = ({ activity, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'pending'
  });

  useEffect(() => {
    if (activity) {
      setFormData(activity);
    }
  }, [activity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      status: 'pending'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd' }}>
      <h3>{activity ? 'Edit Activity' : 'Add New Activity'}</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="title"
          placeholder="Activity Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', height: '60px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{ padding: '8px', width: '150px' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <button type="submit" style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          {activity ? 'Update' : 'Add'} Activity
        </button>
        {activity && (
          <button type="button" onClick={onCancel} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ActivityForm;