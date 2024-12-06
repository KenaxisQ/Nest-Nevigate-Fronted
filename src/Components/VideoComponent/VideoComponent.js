import video from '../../videos/opening.mp4';

import React, { useEffect, useRef } from "react";

const VideoComponent = () => {
  const videoRef = useRef();

  return (
    <div style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}>
      <video
        ref={videoRef}
        controls
        autoPlay
        // muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          zIndex: -1,
        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;