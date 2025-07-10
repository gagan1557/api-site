import React from 'react';
import '../App.css';

function HeadlineY({ YViews }) {
  return (
    <div className="headline-containery">
      <h1 className="headline-sub">
        2025  <span className="gradient-text">VIEWS</span> {YViews}<br />
        {/* <span className="gradient-text">100% ROI.</span> */}
        
      </h1>
      {/* <p className="subtitle">
        NB Media is the undisputed leader in YouTube content creation with a vibrant, Gen Z-friendly culture.
      </p> */}
    </div>
  );
}

export default HeadlineY; 