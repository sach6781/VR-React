const Box = ({ children, style }) => {
  const defaultStyle = {
    padding: 15,
    border: "2px solid black",
    margin: 15,
  };
  return <div style={{ ...defaultStyle, ...style }}>{children}</div>;
};
export default Box;
