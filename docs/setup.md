# Firebase Setup Guide 🔥

This guide will walk you through setting up Firebase Realtime Database for cross-device synchronization in your Baby Tracker app.

## Why Firebase?

Firebase Realtime Database allows your baby tracking data to sync instantly between all your devices (phones, tablets, computers). This means both parents can log events and see updates in real-time.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click **"Create a project"**
4. Enter project name: `baby-tracker-[your-name]` (e.g., `baby-tracker-smith`)
5. **Disable Google Analytics** (not needed for this app)
6. Click **"Create project"**
7. Wait for project creation to complete

## Step 2: Set Up Realtime Database

1. In your Firebase project console, click **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose a location closest to you:
   - **US**: `us-central1`
   - **Europe**: `europe-west1`
   - **Asia**: `asia-southeast1`
4. Select **"Start in test mode"** (we'll secure it later)
5. Click **"Enable"**

Your database is now ready! The URL will look like:
`https://baby-tracker-smith-default-rtdb.firebaseio.com/`

## Step 3: Register Web App

1. In the Firebase console, click the **gear icon** ⚙️ (Project Settings)
2. Scroll down to **"Your apps"** section
3. Click the **web icon** `</>`
4. Enter app nickname: `Baby Tracker`
5. **Do NOT check** "Set up Firebase Hosting"
6. Click **"Register app"**

## Step 4: Copy Configuration

You'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "baby-tracker-smith.firebaseapp.com",
  databaseURL: "https://baby-tracker-smith-default-rtdb.firebaseio.com/",
  projectId: "baby-tracker-smith",
  storageBucket: "baby-tracker-smith.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

**Important**: Copy this entire configuration object. You'll need it for the app.

## Step 5: Configure the App

1. Open your Baby Tracker app in a web browser
2. On first visit, you'll see a Firebase configuration modal
3. Paste the entire configuration object (including the curly braces `{}`)
4. Click **"Save Config"**
5. The app will connect to Firebase and start syncing

## Step 6: Test Cross-Device Sync

1. Open the app on a second device (phone, tablet, or another browser)
2. The configuration modal will appear again
3. Paste the same Firebase configuration
4. Log an event on one device
5. Check that it appears on the other device within 2 seconds

## Step 7: Secure Your Database (Recommended)

By default, your database is open to anyone. To secure it:

1. Go to Firebase Console > Realtime Database
2. Click on the **"Rules"** tab
3. Replace the existing rules with:

```json
{
  "rules": {
    "events": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Click **"Publish"**

### Even More Secure (Advanced)

For maximum security, you can enable authentication:

1. Go to Firebase Console > Authentication
2. Click **"Get started"**
3. Enable **"Email/Password"** provider
4. Update your database rules to:

```json
{
  "rules": {
    "events": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

This requires each user to sign in, and they can only access their own data.

## Troubleshooting

### "Firebase config is invalid"
- Check that you copied the entire configuration object
- Ensure it's valid JSON (proper quotes, brackets, commas)
- Don't include the `const firebaseConfig = ` part

### "Permission denied"
- Check your database rules
- Ensure you're using the correct database URL
- Verify your Firebase project is active

### "App not syncing"
- Check that both devices use the same Firebase configuration
- Verify internet connection on both devices
- Look for errors in browser console (F12)

### "Database doesn't exist"
- Ensure you created a Realtime Database (not Firestore)
- Check that the database URL in your config is correct
- Verify your Firebase project is active

## Alternative: Skip Firebase

If you don't want to set up Firebase:

1. Click **"Skip"** in the configuration modal
2. The app will work with local storage only
3. Data will only be available on the device where it was entered
4. You can always add Firebase later by clicking the settings gear in the app

## Firebase Pricing

Firebase Realtime Database is free for small usage:
- **Free tier**: 1GB storage, 10GB/month transfer
- **Paid tier**: $5/GB storage, $1/GB transfer

A typical family's baby tracking data will use less than 1MB per month, so you'll likely never exceed the free tier.

## Security Best Practices

1. **Use a specific project**: Create a dedicated Firebase project for baby tracking
2. **Don't share publicly**: Keep your Firebase configuration private
3. **Regular backups**: Export your data periodically
4. **Monitor usage**: Check Firebase console for unusual activity

## Data Export

To export your data:
1. Go to Firebase Console > Realtime Database
2. Click on the **"Export JSON"** button
3. Save the file as backup

## Multiple Children

To track multiple children with the same Firebase project:
1. Use the same configuration for all children
2. Events will be stored together
3. Consider adding a `child` field to events for filtering

## Next Steps

Once Firebase is set up:
1. Share the configuration with your partner
2. Both install the app on your devices
3. Add the app to your home screens
4. Start tracking!

---

**Need help?** Create an issue in the GitHub repository with your specific problem.