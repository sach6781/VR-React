import { useState } from "react";
import CourtVector from "./CourtVector";
import CameraVector from "./CameraVector";
import VideoPreview from "../VideoPreview";

export const CourtCameraPicker = ({ setCamera, currentCamera, cameras }) => {
  const [cameraPositions, setCameraPositions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const viewBoxWidth = 500;
  const viewBoxHeight = 265;

  const outerPerspective = {
    position: "relative",
    perspective: 1000,
    overflow: "",
    margin: "0 auto",
  };

  const svgPerspective = {
    transform: "rotateX(60deg)",
    transformStyle: "preserve-3d",
    transformOrigin: "50% 50%",
    translate: "0 -10%",
    backgroundColor: "#f0d2a3",
    display: "block",
    margin: "0 auto",
  };

  const onMouseMove = (e) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    setMousePos({ x: x, y: y });
  };

  return (
    <div onMouseMove={onMouseMove} style={outerPerspective}>
      {showPreview && (
        <VideoPreview x={mousePos.x} y={mousePos.y} camera={cameras[0]} />
      )}
      <svg
        width="95%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        style={svgPerspective}
      >
        <g>
          <CourtVector
            viewBoxHeight={viewBoxHeight}
            viewBoxWidth={viewBoxWidth}
            cameras={cameraPositions}
            setCameraPositions={setCameraPositions}
          />
          {cameraPositions.length > 0 &&
            cameras.map((camera, i) => (
              <CameraVector
                x={cameraPositions[i].x}
                y={cameraPositions[i].y}
                setCamera={() => setCamera(camera)}
                selected={currentCamera.id == camera.id}
                setShowPreview={setShowPreview}
              />
            ))}
        </g>
      </svg>
    </div>
  );
};

export default CourtCameraPicker;
