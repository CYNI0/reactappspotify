// server/index.js
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

// Define routes here (e.g., login, callback, refresh-token)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Route to redirect the user to Spotify's authorization page
app.get('/login', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL);
  });
  
  // Callback route to handle Spotify's response
  app.get('/callback', async (req, res) => {
    const code = req.query.code;
  
    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token } = data.body;
  
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
  
      // Send tokens back to the client
      res.json({ access_token, refresh_token });
    } catch (error) {
      console.error('Error in callback:', error);
      res.send('Error during authentication');
    }
  });
  
