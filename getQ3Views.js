const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/'; // or your actual redirect URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const M7_CHANNEL_ID = process.env.REACT_APP_M7_CHANNEL_ID;
const M7CS_CHANNEL_ID = process.env.REACT_APP_M7CS_CHANNEL_ID;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });

async function getViews(channelId, startDate, endDate) {
  const res = await youtubeAnalytics.reports.query({
    ids: `channel==${channelId}`,
    startDate,
    endDate,
    metrics: 'views',
  });
  return res.data.rows ? res.data.rows[0][0] : 0;
}

function askForDates(callback) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter start date (YYYY-MM-DD): ', (startDate) => {
    rl.question('Enter end date (YYYY-MM-DD): ', (endDate) => {
      rl.close();
      callback(startDate.trim(), endDate.trim());
    });
  });
}

const [,, startDateArg, endDateArg] = process.argv;
const envStartDate = process.env.START_DATE;
const envEndDate = process.env.END_DATE;

function runWithDates(startDate, endDate) {
  (async () => {
    try {
      const m7Views = await getViews(M7_CHANNEL_ID, startDate, endDate);
      const m7csViews = await getViews(M7CS_CHANNEL_ID, startDate, endDate);
      console.log(`M7 Views (${startDate} to ${endDate}):`, m7Views);
      console.log(`M7CS Views (${startDate} to ${endDate}):`, m7csViews);
      const data = { m7Views, m7csViews, startDate, endDate };
      fs.writeFileSync('q3views.json', JSON.stringify(data));
      // Copy to public directory for React frontend
      const publicDir = path.join(__dirname, '../public');
      if (fs.existsSync(publicDir)) {
        fs.copyFileSync('q3views.json', path.join(publicDir, 'q3views.json'));
        console.log('Q3 views written to public/q3views.json');
      }
    } catch (err) {
      console.error('Error fetching views:', err);
    }
  })();
}

if (startDateArg && endDateArg) {
  runWithDates(startDateArg, endDateArg);
} else if (envStartDate && envEndDate) {
  runWithDates(envStartDate, envEndDate);
} else {
  askForDates(runWithDates);
}