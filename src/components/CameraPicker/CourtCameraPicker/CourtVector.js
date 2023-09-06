import HalfCourtVector from "./HalfCourtVector";
import { useEffect } from "react";
export const CourtVector = ({
  viewBoxHeight,
  viewBoxWidth,
  setCameraPositions,
}) => {
  const scalar = 15;

  const scale = (value) => {
    return scalar * value;
  };

  let dimensions = {
    width: scale(28.65),
    height: scale(15.24),
    domeToCenter: scale(6.71),
    centerLgRadius: scale(1.8),
    centerSmallRadius: scale(0.6),
    domeToLine: scale(4.26),
    centerX: viewBoxWidth / 2,
    centerY: viewBoxHeight / 2,
  };

  const calculatedValues = {
    leftLine: (viewBoxWidth - dimensions.width) / 2,
    topLine: (viewBoxHeight - dimensions.height) / 2,
    bottomLine: (viewBoxHeight - dimensions.height) / 2 + dimensions.height,
    rightLine: (viewBoxWidth - dimensions.width) / 2 + dimensions.width,
  };

  dimensions = { ...dimensions, ...calculatedValues };

  const cameraPositions = [
    { id: 1, x: dimensions.leftLine, y: dimensions.centerY },
    { id: 2, x: dimensions.rightLine * 0.25, y: dimensions.topLine },
    { id: 3, x: dimensions.rightLine * 0.75, y: dimensions.topLine },
    { id: 4, x: dimensions.rightLine, y: dimensions.centerY },
    { id: 5, x: dimensions.rightLine * 0.75, y: dimensions.bottomLine },
    { id: 6, x: dimensions.rightLine * 0.25, y: dimensions.bottomLine },
  ];

  useEffect(() => {
    setCameraPositions(cameraPositions);
  }, []);

  return (
    <>
      <HalfCourtVector dimensions={dimensions} />
      <HalfCourtVector dimensions={dimensions} rotate={180} />
    </>
  );
};
export default CourtVector;
