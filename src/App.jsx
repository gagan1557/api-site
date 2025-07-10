import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Headline from './components/Headline';
import Headline2 from './components/Headline2';
// import ChannelStats from './components/ChannelStats';
import ChannelStat2 from './components/ChannelStat2';
import { useVideoStats } from './hooks/useVideoStats';
import VideoCapsule from './components/VideoCapsule';
import HeadlineY from './components/HeadlineY';
import ChannelStatY from './components/ChannelStatY';

// const M7_CHANNEL_ID = process.env.REACT_APP_M7_CHANNEL_ID;
// const M7CS_CHANNEL_ID = process.env.REACT_APP_M7CS_CHANNEL_ID;
const API_KEY = process.env.REACT_APP_YT_API_KEY;

// function useYouTubeStats(channelId, apiKey) {
//   const [subscriberCount, setSubscriberCount] = useState(null);
//   const [viewCount, setViewCount] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!channelId || !apiKey) return;
//     async function fetchChannelStats() {
//       try {
//         // Fetch channel stats
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
//         );
//         const data = await response.json();
//         console.log('YouTube API response for channel', channelId, data); // Log raw API response
//         if (data.items && data.items.length > 0) {
//           setSubscriberCount(data.items[0].statistics.subscriberCount);
//           setViewCount(data.items[0].statistics.viewCount);
//         } else {
//           setError('Channel not found or API error.');
//         }
//       } catch (err) {
//         setError('Failed to fetch channel statistics.');
//       }
//     }
//     fetchChannelStats();
//     const interval = setInterval(fetchChannelStats, 300000);
//     return () => clearInterval(interval);
//   }, [channelId, apiKey]);

//   return { subscriberCount, viewCount, error };
// }



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


function useYViews() {
  const [yViews, setyViews] = useState({ m7Views: null, m7csViews: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchyViews() {
      try {
        const response = await fetch('/Y_views.json');
        if (!response.ok) throw new Error('Failed to load Yearly views');
        const data = await response.json();
        setyViews({ m7Views: data.m7Views, m7csViews: data.m7csViews });
      } catch (err) {
        setError('Failed to load Yearly views');
      }
    }
    fetchyViews();
  }, []);

  return { yViews, error };
}
















// Read video IDs from environment variable, split by comma, and trim whitespace
const VIDEO_IDS = (process.env.REACT_APP_VIDEO_IDS || '').split(',').map(id => id.trim()).filter(Boolean);

function App() {
  // const m7 = useYouTubeStats(M7_CHANNEL_ID, API_KEY);
  // const m7cs = useYouTubeStats(M7CS_CHANNEL_ID, API_KEY);


  const { q3Views, error: q3Error } = useQ3Views();
  const { yViews, error: yError } = useYViews();
  const { videoStats, error: videoError } = useVideoStats(VIDEO_IDS, API_KEY);

  return (
    <div className="main-bg">
      <Navbar />
      {/* <main className="center-content">
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
        
      </main> */}

<main className="center-content">
        <Headline/>
        {/* <div className="two-col-stats">
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
        </div> */}





<div className='four-col-stats'>

        <HeadlineY/>

        
        
        <Headline2 />


        </div>

        <div className='fou-col-stats'>
          <div className="two-col-stats">
          
          <ChannelStatY
            title="M7 2025"
            yviews={yViews.m7Views}
            error={yError}
          />
          <ChannelStatY
            title="M7CS 2025"
            yviews={yViews.m7csViews}
            error={yError}
          />
        </div>

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


          </div>







        
      </main>









      <div>
      {/* Video Capsules Row */}
        <h2>M7 Channel last 3 videos</h2>
      <div className="capsule">
          {videoStats.map(video => (
            <VideoCapsule
              key={video.id}
              title={video.snippet.title}
              views={video.statistics.viewCount}
            />
          ))}
          {videoError && <div className="error">{videoError}</div>}
        </div>
        </div>
    </div>
  );
}

export default App;
