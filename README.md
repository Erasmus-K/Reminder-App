# Productivity Tracker

A React-based productivity and progress-tracking web application with JSON Server backend.

## Features

- ✅ Create, edit, and delete activities
- ✅ Track activity status (pending, in-progress, completed)
- ✅ Daily and weekly schedule views
- ✅ Dashboard with statistics
- ✅ Browser-based reminders/notifications
- ✅ Persistent data storage with JSON Server

## Project Structure

```
productivity-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ActivityForm.js      # Form for adding/editing activities
│   │   ├── ActivityList.js      # List view of activities
│   │   └── Dashboard.js         # Dashboard with stats and calendar view
│   ├── services/
│   │   └── api.js              # API calls to JSON Server
│   ├── utils/
│   │   └── notifications.js    # Browser notification utilities
│   ├── App.js                  # Main application component
│   └── index.js               # React entry point
├── db.json                    # JSON Server database
├── package.json
└── README.md
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development servers:
```bash
npm run dev
```

This will start both:
- React app on http://localhost:3000
- JSON Server on http://localhost:3001

Alternatively, run them separately:
```bash
# Terminal 1 - JSON Server
npm run server

# Terminal 2 - React App
npm start
```


## API Endpoints

JSON Server provides REST API endpoints:

- `GET /activities` - Get all activities
- `GET /activities/:id` - Get activity by ID
- `POST /activities` - Create new activity
- `PUT /activities/:id` - Update activity
- `DELETE /activities/:id` - Delete activity

## Usage

1. **Dashboard**: View statistics and daily/weekly schedules
2. **Activities**: Manage all activities with status updates
3. **Add**: Create new activities or edit existing ones

## Activity Data Structure

```json
{
  "id": 1,
  "title": "Activity Title",
  "description": "Activity description",
  "date": "2024-01-15",
  "startTime": "09:00",
  "endTime": "11:00",
  "status": "pending" // pending | in-progress | completed
}
```

## Notifications

The app requests browser notification permissions and schedules reminders 15 minutes before activity start times for pending activities.