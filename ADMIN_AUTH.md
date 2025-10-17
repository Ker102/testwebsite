# Admin Authentication

## Overview
The chat application now requires admin authentication before users can send messages. Users can view the interface but will be redirected to the login page when they try to send their first message.

## Default Password
The default admin password is: `admin123`

## Changing the Admin Password

### For Local Development:
1. Open `.env.local` in the project root
2. Change the `ADMIN_PASSWORD` value:
   ```env
   ADMIN_PASSWORD=your_new_password_here
   ```
3. Restart the development server

### For Production:
Set the `ADMIN_PASSWORD` environment variable in your deployment platform:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Railway**: Project Variables
- **Docker**: Pass via `-e ADMIN_PASSWORD=your_password`

## How It Works

1. **View Mode**: Anyone can access the chat interface and see the UI
2. **Send Message**: When a user types a message and tries to send it:
   - If **not authenticated** → Redirect to `/admin/login`
   - If **authenticated** → Message is sent normally
3. **Login**: Enter the admin password to gain access
4. **Persistent**: Authentication state is saved in localStorage

## Security Features

- ✅ Password stored in environment variable (never committed)
- ✅ API endpoint validates password
- ✅ Client-side auth check before sending messages
- ✅ Persistent authentication using Zustand
- ✅ Secure password input with show/hide toggle

## Login Page
Access the login page at: `http://localhost:3000/admin/login`

## Logout
To logout, clear your browser's localStorage or add a logout button by calling:
```typescript
useAuthStore.getState().logout();
```

## Future Enhancements
Consider adding:
- Session expiration
- Multiple admin users
- JWT tokens
- Rate limiting
- Two-factor authentication
- Password reset functionality

