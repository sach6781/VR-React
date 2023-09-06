import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia
} from "@mui/material";
import { games } from "./games.js";
import { useState } from "react";
import { useRef } from "react";
import VideoHighlights from "./VideoHighlights.js";
import { ImageList, ImageListItem } from "@mui/material";
import CarouselScroll from "./CarouselScroll.js";
import Divider from "./Divider.js";

const ChosenHighlight = (props) => {
  const videoURL = process.env.PUBLIC_URL + 'eagle-360.mp4';
  const [chosen, setChosen] = useState({
    id: "1",
    description: "All the action from this nailbiter!",
    src:
    videoURL
  });

  const handleClick = (i) => {
    setChosen(games[i]);
    console.log(chosen);
  };
  console.log(props.team);
  const playerRef = useRef(null);
  const options = {
    autoplay: false,
    controls: true,
    responseive: true,
    fluid: true,
    preload: "auto"
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {});

    player.on("dispose", () => {});
  };

  var imaOptions = {
    forceNonLinearFullSlot: false};

  return (
    <>
      <div>
        <VideoHighlights
          options={options}
          imaOptions={imaOptions}
          onReady={handlePlayerReady}
          {...chosen}
        />
      </div>
      <div>
        <ImageList cols={4}>
          {games.map((item, i) => (
            <ImageListItem key={games.id} cols={1}>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {/* <Divider>
        <CarouselScroll />
      </Divider> */}
    </>
  );
};
export default ChosenHighlight;
