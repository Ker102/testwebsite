# Google OAuth Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your Teremaailm AI application.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "Teremaailm AI")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud Console, select your project
2. Go to "APIs & Services" > "Library"
3. Search for "Google+ API"
4. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: Teremaailm AI
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. On the "Scopes" page, click "Add or Remove Scopes"
   - Add these scopes:
     - `userinfo.email`
     - `userinfo.profile`
     - `openid`
7. Click "Save and Continue"
8. On "Test users", add your email for testing
9. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Configure the settings:
   - **Name**: Teremaailm AI Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `http://localhost:3001` (if using alternate port)
     - Your production URL (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3001/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret** (you'll need these for the next step)

## Step 5: Configure Environment Variables

1. In your project root, create or update the `.env.local` file:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3001

# Admin Password (keep this secure!)
ADMIN_PASSWORD=your_admin_password_here

# Google AI API Key
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

2. Replace the placeholder values:
   - `GOOGLE_CLIENT_ID`: Paste the Client ID from Step 4
   - `GOOGLE_CLIENT_SECRET`: Paste the Client Secret from Step 4
   - `NEXTAUTH_SECRET`: Generate a random secret (see below)
   - `NEXTAUTH_URL`: Use `http://localhost:3001` for development, your production URL for production
   - `ADMIN_PASSWORD`: Keep your existing admin password
   - `GOOGLE_AI_API_KEY`: Keep your existing Google AI API key

### Generating NEXTAUTH_SECRET

Run this command in your terminal to generate a secure random secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

## Step 6: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3001`

3. You should see two authentication badges in the top-right:
   - **"Sign in with Google"** - For user authentication (saves chat history)
   - **"Admin Login for AI"** - For admin access (required to use the LLM)

4. Click "Sign in with Google" to test the Google OAuth flow

5. After signing in with Google, you'll still need to login as admin to use the AI features

## Two-Layer Authentication System

Your application now has a dual authentication system:

### 1. User Authentication (Google OAuth)
- **Purpose**: Save user progress and chat history
- **How**: Users sign in with their Google account
- **Access**: Anyone with a Google account can sign in

### 2. Admin Authentication (Password-based)
- **Purpose**: Gate access to the LLM/AI features
- **How**: Users must enter the admin password
- **Access**: Only users with admin credentials can use the AI

**Both authentications work independently:**
- Users can be signed in with Google but not have admin access
- Admin access is required to actually use the AI chat features
- User authentication persists across sessions for saving progress

## Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` in your environment variables to your production URL
2. Add your production URL to the Google OAuth authorized origins and redirect URIs
3. Ensure all environment variables are set in your hosting platform
4. Never commit `.env.local` to version control

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Cloud Console exactly matches your application URL
- Format: `http://localhost:3001/api/auth/callback/google`

### Error: "Access blocked: This app's request is invalid"
- Make sure you've added your email as a test user in the OAuth consent screen
- Verify that Google+ API is enabled

### Google sign-in button not working
- Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correctly set
- Verify that `NEXTAUTH_URL` matches your current URL
- Check browser console for any error messages

### Session not persisting
- Verify `NEXTAUTH_SECRET` is set and is at least 32 characters
- Clear your browser cookies and try again

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. Use a **strong NEXTAUTH_SECRET** (at least 32 characters)
3. Keep your **GOOGLE_CLIENT_SECRET** secure
4. Use **HTTPS** in production
5. Regularly rotate your secrets
6. Implement rate limiting for authentication endpoints
7. Monitor authentication logs for suspicious activity

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

