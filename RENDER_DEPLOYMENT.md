# 🚀 Render.com Deployment Guide - Red Cross Tripura

## Your project is 100% ready for Render! Follow these steps:

---

## Step 1: Create Render Account

1. Go to: **https://render.com**
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest option)
4. Authorize Render to access your GitHub repositories

---

## Step 2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed to link GitHub
4. Find and select: **`SayantanXBTC/RedCrossAGT`**
5. Click **"Connect"**

---

## Step 3: Configure Service

Fill in these settings:

### Basic Settings:
- **Name**: `redcross-tripura-backend`
- **Region**: `Singapore` (closest to India)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`

### Build & Deploy:
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Instance Type:
- Select: **Free** (0$/month)

---

## Step 4: Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these one by one (click "Add Environment Variable" for each):

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

---

## Step 5: Deploy

1. Click **"Create Web Service"** button at the bottom
2. Wait 5-10 minutes for deployment
3. Watch the logs - you should see:
   - `Installing dependencies...`
   - `🚀 Server running on port 5000`
   - `Your service is live 🎉`

---

## Step 6: Get Your Render URL

Once deployed, you'll see your URL at the top:
- Format: `https://redcross-tripura-backend.onrender.com`
- Copy this URL

---

## Step 7: Test Your Backend

Open in browser:
```
https://YOUR-RENDER-URL.onrender.com/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Indian Red Cross Society - Tripura API Server",
  "timestamp": "2024-..."
}
```

Also test:
```
https://YOUR-RENDER-URL.onrender.com/api
```

Should show API documentation.

---

## Step 8: Update Netlify

1. Go to: **https://app.netlify.com/sites/redcrosstrp/settings/deploys#environment**
2. Click **"Add variable"** or **"Edit"** if exists
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR-RENDER-URL.onrender.com/api`
4. Click **"Save"**
5. Go to **Deploys** tab → Click **"Trigger deploy"** → **"Deploy site"**

---
## Step 9: Verify Everything Works

1. **Visit your Netlify site**: https://redcrosstrp.netlify.app
2. **Test a form**: Try submitting volunteer or contact form
3. **Check admin**: Login at `/admin` with:
   - Email: `admin@redcrosstripura.org`
   - Password: `admin123`
4. **Verify data**: Check if form submissions appear in admin dashboard

---

## Troubleshooting

### Deployment Failed
- Check logs in Render dashboard
- Verify Root Directory is set to `backend`
- Make sure all environment variables are added

### "Application Error" or 503
- Backend is starting (takes 1-2 minutes on free tier)
- Check logs for errors
- Verify MongoDB connection string is correct

### Forms Not Working on Netlify
- Check browser console for errors
- Verify `VITE_API_URL` in Netlify env variables
- Make sure you redeployed Netlify after adding variable
- Check CORS: `FRONTEND_URL` in Render should include Netlify URL

### "CORS Error"
- Already configured! ✅
- If still seeing it, verify `FRONTEND_URL` in Render includes: `https://redcrosstrp.netlify.app`

---

## Important Notes

⚠️ **Free Tier Limitations**:
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Subsequent requests are fast

💡 **To keep it awake**: Use a service like UptimeRobot to ping your backend every 10 minutes

---

## Quick Checklist

- [ ] Render account created
- [ ] Web Service created from GitHub repo
- [ ] Root Directory set to `backend`
- [ ] All 13 environment variables added
- [ ] Service deployed successfully
- [ ] Health check works: `/health` endpoint
- [ ] Render URL copied
- [ ] Netlify `VITE_API_URL` updated
- [ ] Netlify redeployed
- [ ] Forms working on live site
- [ ] Admin dashboard accessible

---

## Your Configuration Summary

**GitHub Repo**: `SayantanXBTC/RedCrossAGT`
**Render Service**: `redcross-tripura-backend`
**Render URL**: `https://redcross-tripura-backend.onrender.com`
**Netlify Site**: `https://redcrosstrp.netlify.app`
**Root Directory**: `backend`
**Build Command**: `npm install`
**Start Command**: `npm start`

---

**You're all set! Your project is ready for Render deployment. Just follow the steps above.** 🎉
