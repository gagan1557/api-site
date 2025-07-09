import React from 'react';
import '../App.css';

function ChannelStat2({ title, q3Views, error }) {
  return (
    <div className="channel-col">
      <h2>{title}</h2>
      {q3Views !== null && q3Views !== undefined ? (
        <div className="stat">Q3 Views: <span>{q3Views}</span></div>
      ) : error ? (
        <div className="stat error">{error}</div>
      ) : (
        <div className="stat">Loading Q3 views...</div>
      )}
    </div>
  );
}

export default ChannelStat2; 