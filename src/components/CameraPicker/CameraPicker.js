import { useState, useEffect } from "react";
import Box from "../Box";
import CourtCameraPicker from "./CourtCameraPicker/CourtCameraPicker";
import { cameras } from "./Cameras";
import VideoJS from "../VideoJS";
import VideoPreview from "./VideoPreview";
const CameraPicker = ({ setCamera, camera }) => {
  const [currentView, setCurrentView] = useState(0);

  useEffect(() => {
    setCamera(cameras[0]);
  }, []);
  return (
    <>
      <Box>
        Camera
        {cameras.map((camera) => (
          <button onClick={() => setCamera(camera)}>{camera.id}</button>
        ))}
        <div style={{ float: "right" }}>
          <button onClick={() => setCurrentView(0)}>Court View </button>
          <button onClick={() => setCurrentView(1)}>Carousel View </button>
        </div>
      </Box>
      <Box>
        {currentView == 0 ? (
          <CourtCameraPicker
            setCamera={setCamera}
            cameras={cameras}
            currentCamera={camera}
          />
        ) : (
          <div>
            {cameras.map((camera) => (
              <div
                style={{ display: "inline-block" }}
                onClick={() => setCamera(camera)}
              >
                <VideoPreview camera={camera} />
                <p>Camera {camera.id}</p>
              </div>
            ))}
          </div>
        )}
      </Box>
    </>
  );
};
export default CameraPicker;
