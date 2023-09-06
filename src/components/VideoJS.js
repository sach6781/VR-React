import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-vr";
import "videojs-contrib-ads";
import "videojs-ima";
import "video.js/dist/video-js.css";
import "videojs-ima/src/css/videojs.ima.css";

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, imaOptions, camera } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
      player.src(camera.src);
      player.vr({ projection: "360" });
      if (imaOptions) player.ima(imaOptions);
    } else {
      const player = playerRef.current;
      player.src(camera.src);
      player.vr({ projection: "360" });
    }
  }, [options, videoRef, camera]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js" crossOrigin="anonymous" />
      </div>
    </>
  );
};

export default VideoJS;
