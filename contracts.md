# Telegram Clone - Frontend-Backend Integration Contracts

## 📋 Overview
This document outlines the integration contracts between the frontend and backend for the Telegram clone application.

## 🔐 Authentication Endpoints

### POST `/api/auth/send-code`
**Request:**
```json
{
  "phone": "+1234567890"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Verification code sent",
  "sessionId": "abc123"
}
```

### POST `/api/auth/verify-code`
**Request:**
```json
{
  "sessionId": "abc123",
  "code": "123456",
  "phone": "+1234567890"
}
```
**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "phone": "+1234567890",
    "avatar": "url",
    "bio": "Bio text"
  },
  "token": "jwt_token"
}
```

### POST `/api/auth/qr-login`
**Request:**
```json
{
  "qrCode": "qr_string"
}
```
**Response:**
```json
{
  "success": true,
  "user": { /* user object */ },
  "token": "jwt_token"
}
```

## 💬 Chat Endpoints

### GET `/api/chats`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "chats": [
    {
      "id": 1,
      "participants": [1, 2],
      "type": "private",
      "title": "Sarah Wilson",
      "avatar": "url",
      "lastMessage": {
        "id": 1,
        "text": "Hey! How are you?",
        "senderId": 2,
        "timestamp": "2025-01-27T10:30:00Z",
        "isRead": false
      },
      "unreadCount": 2,
      "isPinned": true
    }
  ]
}
```

### GET `/api/chats/{chatId}/messages`
**Headers:** `Authorization: Bearer {token}`
**Response:**
```json
{
  "messages": [
    {
      "id": 1,
      "text": "Hello!",
      "senderId": 1,
      "timestamp": "2025-01-27T10:30:00Z",
      "isRead": true,
      "type": "text"
    },
    {
      "id": 2,
      "text": "image_url",
      "senderId": 2,
      "timestamp": "2025-01-27T10:31:00Z",
      "isRead": false,
      "type": "image",
      "caption": "Check this out!"
    }
  ]
}
```

### POST `/api/chats/{chatId}/messages`
**Headers:** `Authorization: Bearer {token}`
**Request:**
```json
{
  "text": "Hello world!",
  "type": "text"
}
```
**Response:**
```json
{
  "message": {
    "id": 123,
    "text": "Hello world!",
    "senderId": 1,
    "timestamp": "2025-01-27T10:32:00Z",
    "isRead": false,
    "type": "text"
  }
}
```

## 📁 File Upload Endpoints

### POST `/api/files/upload`
**Headers:** `Authorization: Bearer {token}`, `Content-Type: multipart/form-data`
**Request:** FormData with file
**Response:**
```json
{
  "fileUrl": "https://example.com/files/abc123.jpg",
  "fileName": "image.jpg",
  "fileSize": "2.4 MB",
  "fileType": "image"
}
```

### POST `/api/chats/{chatId}/files`
**Headers:** `Authorization: Bearer {token}`
**Request:**
```json
{
  "fileUrl": "https://example.com/files/abc123.jpg",
  "fileName": "document.pdf",
  "fileSize": "1.2 MB",
  "type": "file",
  "caption": "Optional caption"
}
```

## 🔄 Real-time WebSocket Events

### Connection
- **URL:** `ws://localhost:8001/ws?token={jwt_token}`
- **Events:**
  - `message_received`: New message in chat
  - `user_online`: User came online
  - `user_offline`: User went offline
  - `typing_start`: User started typing
  - `typing_stop`: User stopped typing

## 📊 Data Models (Backend)

### User Model
```python
class User(BaseModel):
    id: int
    firstName: str
    lastName: str
    username: str
    phone: str
    avatar: Optional[str]
    bio: Optional[str]
    isOnline: bool
    lastSeen: datetime
```

### Chat Model
```python
class Chat(BaseModel):
    id: int
    participants: List[int]
    type: str  # "private", "group", "channel"
    title: str
    avatar: Optional[str]
    createdAt: datetime
    isPinned: bool
```

### Message Model
```python
class Message(BaseModel):
    id: int
    chatId: int
    senderId: int
    text: str
    type: str  # "text", "image", "file", "voice"
    timestamp: datetime
    isRead: bool
    fileName: Optional[str]
    fileSize: Optional[str]
    caption: Optional[str]
```

## 🗂️ Frontend Mock Data Replacement

### Current Mock Files to Replace:
1. **`/app/frontend/src/data/mockData.js`**
   - Replace `mockUser` with API call to `/api/auth/user`
   - Replace `mockChats` with API call to `/api/chats`
   - Replace `mockMessages` with API call to `/api/chats/{id}/messages`
   - Replace `mockContacts` with API call to `/api/contacts`

### Frontend Context Updates:
1. **AuthContext**: Integrate with real authentication endpoints
2. **ChatContext**: Connect to WebSocket for real-time messaging
3. **ThemeContext**: Persist theme preference to backend

## 🚀 Backend Implementation Plan

1. **Authentication System**
   - JWT token generation and validation
   - Phone verification with SMS (or mock)
   - QR code login simulation
   - Session management

2. **Database Models**
   - MongoDB collections for Users, Chats, Messages
   - Proper indexing for performance

3. **File Storage**
   - Local file storage or cloud integration
   - File upload handling with size limits
   - Image/file serving endpoints

4. **WebSocket Integration**
   - Real-time message delivery
   - Online status updates
   - Typing indicators

5. **API Security**
   - JWT middleware
   - Rate limiting
   - Input validation
   - CORS configuration

## 🧪 Testing Checklist

### Functional Tests:
- [ ] User registration/login flow
- [ ] Chat creation and messaging
- [ ] File upload and sharing
- [ ] Real-time message delivery
- [ ] Theme persistence
- [ ] Search functionality

### Integration Tests:
- [ ] Frontend-backend authentication
- [ ] WebSocket connection handling
- [ ] File upload pipeline
- [ ] Database CRUD operations
- [ ] Error handling scenarios

This contract ensures smooth integration between the frontend mock implementation and the upcoming backend development.