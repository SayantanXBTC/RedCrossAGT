# 🚀 Quick Start - Deploy Backend in 10 Minutes

## Your backend is ready! Here's what to do:

### ✅ What's Already Done:
- CORS configured for Netlify ✓
- Environment variables set up ✓
- Deployment files created ✓
- GitHub repo connected ✓

### 🎯 Next Steps (Choose ONE):

---

## FASTEST: Use ngrok (For Testing - 5 minutes)

1. **Install ngrok**: Download from https://ngrok.com/download

2. **Start backend**:
   ```bash
   cd RedCross/backend
   npm start
   ```

3. **In new terminal, run**:
   ```bash
   ngrok http 5000
   ```

4. **Copy the https URL** (e.g., `https://abc123.ngrok.io`)

5. **Update Netlify**:
   - Go to: https://app.netlify.com/sites/redcrosstrp/settings/deploys#environment
   - Add variable: `VITE_API_URL` = `https://abc123.ngrok.io/api`
   - Click "Trigger deploy"

6. **Done!** Test your site at https://redcrosstrp.netlify.app

---

## PERMANENT: Deploy to Render.com (FREE - 10 minutes)

1. **Go to**: https://render.com and sign up with GitHub

2. **Click**: "New +" → "Web Service"

3. **Select**: Your GitHub repo `SayantanXBTC/RedCrossAGT`

4. **Configure**:
   - Name: `redcross-tripura-backend`
   - Region: Singapore
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

5. **Add Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://redcross-admin:HT8JSOaTgx4O3InO@cluster0.fdbqfuv.mongodb.net/redcross-tripura?retryWrites=true&w=majority&appName=Cluster0
   GEMINI_API_KEY=AIzaSyAgbkD2QFR2w0LZeLUfKaLPequbWBv75Hk
   JWT_SECRET=redcross-tripura-secret-key-2024
   FRONTEND_URL=https://redcrosstrp.netlify.app
   EMAIL_USER=ircstrp@gmail.com
   EMAIL_PASS=txwvdudpjrhzlmmq
   EMAIL_FROM=ircstrp@gmail.com
   ADMIN_EMAIL=ircstrp@gmail.com
   ```

6. **Click**: "Create Web Service" (wait 5-10 min)

7. **Copy your Render URL** (e.g., `https://redcross-tripura-backend.onrender.com`)

8. **Update Netlify**:
   - Go to: https://app.netlify.com/sites/redcrosstrp/settings/deploys#environment
   - Add: `VITE_API_URL` = `https://YOUR-RENDER-URL.onrender.com/api`
   - Trigger deploy

9. **Done!** Your site is fully deployed.

---

## Test It Works:

1. Visit your backend: `YOUR_URL/health` (should show "ok")
2. Visit Netlify: https://redcrosstrp.netlify.app
3. Try submitting a volunteer form
4. Check admin dashboard

---

## Need Help?

Read full instructions: `DEPLOYMENT_INSTRUCTIONS.md`

**Your backend is 100% ready to deploy - just follow the steps above!**
