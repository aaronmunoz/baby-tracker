# Baby Tracker 🍼

A simple, mobile-friendly web application for tracking baby feeding, diaper changes, and spit-ups. Built with vanilla HTML, CSS, and JavaScript for fast loading and easy deployment.

## 🌟 Features

- **One-tap logging** of feeding, diaper changes, and spit-ups
- **Breast selection** for feeding tracking (left/right)
- **Duration tracking** for feeding sessions (optional)
- **Real-time timeline** showing today's events
- **Cross-device sync** via Firebase Realtime Database
- **Offline support** with localStorage fallback
- **Mobile-optimized** with large touch targets
- **Add to Home Screen** for native app experience
- **Demo mode** for testing without real data

## 🚀 Quick Start

### Option 1: Use the Live Demo
Visit the deployed app at: `https://[your-username].github.io/baby-tracker`

### Option 2: Local Development
1. Clone this repository
2. Open `index.html` in your browser
3. Start logging events!

## 📱 Setup Instructions

### First Time Setup
1. Open the app in your mobile browser
2. You'll see a Firebase configuration modal
3. Choose one of two options:
   - **With Sync**: Enter your Firebase config for cross-device sync
   - **Local Only**: Click "Skip" to use local storage only

### Adding to Home Screen
**iOS Safari:**
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

**Android Chrome:**
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home Screen"

## 🔧 Firebase Setup (Optional)

To enable cross-device synchronization:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Enable Realtime Database in test mode
5. Copy your Firebase configuration
6. Paste it into the app's configuration modal

See [docs/setup.md](docs/setup.md) for detailed instructions with screenshots.

## 📊 How to Use

### Feeding
1. Tap **Feed** button
2. Select which breast (left/right)
3. Optionally enter duration in minutes
4. Tap **Save**

### Diaper Changes
1. Tap **Diaper** button
2. Check what happened (poop/pee or both)
3. Tap **Save**

### Spit-ups
1. Tap **Spit-up** button
2. Event is logged instantly

### Timeline
- View today's events in reverse chronological order
- Color-coded cards for different event types
- Shows time, details, and relevant information

## 📱 Mobile Features

- **Touch-friendly**: Large buttons sized for easy one-handed use
- **Fast loading**: Under 1 second load time
- **Responsive**: Works on all screen sizes
- **Night mode ready**: High contrast for late-night use
- **No zoom**: Prevents accidental zooming on input focus

## 🔒 Privacy & Data

- **Local storage**: Data stays on your device by default
- **Firebase sync**: Optional - uses your own Firebase project
- **No tracking**: No analytics or third-party tracking
- **Secure**: No sensitive data is logged

## 🛠️ Technical Details

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Database**: Firebase Realtime Database (optional)
- **Hosting**: GitHub Pages compatible
- **Size**: Single HTML file (~15KB)
- **Dependencies**: Tailwind CSS and Firebase (CDN)

## 📄 Data Structure

Events are stored with the following structure:
```json
{
  "id": "timestamp_string",
  "timestamp": "ISO_8601_date",
  "type": "feed|diaper|spit-up",
  "breast": "left|right",
  "duration": 25,
  "poop": true,
  "pee": false
}
```

## 🔄 Sync Between Devices

When Firebase is configured:
- Events sync in real-time between all connected devices
- Offline changes are synced when connection is restored
- Each device can work independently if needed

## 🎯 Development

### Project Structure
```
baby-tracker/
├── index.html          # Main application
├── README.md          # This file
├── .gitignore         # Git ignore rules
└── docs/
    └── setup.md       # Detailed setup guide
```

### Key Functions
- `logEvent()` - Core logging function
- `updateTimeline()` - Refreshes the event display
- `initFirebase()` - Sets up Firebase connection
- `saveEvent()` - Handles local and remote storage

## 🤝 Contributing

This is a simple, single-file application. To contribute:
1. Fork the repository
2. Make your changes to `index.html`
3. Test on multiple devices
4. Submit a pull request

## 🐛 Troubleshooting

### Firebase Not Connecting
- Check your configuration is valid JSON
- Verify your Firebase project allows web access
- Ensure Realtime Database is enabled

### App Not Loading
- Check browser console for errors
- Verify internet connection for CDN resources
- Try clearing browser cache

### Data Not Syncing
- Confirm Firebase configuration is correct
- Check that other devices are using the same Firebase project
- Verify database rules allow read/write access

## 📋 Roadmap

Future enhancements being considered:
- [ ] Export data to CSV
- [ ] Weekly/monthly statistics
- [ ] Sleep tracking
- [ ] Growth tracking (weight/height)
- [ ] Multiple children support
- [ ] Medication reminders
- [ ] Dark mode
- [ ] PWA features (service worker)

## 📞 Support

For questions or issues:
1. Check the [troubleshooting section](#-troubleshooting)
2. Review [docs/setup.md](docs/setup.md) for setup help
3. Create an issue in this repository

## 📜 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for tired parents everywhere**