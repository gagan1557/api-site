import React from 'react';
import '../App.css';

function Headline2({ q3Views }) {
  return (
    <div className="headline-container">
      <h1 className="headline-sub">
        July to September  <span className="gradient-text">VIEWS</span> {q3Views}<br />
        {/* <span className="gradient-text">100% ROI.</span> */}
        
      </h1>
      {/* <p className="subtitle">
        NB Media is the undisputed leader in YouTube content creation with a vibrant, Gen Z-friendly culture.
      </p> */}
    </div>
  );
}

export default Headline2; 