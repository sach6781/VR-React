import React, { useEffect, useRef } from 'react';
import 'aframe';

const VRPlayer = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    
    const scene = document.querySelector('a-scene');
    const videoId = window.location.pathname.split('/').pop();

    const videoURL = process.env.PUBLIC_URL + '/' + videoId +'.mp4';

    const video = document.createElement('video');
    video.setAttribute('src', videoURL);
    video.setAttribute('crossorigin', 'anonymous');
    video.setAttribute('autoplay', true);
    video.setAttribute('loop', true);
    video.setAttribute('webkit-playsinline', true);
    video.setAttribute('playsinline', true);
    video.setAttribute('muted', true);
    video.setAttribute('id', 'video');
    video.play();

    video.onloadeddata = () => {
      const videosphere = document.createElement('a-videosphere');
      videosphere.setAttribute('src', '#video');
      videosphere.setAttribute('rotation', '0 180 0');
      scene.appendChild(videosphere);
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
    // vrButton.innerText = 'Click to Enter VR Mode';
    vrButton.onclick = enterVR;
    scene.appendChild(vrButton);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div>
      {/* <a-scene cursor="rayOrigin: mouse" style={{ width: '10vw', height: '10vh' }}>
        <a-entity camera look-controls></a-entity>
      </a-scene> */}
      {/* <button onClick={handlePlay}>Start Video</button>
      <button onClick={handlePause}>Stop Video</button> */}

      <a-scene cursor="rayOrigin: mouse" style={{width: '10%', height: '10%', position: 'absolute', top: '0px', left: '0px'}}>
      <a-vr-mode-ui style={{ position: 'absolute', top: '100px', left: '100px' }}></a-vr-mode-ui>

        <a-entity camera look-controls></a-entity>
      </a-scene>
    </div>
  );
};

export default VRPlayer;

