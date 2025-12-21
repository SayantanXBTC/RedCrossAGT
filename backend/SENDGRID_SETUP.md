# SendGrid Setup Guide (5 Minutes)

## Why SendGrid?
- ✅ Works reliably on Render (no port blocking)
- ✅ Free tier: 100 emails/day (enough for your needs)
- ✅ Better deliverability than Gmail SMTP
- ✅ No timeout issues

## Quick Setup Steps

### 1. Create SendGrid Account (2 minutes)
1. Go to: https://signup.sendgrid.com/
2. Sign up with your email
3. Verify your email address
4. Complete the onboarding (select "Integrate using Web API or SMTP")

### 2. Create API Key (1 minute)
1. Go to: https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Name it: "Red Cross Tripura"
4. Select "Full Access"
5. Click "Create & View"
6. **COPY THE API KEY** (you won't see it again!)

### 3. Verify Sender Email (2 minutes)
1. Go to: https://app.sendgrid.com/settings/sender_auth/senders
2. Click "Create New Sender"
3. Fill in:
   - From Name: Indian Red Cross Society - Tripura
   - From Email: ircstrp@gmail.com
   - Reply To: ircstrp@gmail.com
   - Company: Indian Red Cross Society
   - Address: (your address)
   - City: Agartala
   - State: Tripura
   - Country: India
4. Click "Create"
5. **Check your email (ircstrp@gmail.com) and verify the sender**

### 4. Update Render Environment Variables
1. Go to: https://dashboard.render.com/
2. Select your backend service
3. Go to "Environment" tab
4. Update these variables:

```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=<your-sendgrid-api-key-from-step-2>
EMAIL_FROM=ircstrp@gmail.com
ADMIN_EMAIL=ircstrp@gmail.com
```

5. Click "Save Changes"
6. Render will automatically redeploy (takes 2-3 minutes)

### 5. Test
After deployment completes, test by submitting a form on your website. Check Render logs - you should see:
```
✅ Email sent successfully!
```

## Troubleshooting

**If emails still don't send:**
1. Make sure you verified the sender email in SendGrid
2. Check that EMAIL_USER is exactly: `apikey` (not your email)
3. Check that EMAIL_PASS is your SendGrid API key (starts with `SG.`)
4. Wait 5-10 minutes after sender verification

**Check SendGrid Dashboard:**
- Go to: https://app.sendgrid.com/email_activity
- You'll see all sent emails and their status

## Alternative: Use SendGrid API (Even Better)

If SMTP still has issues, I can switch the code to use SendGrid's API instead of SMTP. Just let me know!
