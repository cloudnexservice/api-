# GitHub Setup Guide

## Step 1: Create a GitHub Repository

1. Go to **https://github.com/new**
2. Enter repository name: `crud-app` (or any name you want)
3. Choose **Public** (for Cloudflare Pages to access)
4. Click **"Create repository"**
5. Copy the repository URL (looks like: `https://github.com/yourusername/crud-app.git`)

---

## Step 2: Push Your Code to GitHub

Run these commands in PowerShell from your project root:

```bash
# Navigate to project folder
cd "C:\projects - clients\New crud"

# Configure Git (do this once)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add GitHub remote
git remote add origin https://github.com/yourusername/crud-app.git

# Create .gitignore file (optional but important)
# Add node_modules and other files you don't want to push

# Stage all files
git add .

# Commit your code
git commit -m "Initial commit: CRUD app with React frontend and Express backend"

# Push to GitHub (replace 'main' if your default branch is different)
git branch -M main
git push -u origin main
```

---

## Step 3: Verify on GitHub

1. Go to your GitHub repository URL
2. You should see all your files:
   - `backend/` folder
   - `frontend/` folder
   - Other files

---

## Step 4: Connect Cloudflare Pages to GitHub

1. Go to **https://dash.cloudflare.com/**
2. Click **Pages** → **Create a project**
3. Click **"Connect to Git"**
4. Authorize GitHub & select your `crud-app` repository
5. Configure build settings:
   - **Root directory:** `frontend`
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
6. Click **Save and Deploy**

Cloudflare will automatically deploy whenever you push to GitHub! 🚀

---

## Quick Commands Reference

```bash
# Check status
git status

# View all commits
git log

# Push new changes to GitHub
git add .
git commit -m "Your message"
git push

# Pull latest changes from GitHub
git pull

# View remote
git remote -v
```

---

## Common Issues

### `fatal: not a git repository`
- You need to run `git init` first (you already did this)

### `Authentication failed`
- Use personal access token instead of password
- Go to **GitHub Settings** → **Developer settings** → **Personal access tokens**
- Use token in place of password when prompted

### Files not showing on GitHub
- Check `.gitignore` - make sure important files aren't excluded
- Run `git status` to see what's staged

