# 🚂 Railway.app Deployment Guide

## Quick Fix for Your Error

The error `npm: not found` means Railway couldn't find Node.js. Here's how to fix it:

---

## Method 1: Set Root Directory (EASIEST)

1. **Go to your Railway project dashboard**

2. **Click on your service** → **Settings**

3. **Set Root Directory**:
   - Find "Root Directory" setting
   - Set to: `backend`
   - Save

4. **Set Build & Start Commands**:
   - Install Command: `npm install`
   - Build Command: (leave empty)
   - Start Command: `npm start`
   - Save

5. **Add Environment Variables** (Variables tab):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://redcross-admin:HT8JSOaTgx4O3InO@cluster0.fdbqfuv.mongodb.net/redcross-tripura?retryWrites=true&w=majority&appName=Cluster0
   GEMINI_API_KEY=AIzaSyAgbkD2QFR2w0LZeLUfKaLPequbWBv75Hk
   JWT_SECRET=redcross-tripura-secret-key-2024
   FRONTEND_URL=https://redcrosstrp.netlify.app
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=ircstrp@gmail.com
   EMAIL_PASS=txwvdudpjrhzlmmq
   EMAIL_FROM=ircstrp@gmail.com
   ADMIN_EMAIL=ircstrp@gmail.com
   ```

6. **Redeploy**:
   - Go to Deployments tab
   - Click "Redeploy"

---

## Method 2: Use Configuration Files (Already Added)

I've added these files to your repo:
- `nixpacks.toml` - Tells Railway to use Node.js 20
- `railway.json` - Configures build and start commands
- `Procfile` - Alternative configuration

**Push these to GitHub**:
```bash
cd RedCross
git add .
git commit -m "Add Railway configuration files"
git push origin main
```

Then in Railway:
1. Go to Settings → Redeploy
2. Railway will automatically detect the config files

---

## Method 3: Switch to Render.com (Recommended)

Railway can be tricky. Render.com is more straightforward:

1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **New Web Service** → Select your repo
4. **Configure**:
   - Name: `redcross-tripura-backend`
   - Region: Singapore
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add environment variables** (same as above)
6. **Deploy**

Render automatically detects Node.js and handles everything correctly.

---

## Verify Deployment Works

Once deployed (Railway or Render), test:

1. **Health Check**:
   ```
   https://YOUR-BACKEND-URL.railway.app/health
   ```
   Should return: `{"status":"ok","message":"Indian Red Cross Society - Tripura API Server"}`

2. **API Documentation**:
   ```
   https://YOUR-BACKEND-URL.railway.app/api
   ```
   Should show all available endpoints

3. **Update Netlify**:
   - Go to: https://app.netlify.com/sites/redcrosstrp/settings/deploys#environment
   - Add variable: `VITE_API_URL` = `https://YOUR-BACKEND-URL.railway.app/api`
   - Trigger deploy

---

## Troubleshooting

### "npm: not found"
- Set Root Directory to `backend` in Railway settings
- Or push the nixpacks.toml file to GitHub

### "Module not found"
- Make sure Install Command is set to `npm install`
- Check that Root Directory is `backend`

### "Port already in use"
- Railway automatically sets PORT variable
- Your code already handles this: `process.env.PORT || 5000`

### Still having issues?
- Try Render.com instead (more reliable for Node.js apps)
- Or use ngrok for quick testing

---

## Quick Commands

**Push Railway config files**:
```bash
cd RedCross
git add nixpacks.toml railway.json Procfile RAILWAY_SETUP.md
git commit -m "Add Railway configuration"
git push origin main
```

**Test backend locally**:
```bash
cd RedCross/backend
npm start
```

Then visit: http://localhost:5000/health

---

**Recommendation**: If Railway continues to give issues, switch to Render.com. It's more reliable and has better Node.js support.
