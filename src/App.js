import { useEffect, useRef, useState } from "react";
import VideoJS from "./components/VideoJS";
import Box from "./components/Box";
import CameraPicker from "./components/CameraPicker/CameraPicker";
import Highlights from "./components/Highlights";
import ChosenHighlight from "./components/ChosenHighlight";
import VideoCard from "./components/VideoCard";
import 'webxr-polyfill';


import { Typography } from "@mui/material";

import { data } from "./data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, InputGroup, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./styles.css";
import VRThreeJS from "./components/VRThreeJS";
import MyVRScene from "./components/MyVRScene";
import VRPlayer from "./components/VRPlayer.jsx";

export default function App() {
  const [team, setTeam] = useState();
  const [search, setSearch] = useState("");

  const [vidtype, setVidtype] = useState("");

  const videoURL = process.env.PUBLIC_URL + '/' + '360-sea-mountain.mp4';
  console.log('Printing video URL - ', videoURL)


  useEffect(() => {

    console.log(team);
  }, [team]);


  return (
    <div>
      {/* <Typography gutterBottom variant="h4" component="div">
        360<span>&#176;</span> View
      </Typography>
          <Box
            style={{
              maxWidth: 900,
              margin: "0 auto",
              overflow: "hidden"
            }}
          >
            <ChosenHighlight team={team} />

          

          </Box> */}

      {/* <VRThreeJS /> */}
      <div style={{ display: 'flex' }}>
        {/* <MyVRScene width="50%" height="50%" /> */}
        <VRPlayer width="50%" height="50%" />
      </div>

    </div>
  );
}
