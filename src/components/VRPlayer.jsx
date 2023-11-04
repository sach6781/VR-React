// // import React, { useState, useEffect, useRef } from 'react';
// // import 'aframe';
// // import 'aframe-react';

// // const MyVRScene1 = () => {
// //   const [isMuted, setIsMuted] = useState(true);
// //   const videoRef = useRef();
// //   const cameraRef = useRef();
// //   const videoURL = process.env.PUBLIC_URL + '/' +'360-sea-mountain.mp4';

// //   useEffect(() => {
// //     const playVideo = async () => {
// //       if (videoRef.current) {
// //         try {
// //           await videoRef.current.play();
// //         } catch (error) {
// //           console.error('Autoplay failed:', error);
// //           // Handle autoplay failure here
// //         }
// //       }
// //     };

// //     playVideo();
// //   }, []);

// //   const toggleMute = () => {
// //     if (videoRef.current) {
// //       videoRef.current.muted = !videoRef.current.muted;
// //       setIsMuted(videoRef.current.muted);
// //     }
// //   };

// //   return (
// //     <div style={{width: '50%', float: 'right'}}>
// //     <a-scene embedded style={{ width: '100%' }}>
// //       <a-assets>
// //         <video
// //           id="myVideo"
// //           src={videoURL}
// //           loop
// //           autoplay
// //           muted={isMuted}
// //           playsinline
// //           crossorigin="anonymous"
// //           ref={videoRef}

// //         ></video>
// //       </a-assets>

// //       {/* Use a-sky to display the video content as the environment background */}
// //       <a-sky src="#myVideo" rotation="0 180 0"></a-sky>

// //       {/* Camera for VR headset */}
// //       <a-camera ref={cameraRef} position="0 2 0">
// //         <a-cursor></a-cursor>
// //       </a-camera>

// //       {/* Mute/Unmute button */}
// //       {/* <button onClick={toggleMute}>
// //         {isMuted ? 'Unmute' : 'Mute'}
// //       </button> */}
// //     </a-scene>
// //     </div>
// //   );
// // };

// // export default MyVRScene1;


// import React, { useEffect, useState } from 'react';
// import 'aframe';

// const VRPlayer = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);

//   useEffect(() => {
//     const scene = document.querySelector('a-scene');
//     const videoURL = process.env.PUBLIC_URL + '/' + '360-sea-mountain.mp4';

//     const video = document.createElement('video');
//     video.setAttribute('src', videoURL); // Replace with your video path
//     video.setAttribute('crossorigin', 'anonymous');
//     video.setAttribute('autoplay', true);
//     video.setAttribute('loop', true);
//     video.setAttribute('webkit-playsinline', true);
//     video.setAttribute('playsinline', true);
//     video.setAttribute('muted', true);
//     video.setAttribute('id', 'video');

//     // When the video is loaded, set the flag to true
//     video.onloadeddata = () => {
//       setVideoLoaded(true);
//     };

//     scene.appendChild(video);
//   }, []);

//   useEffect(() => {
//     if (videoLoaded) {
//       const videosphere = document.createElement('a-videosphere');
//       videosphere.setAttribute('src', '#video');
//       videosphere.setAttribute('rotation', '0 180 0');

//       const scene = document.querySelector('a-scene');
//       scene.appendChild(videosphere);
//     }
//   }, [videoLoaded]);

//   return (
//     <div>
//       <a-scene>
//         <a-entity camera look-controls></a-entity>
//         <a-videosphere src="#video" rotation="0 180 0"></a-videosphere>
//         <a-entity
//           geometry="primitive: plane; width: 2; height: 2"
//           material="color: blue; opacity: 0.5"
//           position="0 1.6 -4"
//           text="value: Click to Enter VR Mode; align: center"
//           events={{
//             click: function () {
//               const vrDisplay = document.querySelector('a-scene').querySelector('a-entity[camera]').components['look-controls'].vrDisplay;
//               if (vrDisplay) {
//                 vrDisplay.enterVR();
//               } else {
//                 console.error('No VR display found.');
//               }
//             }
//           }}
//         ></a-entity>
//       </a-scene>

//     </div>
//   );
// };

// export default VRPlayer;

// const videoURL = process.env.PUBLIC_URL + '/' + '360-sea-mountain.mp4';

import React, { useEffect, useRef } from 'react';
import 'aframe';

const VRPlayer = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const scene = document.querySelector('a-scene');
    const videoURL = process.env.PUBLIC_URL + '/' + '360-sea-mountain.mp4';

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
    vrButton.innerText = 'Click to Enter VR Mode';
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
      <a-scene cursor="rayOrigin: mouse">
        <a-entity camera look-controls></a-entity>
      </a-scene>
      <button onClick={handlePlay}>Start Video</button>
      <button onClick={handlePause}>Stop Video</button>
    </div>
  );
};

export default VRPlayer;

