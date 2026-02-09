# Full Deployment & Testing Guide

## Part 1: Deploy Frontend to Cloudflare Pages

### Step 1: Build the React App
```bash
cd C:\projects - clients\New crud\frontend
npm run build
```
This creates a `build/` folder with production files.

### Step 2: Connect to Cloudflare Pages
1. Go to https://dash.cloudflare.com/
2. Sign up / Login with your account
3. Click **"Pages"** → **"Create a project"**
4. Choose **"Connect to Git"** (GitHub) or **"Upload directly"**

**Option A: GitHub (Recommended)**
- Push your frontend code to GitHub
- Connect GitHub account to Cloudflare
- Select the repository, branch: `main`
- Build command: `npm run build`
- Build output directory: `build`
- Click **Deploy**

**Option B: Direct Upload**
- Go to **"Upload assets"**
- Drag & drop the `build/` folder
- Click **Deploy**

### Step 3: Update API URL in Frontend
After Cloudflare deploys, you'll get a domain like `https://your-app.pages.dev`

Update your frontend `src/App.js`:
```javascript
const API_URL = "https://your-backend-api.com/users"; // Your EC2 backend URL
```

---

## Part 2: Deploy Backend to AWS EC2

### Step 1: Create EC2 Instance
1. Go to https://aws.amazon.com/ → **EC2 Dashboard**
2. Click **"Instances"** → **"Launch Instances"**
3. Select **Ubuntu 22.04 LTS** (Free tier eligible)
4. Instance type: **t2.micro** (Free tier)
5. Configure security group:
   - Allow SSH (port 22) from your IP
   - Allow HTTP (port 80) from anywhere
   - Allow HTTPS (port 443) from anywhere
   - Allow port 3001 from anywhere
6. Create or select a key pair (save the .pem file)
7. Click **"Launch Instance"**

### Step 2: Connect to EC2 via SSH
```bash
# Open PowerShell and navigate to where you saved the .pem file
cd path\to\your\pem\file

# Change permissions (Windows)
icacls "your-key.pem" /grant:r "%username%:F"
icacls "your-key.pem" /inheritance:r

# Connect to your instance
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

### Step 3: Setup Node.js on EC2
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install Git
sudo apt install -y git
```

### Step 4: Clone & Deploy Backend
```bash
# Clone your project (or upload manually)
git clone https://github.com/yourusername/your-repo.git
cd your-repo/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add: PORT=3001
# Press Ctrl+X, then Y, then Enter

# Start backend
npm start
```

### Step 5: Keep Backend Running (Use PM2)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start backend with PM2
pm2 start server.js --name "backend"

# Make it auto-restart on reboot
pm2 startup
pm2 save

# Check status
pm2 status
```

### Step 6: Get Your EC2 Public IP
In AWS Console → Instances → Your Instance → Public IPv4 Address

Your backend URL: `http://your-ec2-public-ip:3001`

---

## Part 3: Test All 4 API Calls in Postman

### Setup Postman

1. Download **Postman**: https://www.postman.com/downloads/
2. Open Postman and create a **New Collection** called "User CRUD API"
3. Create a **new environment** variable:
   - Click **Environments** → **+**
   - Name: `Production`
   - Add variable: `API_BASE_URL` = `http://your-ec2-ip:3001`

---

### API Test #1: GET (Read All Users)

**Name:** Get All Users

| Field | Value |
|---|---|
| Method | GET |
| URL | `{{API_BASE_URL}}/users` |
| Headers | Content-Type: application/json |

**Expected Response (200):**
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

---

### API Test #2: POST (Create User)

**Name:** Create New User

| Field | Value |
|---|---|
| Method | POST |
| URL | `{{API_BASE_URL}}/users` |
| Headers | Content-Type: application/json |
| Body (raw) | See below |

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Expected Response (201):**
```json
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

---

### API Test #3: PUT (Update User)

**Name:** Update User

| Field | Value |
|---|---|
| Method | PUT |
| URL | `{{API_BASE_URL}}/users/1` |
| Headers | Content-Type: application/json |
| Body (raw) | See below |

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "updatedAt": "2026-02-09T10:35:00.000Z"
  }
}
```

---

### API Test #4: DELETE (Delete User)

**Name:** Delete User

| Field | Value |
|---|---|
| Method | DELETE |
| URL | `{{API_BASE_URL}}/users/1` |
| Headers | Content-Type: application/json |

**Expected Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```

---

## Quick Testing Checklist

- [ ] **GET** - Fetch all users (should be empty or have existing data)
- [ ] **POST** - Create a new user with name and email
- [ ] **PUT** - Update the user you just created (use ID from POST response)
- [ ] **GET** - Fetch all users again (should show updated data)
- [ ] **DELETE** - Delete the user (use ID from POST response)
- [ ] **GET** - Fetch all users again (should be empty)

---

## Troubleshooting

### Frontend not connecting to backend
- Check EC2 security group: Allow port 3001
- Check API URL in `App.js`: Use correct EC2 IP
- Check CORS in backend (should be configured)

### Backend won't start on EC2
```bash
# Check if port 3001 is in use
sudo lsof -i :3001

# Check .env file
cat .env

# Check server.js
node server.js
```

### Cloudflare deployment fails
- Check `build/` folder exists
- Build command: `npm run build`
- Output directory: `build`
- Check for console errors in Cloudflare dashboard

