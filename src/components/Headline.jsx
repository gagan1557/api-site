import React, { useEffect, useState } from 'react';
import '../App.css';
// import ChannelStats from './ChannelStats';
import FormatCount from '../utils/FormatCount';

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
        console.log('YouTube API response for channel', channelId, data); 
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



function Headline() {
  const m7 = useYouTubeStats(M7_CHANNEL_ID, API_KEY);
  const m7cs = useYouTubeStats(M7CS_CHANNEL_ID, API_KEY);
  const totalViews = (Number(m7.viewCount) || 0) + (Number(m7cs.viewCount) || 0);
  
  return (
    
    <div className="headline-container">
      <h1 className="headline">
        OUR THIS YEAR GOAL <span className="gradient-text"><FormatCount value={totalViews}/> / 220M.</span><br />
      </h1>
      {/* {<div className="two-col-stats">
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
        </div>} */}
    </div>
  );
}

export default Headline; 