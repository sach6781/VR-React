import React from 'react';
import { useEffect, useRef, useState } from "react";
import 'aframe';
import 'aframe-video-controls';
import ChosenHighlight from "./ChosenHighlight";



const VRThreeJS = () => {
  const [team, setTeam] = useState();
  const videoURL = process.env.PUBLIC_URL + '/' +'360-sea-mountain.mp4';
  
  useEffect(() => {
    
    console.log(team);
  }, [team]);


  return (
    <>
    <a-scene>
      <a-assets>
        <video id="video_1" src={videoURL} controls crossOrigin="anonymous"></video>
      </a-assets>
      <a-videosphere src="#video_1" rotation="0 180 0"></a-videosphere>
    </a-scene>
    </>
  );
};

export default VRThreeJS;
