# Spotify Clone Setup Guide

This guide will help you set up the Spotify API integration and Genius API for lyrics.

## Prerequisites

- A Spotify account (Premium recommended for full playback features)
- A Spotify Developer account
- A Genius account (for lyrics)

## Step 1: Spotify API Setup

### 1.1 Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **"Create app"**
3. Fill in the details:
   - **App name**: Lovable Spotify Clone (or any name)
   - **App description**: A Spotify clone built with React
   - **Redirect URI**: Add your application URL + `/callback`
     - For local development: `http://localhost:8080/callback`
     - For production: `https://your-domain.com/callback`
   - **APIs used**: Select "Web API" and "Web Playback SDK"
4. Click **"Save"**

### 1.2 Get Your Client ID

1. In your app dashboard, you'll see your **Client ID**
2. Copy this Client ID

### 1.3 Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`)
2. Add your Spotify Client ID:
   ```
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   ```

### 1.4 Important: Add Redirect URIs

Make sure to add ALL redirect URIs where your app will run:
- Development: `http://localhost:8080/callback`
- Preview: `https://your-preview-url.lovableproject.com/callback`
- Production: `https://your-production-domain.com/callback`

## Step 2: Genius API Setup (Optional - for Lyrics)

### 2.1 Create a Genius API Client

1. Go to [Genius API Clients](https://genius.com/api-clients)
2. Click **"New API Client"**
3. Fill in the details:
   - **App Name**: Spotify Clone
   - **App Website URL**: Your app URL
4. Click **"Save"**

### 2.2 Generate Access Token

1. In your API client page, click **"Generate Access Token"**
2. Copy the access token

### 2.3 Add to Environment Variables

Add to your `.env` file:
```
VITE_GENIUS_API_KEY=your_genius_api_key_here
```

## Step 3: Testing the Setup

### 3.1 Start the Application

```bash
npm run dev
```

### 3.2 Test Spotify Authentication

1. Navigate to the **Profile** page
2. Click **"Connect Spotify Account"**
3. You'll be redirected to Spotify's login page
4. After authorizing, you'll be redirected back to your app
5. Your profile should now show your Spotify account details

### 3.3 Test Audio Playback

**Important**: For full audio playback with real Spotify tracks, you need:
- A Spotify Premium account
- The Spotify Web Playback SDK (already integrated)

1. Search for a track
2. Click play on any track
3. The track should start playing through the Spotify Web Playback SDK

### 3.4 Test Other Features

- **Queue System**: Click the queue icon in the player bar to view/manage queue
- **Lyrics**: Click the lyrics icon to view lyrics (if Genius API is configured)
- **Controls**: Test shuffle, repeat, skip, volume controls

## Features Implemented

✅ **Real Audio Playback** - Using Spotify Web Playback SDK
✅ **Spotify OAuth** - Implicit Grant Flow for frontend authentication
✅ **Queue System** - Add tracks, view queue, manage playback order
✅ **Lyrics Integration** - Fetch lyrics from Genius API
✅ **User Profile** - View your Spotify account details

## Troubleshooting

### "Invalid Client" Error
- Check that your Client ID is correct in `.env`
- Ensure redirect URI matches exactly in Spotify Dashboard

### No Audio Playback
- Verify you have Spotify Premium
- Check browser console for errors
- Ensure you've authorized the app in Spotify

### Lyrics Not Showing
- Verify Genius API key is set in `.env`
- Check browser console for API errors
- Some tracks may not have lyrics available

### Token Expired
- The access token expires after 1 hour
- Simply reconnect through the Profile page

## Security Notes

⚠️ **Frontend-Only Implementation**: This app uses Spotify's Implicit Grant Flow, which is suitable for frontend-only apps. The Client ID is public and meant to be exposed in the browser.

⚠️ **Genius API Key**: While included in frontend code, Genius API has rate limits. For production, consider moving this to a backend proxy.

## Next Steps

Consider adding:
- Backend proxy for API calls (more secure)
- Playlist creation/editing
- Social features (follow artists, share tracks)
- Audio visualization
- Podcast support

## Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)
- [Genius API Documentation](https://docs.genius.com/)
