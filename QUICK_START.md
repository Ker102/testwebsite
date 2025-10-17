# Quick Start Guide - Google OAuth Setup

Follow these steps to get Google OAuth authentication working in your app.

## Step 1: Get Google OAuth Credentials (15 minutes)

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "Teremaailm AI"

### 1.2 Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in:
   - App name: `Teremaailm AI`
   - User support email: Your email
   - Developer email: Your email
4. Add scopes: `userinfo.email`, `userinfo.profile`, `openid`
5. Add yourself as a test user

### 1.3 Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Add these redirect URIs:
   ```
   http://localhost:3001/api/auth/callback/google
   ```
5. Copy the **Client ID** and **Client Secret**

## Step 2: Configure Environment Variables (2 minutes)

1. Copy the environment template:
   ```bash
   cp env.template .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   # Paste from Google Cloud Console
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   
   # Generate with: openssl rand -base64 32
   NEXTAUTH_SECRET=generate_random_32char_string
   
   # Keep as is for development
   NEXTAUTH_URL=http://localhost:3001
   
   # Your existing credentials
   ADMIN_PASSWORD=your_current_admin_password
   GOOGLE_AI_API_KEY=your_current_google_ai_key
   ```

3. Generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

## Step 3: Test the Implementation (5 minutes)

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3001](http://localhost:3001)

3. Test Google OAuth:
   - Click **"Sign in with Google"** (blue badge, top-right)
   - Complete Google sign-in
   - Verify your email appears in the blue badge

4. Test Admin Access:
   - Click **"Admin Login for AI"** (amber badge, top-right)
   - Enter your admin password
   - Badge should turn green
   - Background changes to white
   - You can now chat with the AI

## What You Should See

### Top-Right Corner
```
┌─────────────────────────────────┐
│ 📧 yourname@gmail.com  ← Google │  ← Blue badge
│ 🛡️ Admin Access         ← Admin │  ← Green badge
└─────────────────────────────────┘
```

### When Not Logged In
```
┌─────────────────────────────────┐
│ 🌐 Sign in with Google          │  ← Blue badge
│ ⚠️ Admin Login for AI           │  ← Amber badge
└─────────────────────────────────┘
```

## Troubleshooting

### ❌ "redirect_uri_mismatch"
**Problem:** Google redirect URI doesn't match

**Solution:**
1. Go to Google Cloud Console
2. Navigate to Credentials
3. Edit your OAuth Client
4. Make sure redirect URI is exactly:
   ```
   http://localhost:3001/api/auth/callback/google
   ```

### ❌ "Access blocked: This app's request is invalid"
**Problem:** Not added as test user

**Solution:**
1. Go to OAuth consent screen
2. Scroll to "Test users"
3. Add your email address

### ❌ Google sign-in button does nothing
**Problem:** Missing or incorrect credentials

**Solution:**
1. Check `.env.local` file exists
2. Verify `GOOGLE_CLIENT_ID` is set
3. Verify `GOOGLE_CLIENT_SECRET` is set
4. Restart dev server: `npm run dev`

### ❌ Session doesn't persist after refresh
**Problem:** Missing or weak NEXTAUTH_SECRET

**Solution:**
1. Generate new secret: `openssl rand -base64 32`
2. Add to `.env.local` as `NEXTAUTH_SECRET`
3. Must be 32+ characters
4. Restart dev server

## Need More Help?

📚 **Detailed Documentation:**
- [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md) - Complete setup guide
- [NEXTAUTH_IMPLEMENTATION.md](./NEXTAUTH_IMPLEMENTATION.md) - Technical details
- [README.md](./README.md) - Project overview

🔗 **External Resources:**
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)

## Summary

✅ **What's working:**
- Google OAuth sign-in
- Session persistence
- User email display
- Admin authentication (existing)
- Dual authentication system

🎯 **Next steps:**
- Add database for chat history
- Implement user dashboard
- Add profile management

---

**Total setup time: ~20 minutes**

Good luck! 🚀

