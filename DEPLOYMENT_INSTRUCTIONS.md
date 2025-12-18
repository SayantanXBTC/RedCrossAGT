# 🚀 Backend Deployment Instructions - Red Cross Tripura

## Current Status
✅ Backend CORS configured for Netlify (https://redcrosstrp.netlify.app)
✅ Environment variables set up
✅ Deployment files created

## ⚠️ CRITICAL: Your Backend Won't Work from Netlify Yet

Your backend runs on `localhost:5000` which is only accessible from your computer. Netlify (cloud) cannot reach it.

**You have 2 options:**

---

## Option 1: Quick Test with ngrok (5 minutes)

Use this to test if everything works before deploying.

### Steps:

1. **Install ngrok**
   ```bash
   # Download from https://ngrok.com/download
   # Or install via npm
   npm install -g ngrok
   ```

2. **Start your backend**
   ```bash
   cd RedCross/backend
   npm start
   ```

3. **In a NEW terminal, start ngrok**
   ```bash
   ngrok http 5000
   ```

4. **Copy the HTTPS URL** (looks like: `https://abc123.ngrok.io`)

5. **Update Netlify Environment Variable**
   - Go to: https://app.netlify.com/sites/redcrosstrp/settings/deploys#environment
   - Click "Add variable"
   - Key: `VITE_API_URL`
   - Value: `https://abc123.ngrok.io/api` (your ngrok URL + /api)
   - Save and redeploy

6. **Test your site** - It should now work!

**Note:** ngrok URL changes every restart (unless you pay). This is only for testing.

---

## Option 2: Deploy Backend to Render.com (FREE - Recommended)

Deploy your backend permanently to the cloud.

### Steps:

1. **Create Render Account**
   - Go to: https://render.com
   - Sign up with GitHub

2. **Push Code to GitHub** (if not already)
   ```bash
   cd RedCross
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Create New Web Service on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the RedCross repository

4. **Configure Service**
   - **Name**: `redcross-tripura-backend`
   - **Region**: Singapore (closest to India)
   - **Branch**: main
   - **Root Directory**: Leave empty
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" for each:
   
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

6. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - You'll get a URL like: `https://redcross-tripura-backend.onrender.com`

7. **Test Backend**
   - Visit: `https://redcross-tripura-backend.onrender.com/health`
   - Should see: `{"status":"ok","message":"Indian Red Cross Society - Tripura API Server"}`

8. **Update Netlify Environment Variable**
   - Go to: https://app.netlify.com/sites/redcrosstrp/settings/deploys#environment
   - Add/Update: `VITE_API_URL` = `https://redcross-tripura-backend.onrender.com/api`
   - Redeploy frontend

9. **Done!** Your site should now work completely.

---

## Alternative: Railway.app (Also FREE)

1. Go to: https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select RedCross repository
5. Add environment variables (same as above)
6. Set start command: `cd backend && npm start`
7. Deploy
8. Copy Railway URL
9. Update Netlify env variable

---

## Verify Everything Works

1. **Check Backend Health**
   - Visit: `YOUR_BACKEND_URL/health`
   - Should return JSON with status "ok"

2. **Check CORS**
   - Visit: `YOUR_BACKEND_URL/api`
   - Should see API documentation

3. **Test Frontend**
   - Visit: https://redcrosstrp.netlify.app
   - Try submitting a form (volunteer, contact, etc.)
   - Check admin dashboard

---

## Troubleshooting

### "Network Error" on Netlify
- Backend URL is wrong in Netlify env variables
- Backend is not running
- CORS not configured (already done ✅)

### "CORS Error"
- Check FRONTEND_URL in backend env includes: `https://redcrosstrp.netlify.app`
- Already configured ✅

### Forms Not Submitting
- Check browser console for errors
- Verify VITE_API_URL in Netlify env variables
- Test backend health endpoint

---

## Quick Checklist

- [ ] Backend deployed to Render/Railway (or ngrok running)
- [ ] Backend health check works: `YOUR_BACKEND_URL/health`
- [ ] Netlify env variable set: `VITE_API_URL`
- [ ] Frontend redeployed on Netlify
- [ ] Test form submission on live site
- [ ] Check admin dashboard shows data

---

## Need Help?

1. Check backend logs on Render dashboard
2. Check browser console on Netlify site
3. Verify all environment variables are set correctly
4. Test backend endpoints directly with Postman/curl

---

**Your backend is ready to deploy! Choose Option 1 for quick testing or Option 2 for permanent deployment.**
