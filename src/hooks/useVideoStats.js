import { useEffect, useState } from 'react';

export function useVideoStats(videoIds, apiKey) {
  const [videoStats, setVideoStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoIds.length || !apiKey) return;
    async function fetchStats() {
      try {
        const ids = videoIds.join(',');
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids}&key=${apiKey}`
        );
        const data = await response.json();
        setVideoStats(data.items || []);
      } catch (err) {
        setError('Failed to fetch video stats');
      }
    }
    fetchStats();
  }, [videoIds, apiKey]);

  return { videoStats, error };
} 