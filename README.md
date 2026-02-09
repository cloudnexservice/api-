# CRUD User Management Application

A professional full-stack CRUD application with **React frontend** and **Express.js backend**.

## 📋 Features

✅ **Create** - Add new users (POST)
✅ **Read** - View all users or single user (GET)
✅ **Update** - Edit existing users (PUT)
✅ **Delete** - Remove users (DELETE)

## 🏗️ Architecture

```
CRUD App
├── Frontend (React)
│   ├── Components
│   ├── API calls to backend
│   └── Beautiful UI
└── Backend (Express.js)
    ├── REST API endpoints
    ├── Data validation
    └── Error handling
```

## 🚀 Deployment

- **Frontend**: Deployed on **Cloudflare Pages**
- **Backend**: Deployed on **AWS EC2**

## 📦 Tech Stack

### Frontend
- React 18
- Fetch API
- CSS3 (Responsive Design)
- npm

### Backend
- Node.js
- Express.js
- CORS enabled
- dotenv for environment variables

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get single user |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

## 📥 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
# Backend runs on port 3001
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# Frontend runs on port 3000
```

## 🧪 Testing

All API endpoints can be tested using Postman:
1. Import `Postman_Collection.json`
2. Update `BASE_URL` variable
3. Run all 4 CRUD tests

## 📄 Request/Response Examples

### POST - Create User
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-02-09T10:30:00.000Z"
  }
}
```

### PUT - Update User
```json
Request to /users/1:
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

Response:
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "updatedAt": "2026-02-09T10:35:00.000Z"
  }
}
```

## 🛠️ Development

### Local Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev  # Uses nodemon for auto-reload

# Terminal 2 - Frontend
cd frontend
npm start
```

### File Structure
```
.
├── backend/
│   ├── src/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   └── package.json
├── README.md
├── .gitignore
└── DEPLOYMENT_GUIDE.md
```

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
- **GITHUB_SETUP.md** - GitHub setup guide
- **Postman_Collection.json** - API test collection

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📝 License

MIT License - Open source project

---

**Created on:** February 9, 2026
**Status:** ✅ Fully functional CRUD application
