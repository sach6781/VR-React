import { useState } from "react";
export const CameraVector = ({ x, y, selected, setCamera, setShowPreview }) => {
  const [hovered, setHovered] = useState(false);
  const selectedRadius = 12.5;
  const unselectedRadius = 12.5;
  const selectedColor = "#fcba03";
  const unselectedColor = "grey";
  return (
    <ellipse
      onClick={setCamera}
      fill={hovered || selected ? selectedColor : unselectedColor}
      stroke={"#000"}
      stroke-width="8"
      cx={x}
      cy={y}
      rx={hovered || selected ? selectedRadius : unselectedRadius}
      onMouseEnter={() => {
        setHovered(true);
        setShowPreview(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setShowPreview(false);
      }}
    />
  );
};
export default CameraVector;
