export const HalfCourtVector = ({ rotate, dimensions }) => {
  // Scaled up versions
  const {
    width: scaledCourtWidth,
    height: scaledCourtHeight,
    domeToCenter: scaledDomeToCenterDistance,
    centerLgRadius: scaledCenterLgRadius,
    centerSmallRadius: scaledCenterSmallRadius,
    domeToLine: scaledDomeLineLength,
    centerX: centerX,
    centerY: centerY,
    topLine: yBoundary,
    leftLine: xBoundary,
  } = dimensions;

  //Styling values
  const defaultFillColor = "transparent";
  const defaultStrokeWidth = 1.75;
  const defaultStrokeColor = "black";

  //Used to rotate the half court (two half courts equals one full court)
  const transform = rotate ? `rotate(${rotate}, ${centerX}, ${centerY})` : "";
  return (
    <g transform={transform}>
      <rect
        width={scaledCourtWidth / 2}
        height={scaledCourtHeight}
        x={xBoundary}
        y={yBoundary}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
        fill={defaultFillColor}
      />

      {/* The court dome curve */}
      <path
        d={`M ${xBoundary + scaledDomeLineLength} ${
          centerY - scaledDomeToCenterDistance
        } 
            C ${centerY + 40} ${centerY - scaledDomeToCenterDistance + 20}, 
            ${centerY + 40} ${centerY + scaledDomeToCenterDistance - 20},
             ${xBoundary + scaledDomeLineLength} ${
          centerY + scaledDomeToCenterDistance
        }`}
        fill={defaultFillColor}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
      />

      {/* The circle */}
      <ellipse
        fill={defaultFillColor}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
        cx={xBoundary + scaledCourtWidth / 5}
        cy={centerY}
        rx={scaledCenterLgRadius}
        ry={scaledCenterLgRadius}
      />

      {/* Outer box */}
      <rect
        y={centerY - scaledCourtHeight / 6}
        x={xBoundary}
        width={scaledCourtWidth / 5}
        height={scaledCourtHeight / 3}
        fill={defaultFillColor}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
      />

      {/* Inner box */}
      <rect
        y={centerY - scaledCenterLgRadius}
        x={xBoundary}
        width={scaledCourtWidth / 5}
        height={scaledCenterLgRadius * 2}
        fill={defaultFillColor}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
      />

      {/* First dome line */}
      <line
        y1={centerY + scaledDomeToCenterDistance}
        x1={xBoundary}
        y2={centerY + scaledDomeToCenterDistance}
        x2={xBoundary + scaledDomeLineLength}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
      />

      {/* Second dome line */}
      <line
        y1={centerY - scaledDomeToCenterDistance}
        x1={xBoundary}
        y2={centerY - scaledDomeToCenterDistance}
        x2={xBoundary + scaledDomeLineLength}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
      />

      {/* Outer center circle */}
      <ellipse
        fill={defaultFillColor}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
        cx={centerX}
        cy={centerY}
        rx={scaledCenterLgRadius}
        ry={scaledCenterLgRadius}
      />

      {/* Inner center circle */}
      <ellipse
        fill={defaultFillColor}
        stroke={defaultStrokeColor}
        stroke-width={defaultStrokeWidth}
        cx={centerX}
        cy={centerY}
        rx={scaledCenterSmallRadius}
        ry={scaledCenterSmallRadius}
      />
    </g>
  );
};
export default HalfCourtVector;
