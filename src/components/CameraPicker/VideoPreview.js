import VideoJS from "../VideoJS";

const VideoPreview = ({ x, y, camera }) => {
  const options = {
    autoplay: "play",
    controls: false,
    fluid: true,
    preload: "auto",
    livemodeui: true,
    muted: true,
    poster:
      "https://thumbs.dreamstime.com/z/live-stream-icon-streaming-video-news-symbol-white-background-social-media-template-broadcasting-online-logo-play-button-178366926.jpg",
    sources: [
      {
        src: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {});

    player.on("dispose", () => {});
  };
  const float = x
    ? {
        height: 100,
        width: 200,
        backgroundColor: "red",
        position: "absolute",
        top: y + 5,
        left: x + 5,
        zIndex: 1000,
        color: "white",
      }
    : { display: "inline-block", margin: 15, width: 200 };
  return (
    <div style={float}>
      <VideoJS options={options} camera={camera} onReady={handlePlayerReady} />
    </div>
  );
};
export default VideoPreview;
