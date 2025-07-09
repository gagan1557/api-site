import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Headline from './components/Headline';
import Headline2 from './components/Headline2';
import ChannelStats from './components/ChannelStats';
import ChannelStat2 from './components/ChannelStat2';

const M7_CHANNEL_ID = process.env.REACT_APP_M7_CHANNEL_ID;
const M7CS_CHANNEL_ID = process.env.REACT_APP_M7CS_CHANNEL_ID;
const API_KEY = process.env.REACT_APP_YT_API_KEY;

function useYouTubeStats(channelId, apiKey) {
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [viewCount, setViewCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!channelId || !apiKey) return;
    async function fetchChannelStats() {
      try {
        // Fetch channel stats
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
        );
        const data = await response.json();
        console.log('YouTube API response for channel', channelId, data); // Log raw API response
        if (data.items && data.items.length > 0) {
          setSubscriberCount(data.items[0].statistics.subscriberCount);
          setViewCount(data.items[0].statistics.viewCount);
        } else {
          setError('Channel not found or API error.');
        }
      } catch (err) {
        setError('Failed to fetch channel statistics.');
      }
    }
    fetchChannelStats();
    const interval = setInterval(fetchChannelStats, 300000);
    return () => clearInterval(interval);
  }, [channelId, apiKey]);

  return { subscriberCount, viewCount, error };
}

function useQ3Views() {
  const [q3Views, setQ3Views] = useState({ m7Views: null, m7csViews: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQ3Views() {
      try {
        const response = await fetch('/q3views.json');
        if (!response.ok) throw new Error('Failed to load quarterly views');
        const data = await response.json();
        setQ3Views({ m7Views: data.m7Views, m7csViews: data.m7csViews });
      } catch (err) {
        setError('Failed to load quarterly views');
      }
    }
    fetchQ3Views();
  }, []);

  return { q3Views, error };
}

function App() {
  const m7 = useYouTubeStats(M7_CHANNEL_ID, API_KEY);
  const m7cs = useYouTubeStats(M7CS_CHANNEL_ID, API_KEY);
  const { q3Views, error: q3Error } = useQ3Views();

  return (
    <div className="main-bg">
      <Navbar />
      <main className="center-content">
        <Headline />
        <div className="two-col-stats">
          <ChannelStats
            title="M7"
            // subscriberCount={m7.subscriberCount}
            viewCount={m7.viewCount}
            error={m7.error}
          />
          <ChannelStats
            title="M7CS"
            // subscriberCount={m7cs.subscriberCount}
            viewCount={m7cs.viewCount}
            error={m7cs.error}
          />
        </div>
        <Headline2 />
       
        <div className="two-col-stats">
          <ChannelStat2
            title="M7 Q3"
            q3Views={q3Views.m7Views}
            error={q3Error}
          />
          <ChannelStat2
            title="M7CS Q3"
            q3Views={q3Views.m7csViews}
            error={q3Error}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
