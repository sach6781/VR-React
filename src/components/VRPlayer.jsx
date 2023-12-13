import React, { useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
import 'aframe';

const VRPlayer = () => {
  const { id } = useParams();
  const videoData = {
    1: {
      title: 'Video 1',
      filePath: 'london_bridge.mp4',
    },
    2: {
      title: 'Video 2',
      filePath: '360-sea-mountain.mp4',
    },
    3: {
      title: 'Video 3',
      filePath: 'eagle-360.mp4',
    },
    // Add more videos as needed
  };

  const videoRef = useRef(null);

  const videoInfo = videoData[id];

  const enterFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const scene = document.querySelector('a-scene');
    // const videoURL = process.env.PUBLIC_URL + '/' + '360-sea-mountain.mp4';
    const videoURL = process.env.PUBLIC_URL + '/' + videoInfo.filePath;
    console.log('file path - ', videoURL)
    const video = document.createElement('video');
    video.setAttribute('src', videoURL);
    video.setAttribute('crossorigin', 'anonymous');
    video.setAttribute('autoplay', true);
    video.setAttribute('loop', true);
    video.setAttribute('webkit-playsinline', true);
    video.setAttribute('playsinline', true);
    video.setAttribute('muted', true);
    video.setAttribute('id', 'video');

    video.onloadeddata = () => {
      const videosphere = document.createElement('a-videosphere');
      videosphere.setAttribute('src', '#video');
      videosphere.setAttribute('rotation', '0 180 0');
      scene.appendChild(videosphere);

      // Start playing the video after it's loaded
      // video.play();
    };

    scene.appendChild(video);
    videoRef.current = video;

    const enterVR = async () => {
      const xrSessionSupported = await navigator.xr.isSessionSupported('immersive-vr');
      if (xrSessionSupported) {
        try {
          const session = await navigator.xr.requestSession('immersive-vr', {
            requiredFeatures: ['viewer', 'local-floor'],
          });

          const baseLayer = new XRWebGLLayer(session, scene.renderer);
          session.updateRenderState({ baseLayer });
          session.requestReferenceSpace('local-floor').then((referenceSpace) => {
            session.requestAnimationFrame((time, frame) => {
              // Update VR scene
            });
          });
        } catch (e) {
          console.error('Error entering VR mode:', e);
        }
      }
    };

    const vrButton = document.createElement('button');
    vrButton.innerText = 'Click to Enter VR Mode';
    vrButton.onclick = () => {
      enterFullscreen();
      enterVR();
    };
    scene.appendChild(vrButton);

    return () => {
      // Clean up code if needed
    };
  }, [id, videoInfo]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <a-scene cursor="rayOrigin: mouse">
        <a-entity camera look-controls></a-entity>
      </a-scene>
    </div>
  );
};


export default VRPlayer;
