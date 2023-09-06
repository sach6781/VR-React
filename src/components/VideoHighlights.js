import React, { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import videojs from "video.js";
import "videojs-vr";
import "videojs-contrib-ads";
import "videojs-ima";
import "video.js/dist/video-js.css";
import "videojs-ima/src/css/videojs.ima.css";
import VRButton from './VRButton.jsx'
import Video from './video.jsx';

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
      <div>
        <VRButton />
      </div>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          crossOrigin="anonymous"
          keys={keys}
        />

        <Video ref="video"
          keys={keys} >
        </Video>




      </div>
    </>
  );
};

export default VideoHighlights;
