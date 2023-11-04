import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import videojs from "video.js";
import "videojs-vr";
import "videojs-contrib-ads";
import "videojs-ima";
import "video.js/dist/video-js.css";
import "videojs-ima/src/css/videojs.ima.css";


export const VideoHighlights = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, imaOptions } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));


      function handleOrientation(event) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;

        console.log('Alpha - ', alpha)
        console.log('beta - ', beta)
        console.log('gamma - ', gamma)

        videoElement.style.transform = `rotateX(${beta}deg) rotateY(${alpha}deg) rotateZ(${gamma}deg)`;
      
  
        // Map and adjust these values as needed for your specific video and VR player
        // Example: player.vr.setOrientation({ yaw: alpha, pitch: beta, roll: gamma });
      }
  
      // Attach device orientation event listener
      if (window.DeviceOrientationEvent) {
        console.log('Device orientation is supported!')
        window.addEventListener('deviceorientation', handleOrientation);
      } else {
        console.error('Device orientation not supported.');
      }

      player.poster(props.poster);
      player.src(props.src);
      player.vr({ projection: "360" });
      player.ima(imaOptions);
    } else {
      const player = playerRef.current;
      player.poster(props.poster);
      player.src(props.src);
      player.vr({ projection: "360" });
    }
  }, [options, videoRef, props.src, imaOptions, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
     window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [playerRef]);

  const keys = { // If you want to re-define the keys, here are the defaults
    left: 'A',
    right: 'D',
    up: 'W',
    down: 'S',
    rotateLeft: 'Q',
    rotateRight: 'E',
    fullScreen: 'F',
    zeroSensor: 'Z',
    playPause: ' '
  };

  return (
    <>
      <div>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {props.date}
        </Typography>
      </div>
      <div data-vjs-player>
        {/* <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          crossOrigin="anonymous"
        /> */}


<a-scene>
      <a-assets>
        {/* <video id="video_1" src={videoURL} autoPlay controls></video> */}
        <video
          id="video_1"
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          crossOrigin="anonymous"
        />
        
      </a-assets>
      <a-videosphere src="#video_1" rotation="0 180 0"></a-videosphere>
    </a-scene>

      </div>
    </>
  );
};

export default VideoHighlights;
