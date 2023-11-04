import React, { useState, useEffect, useRef } from 'react';
import 'aframe';
import 'aframe-react';

const MyVRScene = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef();
  const cameraRef = useRef();
  const videoURL = process.env.PUBLIC_URL + '/' +'360-sea-mountain.mp4';

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error('Autoplay failed:', error);
          // Handle autoplay failure here
        }
      }
    };

    playVideo();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div style={{width: '50%', float: 'left' }}>
    <a-scene embedded style={{ height: '100%', width: '100%' }}>
      {/* <a-assets>
        <video
          id="myVideo"
          src={videoURL}
          loop
          autoplay
          muted={isMuted}
          playsinline
          crossorigin="anonymous"
          ref={videoRef}
          
        ></video>
      </a-assets> */}

      {/* Use a-sky to display the video content as the environment background */}
      {/* <a-sky src="#myVideo" rotation="0 180 0"></a-sky> */}

      {/* Camera for VR headset */}
      {/* <a-camera ref={cameraRef} position="0 2 0">
        <a-cursor></a-cursor>
      </a-camera> */}

      {/* Mute/Unmute button */}
      {/* <button onClick={toggleMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button> */}
    </a-scene>
    </div>
  );
};

export default MyVRScene;
