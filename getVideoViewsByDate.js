const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

// Read from env or command line
const VIDEO_ID = process.env.VIDEO_ID || process.argv[2];
const START_DATE = process.env.START_DATE || process.argv[3];
const END_DATE = process.env.END_DATE || process.argv[4];
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'urn:ietf:wg:oauth:2.0:oob';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

if (!VIDEO_ID || !START_DATE || !END_DATE) {
  console.error('Usage: node getVideoViewsByDate.js <VIDEO_ID> <START_DATE> <END_DATE>');
  console.error('Or set VIDEO_ID, START_DATE, END_DATE in your .env file.');
  process.exit(1);
}

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('Missing OAuth2 credentials. Set CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN in your .env file.');
  process.exit(1);
}

async function main() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });

  try {
    const response = await youtubeAnalytics.reports.query({
      ids: 'channel==MINE',
      startDate: START_DATE,
      endDate: END_DATE,
      metrics: 'views',
      filters: `video==${VIDEO_ID}`,
      dimensions: 'day',
    });
    const rows = response.data.rows || [];
    let totalViews = 0;
    rows.forEach(row => {
      totalViews += row[1];
    });
    console.log(`Total views for video ${VIDEO_ID} from ${START_DATE} to ${END_DATE}: ${totalViews}`);
    console.log('Daily breakdown:', rows);
  } catch (err) {
    console.error('Error fetching video views:', err.errors || err.message || err);
  }
}

main(); 