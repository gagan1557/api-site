import React from 'react';
import '../App.css';

function ChannelStatY({title, yviews, error}){

    return (
        <div className="channel-col">
          <h2>{title}</h2>
          {yviews !== null && yviews !== undefined ? (
            <div className="stat">2025 Views: <span>{yviews}</span></div>
          ) : error ? (
            <div className="stat error">{error}</div>
          ) : (
            <div className="stat">Loading Year views...</div>
          )}
        </div>
      );
}
export default ChannelStatY;