# 🚀 Complete Deployment Guide - Red Cross Tripura

This guide covers deploying both backend (Render) and frontend (Netlify).

---

## 📋 Overview

- **Backend**: Deploy to Render.com (FREE)
- **Frontend**: Deploy to Netlify (FREE)
- **Database**: MongoDB Atlas (already configured)

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to: **https://render.com**
2. Click **"Get Started"**
3. Sign up with **GitHub**
4. Authorize Render to access your repositories

### Step 2: Create Web Service

1. Click **"New +"** (top right) → **"Web Service"**
2. Connect your GitHub account if needed
3. Find and select: **`SayantanXBTC/RedCrossAGT`**
4. Click **"Connect"**

### Step 3: Configure Backend Service

**Basic Settings:**
- **Name**: `redcross-tripura-backend`
- **Region**: `Singapore` (closest to India)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **CRITICAL - MUST SET THIS**
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select: **Free** ($0/month)

### Step 4: Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these 13 variables (click "Add Environment Variable" for each):

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://redcross-admin:HT8JSOaTgx4O3InO@cluster0.fdbqfuv.mongodb.net/redcross-tripura?retryWrites=true&w=majority&appName=Cluster0
GEMINI_API_KEY = AIzaSyAgbkD2QFR2w0LZeLUfKaLPequbWBv75Hk
JWT_SECRET = redcross-tripura-secret-key-2024
FRONTEND_URL = https://redcrosstrp.netlify.app
EMAIL_HOST = smtp.gmail.com
EMAIL_PORT = 587
EMAIL_SECURE = false
EMAIL_USER = ircstrp@gmail.com
EMAIL_PASS = txwvdudpjrhzlmmq
EMAIL_FROM = ircstrp@gmail.com
ADMIN_EMAIL = ircstrp@gmail.com
```

### Step 5: Deploy Backend

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Watch logs for: `🚀 Server running on port 5000`

### Step 6: Get Backend URL

Once deployed, you'll see your URL at the top:
- Example: `https://redcross-tripura-backend.onrender.com`
- **COPY THIS URL** - you'll need it for frontend deployment

### Step 7: Test Backend

Open in browser:
```
https://YOUR-RENDER-URL.onrender.com/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Indian Red Cross Society - Tripura API Server"
}
```

✅ **Backend deployment complete!**

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Prepare Frontend for Deployment

First, we need to build the frontend locally to verify it works.

**In your terminal:**
```bash
cd RedCross/frontend
npm install
npm run build
```

This creates a `dist` folder with your production build.

### Step 2: Create Netlify Account

1. Go to: **https://www.netlify.com**
2. Click **"Sign up"**
3. Sign up with **GitHub**
4. Authorize Netlify

### Step 3: Deploy Frontend

**Option A: Deploy from GitHub (Recommended)**

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select repository: **`SayantanXBTC/RedCrossAGT`**
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Click **"Show advanced"** → **"New variable"**
6. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR-RENDER-URL.onrender.com/api`
   (Replace with your actual Render URL from Part 1)
7. Click **"Deploy site"**

**Option B: Manual Deploy (Drag & Drop)**

1. Click **"Add new site"** → **"Deploy manually"**
2. Drag the `frontend/dist` folder to the upload area
3. Wait for deployment
4. Go to **Site settings** → **Environment variables**
5. Add: `VITE_API_URL` = `https://YOUR-RENDER-URL.onrender.com/api`
6. Redeploy site

### Step 4: Configure Custom Domain (Optional)

If you want to use `redcrosstrp.netlify.app`:
1. Go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Change to: `redcrosstrp`
4. Your site will be: `https://redcrosstrp.netlify.app`

### Step 5: Update Backend CORS

Now that you have your Netlify URL, update backend:

1. Go back to **Render dashboard**
2. Select your backend service
3. Go to **Environment** tab
4. Find `FRONTEND_URL` variable
5. Update value to: `https://redcrosstrp.netlify.app`
6. Save (backend will auto-redeploy)

✅ **Frontend deployment complete!**

---
## Part 3: Verify Everything Works

### Test 1: Backend Health Check
Visit: `https://YOUR-RENDER-URL.onrender.com/health`
- Should show: `{"status":"ok"}`

### Test 2: Frontend Loads
Visit: `https://redcrosstrp.netlify.app`
- Home page should load with images

### Test 3: Forms Work
1. Go to Volunteer page
2. Fill and submit form
3. Should see success message

### Test 4: Admin Dashboard
1. Go to: `https://redcrosstrp.netlify.app/admin`
2. Login with:
   - Email: `admin@redcrosstripura.org`
   - Password: `admin123`
3. Check if volunteer submission appears

### Test 5: Chatbot
1. Click chatbot icon on any page
2. Send a message
3. Should get AI response

✅ **All systems operational!**

---

## 🔧 Troubleshooting

### Backend Issues

**"Application Error" on Render**
- Check logs in Render dashboard
- Verify all 13 environment variables are set
- Ensure Root Directory is `backend`

**"Cannot connect to MongoDB"**
- Verify MONGODB_URI is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Backend sleeps after 15 minutes**
- Normal on free tier
- First request takes 30-60 seconds to wake up
- Use UptimeRobot to keep it awake (optional)

### Frontend Issues

**"Network Error" when submitting forms**
- Check browser console for actual error
- Verify `VITE_API_URL` in Netlify env variables
- Make sure it ends with `/api`
- Redeploy Netlify after changing env variables

**"CORS Error"**
- Verify `FRONTEND_URL` in Render includes your Netlify URL
- Should be: `https://redcrosstrp.netlify.app`
- No trailing slash

**Images not loading**
- Images should be in `frontend/public/images/`
- Check build logs for errors
- Verify `frontend/dist` is the publish directory

**Build fails on Netlify**
- Check build logs
- Verify Base directory is `frontend`
- Verify Build command is `npm run build`
- Check for any TypeScript/ESLint errors

### Database Issues

**Forms submit but don't appear in admin**
- Check Render logs for database errors
- Verify MongoDB connection string
- Check admin is querying correct database

---

## 📊 Deployment Summary

### URLs
- **Frontend**: https://redcrosstrp.netlify.app
- **Backend**: https://YOUR-RENDER-URL.onrender.com
- **Admin**: https://redcrosstrp.netlify.app/admin
- **API Docs**: https://YOUR-RENDER-URL.onrender.com/api

### Credentials
- **Admin Email**: admin@redcrosstripura.org
- **Admin Password**: admin123

### Environment Variables

**Render (Backend) - 13 variables:**
- NODE_ENV, PORT, MONGODB_URI, GEMINI_API_KEY, JWT_SECRET
- FRONTEND_URL, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE
- EMAIL_USER, EMAIL_PASS, EMAIL_FROM, ADMIN_EMAIL

**Netlify (Frontend) - 1 variable:**
- VITE_API_URL

---

## 🎯 Quick Checklist

**Backend (Render):**
- [ ] Account created
- [ ] Web Service created from GitHub
- [ ] Root Directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All 13 environment variables added
- [ ] Deployed successfully
- [ ] Health check works

**Frontend (Netlify):**
- [ ] Account created
- [ ] Site deployed from GitHub or manually
- [ ] Base directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `frontend/dist`
- [ ] VITE_API_URL environment variable set
- [ ] Site accessible
- [ ] Forms working

**Integration:**
- [ ] Backend FRONTEND_URL includes Netlify URL
- [ ] Frontend VITE_API_URL points to Render backend
- [ ] CORS working (no errors in console)
- [ ] Forms submit successfully
- [ ] Admin dashboard shows submissions
- [ ] Chatbot responds

---

## 🚀 You're Live!

Your Red Cross Tripura website is now fully deployed and operational!

**Next Steps:**
1. Test all features thoroughly
2. Share the URL with stakeholders
3. Monitor Render logs for any issues
4. Consider upgrading to paid tiers for better performance

**Support:**
- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com
- MongoDB Atlas: https://www.mongodb.com/docs/atlas

---

**Congratulations! 🎉**
