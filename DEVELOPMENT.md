# Development Workflow

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Local Testing Setup

### Quick Start
1. **Install dependencies:**
   ```bash
   cd baby-tracker
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   
3. **Open test page:** http://localhost:8000/test-local.html

4. **Test Firebase:**
   - Paste your Firebase config into the textarea
   - Click "Test Firebase Init"
   - Run through all the test functions

### Available Scripts
- `npm run dev` - Start development server and open test page
- `npm run serve` - Start server only
- `npm run test` - Run Firebase test suite
- `npm run build` - Type check TypeScript
- `npm run lint` - Lint TypeScript files
- `npm run type-check` - Type check without building

### Files
- `test-local.html` - Isolated testing environment for Firebase debugging
- `src/dev-server.ts` - TypeScript development server with CORS headers
- `src/test-firebase.ts` - Comprehensive Firebase testing suite
- `src/types.ts` - TypeScript type definitions
- `index.html` - Main production app

### Testing Process

#### 1. Firebase Configuration Testing
- Test with real Firebase config
- Verify all config properties are present
- Check connection status
- Test read/write operations

#### 2. Feature Testing
- Test event creation/reading
- Test local storage fallback
- Test cross-browser compatibility

#### 3. Debug Process
1. Use `test-local.html` for isolated testing
2. Check browser console for errors
3. Use debug log in test interface
4. Fix issues locally
5. Only then update `index.html`
6. Test updated `index.html` locally
7. Finally push to GitHub Pages

### Common Firebase Issues to Check

1. **Missing Config Properties**
   - `apiKey` - Required for API access
   - `authDomain` - Required for auth
   - `projectId` - Required for project identification
   - `databaseURL` - May not be present in newer configs

2. **Database Rules**
   - Check Firebase console > Realtime Database > Rules
   - Ensure read/write permissions are set correctly

3. **Database Region**
   - Default region might not have Realtime Database enabled
   - Check Firebase console for correct database URL

4. **Network/CORS Issues**
   - Test locally with development server
   - Check browser network tab for failed requests

### Development Rules

1. ✅ **Always test locally first**
2. ✅ **Use debug logging extensively**  
3. ✅ **Test in target browsers (Safari, Chrome)**
4. ✅ **Verify Firebase operations work end-to-end**
5. ❌ **Never push untested code to main**
6. ❌ **Never debug directly on GitHub Pages**

### Browser Testing

#### Safari Testing
- Test locally in Safari
- Check for console errors
- Verify all buttons work
- Test Firebase initialization

#### Chrome Testing  
- Verify everything works in Chrome
- Use Chrome DevTools for debugging
- Test Firebase network requests

### Deployment Process

1. **Local Testing** ✅
   - Test in `test-local.html`
   - Verify Firebase works
   - Check all features

2. **Integration Testing** ✅
   - Test updated `index.html` locally
   - Verify everything still works
   - Cross-browser testing

3. **Deploy** ✅
   - Commit and push to GitHub
   - Verify GitHub Pages deployment
   - Final smoke test on live site

## Firebase Debugging Checklist

- [ ] Config has all required properties
- [ ] Database URL is correct or can be constructed
- [ ] Firebase app initializes without errors
- [ ] Database reference is created successfully  
- [ ] Connection test passes (`.info/connected`)
- [ ] Write test succeeds
- [ ] Read test succeeds
- [ ] Event listener receives data updates
- [ ] Error handling works properly

## Current Issues to Debug

1. **Firebase initialization always failing**
   - Need to identify root cause
   - Check config properties
   - Test different Firebase versions
   - Verify database setup

2. **Events not appearing in Firebase**
   - Test write operations
   - Check database rules
   - Verify event structure
   - Check for network errors