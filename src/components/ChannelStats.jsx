import React from 'react';
import '../App.css';

function ChannelStats({ title, subscriberCount, viewCount, error }) {
  return (
    <div className="channel-col">
      <h2>{title}</h2>
      {subscriberCount !== null && viewCount !== null ? (
        <>
          {/* <div className="stat">Subscribers: <span>{subscriberCount}</span></div> */}
          <br />
          <div className="stat">Views: <span>{viewCount}</span></div>
        </>
      ) : error ? (
        <div className="stat error">{error}</div>
      ) : (
        <div className="stat">Loading stats...</div>
      )}
    </div>
  );
}

export default ChannelStats; 