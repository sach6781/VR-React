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

const Highlights = (props) => {
  const [chosen, setChosen] = useState({
    id: "1",
    name: "Olimpia Milano v Barcelona",
    date: "22 November 2022",
    description: "All the action from this nailbiter!",
    poster: "poster1.jpg",
    src:
      "https://d8d913s460fub.cloudfront.net/krpanocloud/video/airpano/video-1920x960a-fs.mp4"
  });

  const handleClick = (i) => {
    //using i to access correct object in array and set state
    setChosen(games[i]);
    console.log(chosen);
  };
  const playerRef = useRef(null);
  const options = {
    autoplay: false,
    controls: true,
    responseive: true,
    fluid: true,
    preload: "auto",
    poster:
      "https://www.fiba.basketball/images.fiba.com/Graphic/3/7/dQMGB5Cfdk6ovOjCGm8dtQ.jpg?v=2014120514385062"
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {});

    player.on("dispose", () => {});
  };

  var imaOptions = {
    forceNonLinearFullSlot: true,
    adTagUrl:
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="
  };

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
              <Card sx={{ maxWidth: 345 }} onClick={(e) => handleClick(i)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.poster}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );
};
export default Highlights;
