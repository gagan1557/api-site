import React from 'react';
import '../App.css';

function Headline() {
  return (
    <div className="headline-container">
      <h1 className="headline">
        We don't just <span className="gradient-text">create content.</span><br />
        We create the <span className="gradient-text">future of YouTube.</span>
      </h1>
      {/* <p className="subtitle">
        NB Media is the undisputed leader in YouTube content creation with a vibrant, Gen Z-friendly culture.
      </p> */}
    </div>
  );
}

export default Headline; 