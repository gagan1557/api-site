import React from 'react';
import './VideoCapsule.css';

export default function VideoCapsule({ title, views }) {
  return (
    <div className="video-capsule">
      <h4>{title}</h4>
      <div className="stat">Views: <span>{views}</span></div>
      {/* <p>{views} views</p> */}
    </div>
  );
} 