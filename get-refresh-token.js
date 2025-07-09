const { google } = require('googleapis');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/'; // or your actual redirect URI

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/yt-analytics.readonly',
  'https://www.googleapis.com/auth/youtube.readonly'
];

async function main() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent', // always show consent to get refresh token
  });

  console.log('Authorize this app by visiting this url:\n', authUrl);
  console.log('\nAfter approving, paste the code here:');

  // Read code from stdin
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', async (code) => {
    code = code.trim();
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('\nYour refresh token is:\n', tokens.refresh_token);
      console.log('\nSave this in your .env as REFRESH_TOKEN=...');
      process.exit(0);
    } catch (err) {
      console.error('Error retrieving access token', err);
      process.exit(1);
    }
  });
}

main(); 