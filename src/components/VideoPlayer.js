import React, { useEffect, useRef } from 'react';
import 'aframe';

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef();

  useEffect(() => {
    // Load video based on videoId
    const videoURL = process.env.PUBLIC_URL + `/videos/video${videoId}.mp4`;
    // ... rest of your video loading code

    // Ensure to handle play/pause based on user interaction

    return () => {
      // Cleanup logic if needed
    };
  }, [videoId]);

  return (
    <div className="vr-player-container">
      <a-scene cursor="rayOrigin: mouse">
        {/* Include your A-Frame components here */}
        <a-entity camera look-controls></a-entity>
      </a-scene>
    </div>
  );
};

export default VideoPlayer;
