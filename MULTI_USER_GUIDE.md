# Multi-User System Guide

## 🎯 Overview
This productivity tracker now supports multiple users with private data using only `db.json` and JSON Server.

## 📊 Database Structure

### Users Table
```json
{
  "users": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@mail.com", 
      "password": "1234"
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob@mail.com",
      "password": "abcd"
    }
  ]
}
```

### Activities Table (with userId)
```json
{
  "activities": [
    {
      "id": 1,
      "userId": 1,  // Links to Alice
      "title": "Morning Coding Session",
      "description": "Work on React components",
      "date": "2024-01-15",
      "startTime": "09:00",
      "endTime": "11:00",
      "status": "pending"
    },
    {
      "id": 2,
      "userId": 2,  // Links to Bob
      "title": "Study JavaScript",
      "description": "Learn advanced concepts", 
      "date": "2024-01-16",
      "startTime": "10:00",
      "endTime": "12:00",
      "status": "in-progress"
    }
  ]
}
```

## 🔐 Authentication Flow

### 1. Login Process
- User enters email/password
- Frontend calls `/users` endpoint
- Finds matching user in database
- Stores user data in localStorage
- Redirects to dashboard

### 2. Data Filtering
- All API calls include `userId` parameter
- JSON Server filters: `/activities?userId=1`
- Only user's own data is returned

### 3. Creating New Data
- Frontend adds `userId` to all new activities
- Ensures data belongs to logged-in user

## 🧪 Test Users

You can login with these demo accounts:

**Alice's Account:**
- Email: `alice@mail.com`
- Password: `1234`

**Bob's Account:**
- Email: `bob@mail.com` 
- Password: `abcd`

## 🔧 API Endpoints

### Authentication
- `GET /users` - Get all users (for login)
- `POST /users` - Create new user (signup)

### User Data
- `GET /activities?userId=1` - Get Alice's activities
- `GET /activities?userId=2` - Get Bob's activities
- `POST /activities` - Create activity (with userId)
- `PUT /activities/:id` - Update activity
- `DELETE /activities/:id` - Delete activity

## ⚠️ Important Limitations

### ✅ Good For:
- Learning and prototyping
- Demo applications
- Local development
- Understanding concepts

### ❌ NOT Suitable For:
- Production applications
- Real user data
- Security-sensitive apps
- Scalable systems

### 🚨 Security Issues:
- Passwords stored in plain text
- No encryption or hashing
- Frontend can be manipulated
- No server-side validation
- Anyone can access `/users` endpoint

## 🚀 Upgrading to Production

To make this production-ready, you would need:

### Backend Changes:
- Real database (PostgreSQL, MongoDB)
- Password hashing (bcrypt)
- JWT tokens for authentication
- Server-side validation
- API rate limiting
- HTTPS encryption

### Frontend Changes:
- Secure token storage
- Automatic token refresh
- Better error handling
- Input validation
- CSRF protection

## 💡 Learning Value

This implementation teaches:
- Multi-user data architecture
- User authentication concepts
- Data filtering and privacy
- State management
- API design patterns

Perfect for learning, but remember to upgrade for real applications! 🎓