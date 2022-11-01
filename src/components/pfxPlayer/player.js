import videojs from "video.js";
import "videojs-contrib-ads";
import "videojs-ima";

const Player = ({ pli }) => {
  const setTag = () => {
    var player = videojs("content_video");
    var imaOptions = {
      id: "content_video",
      adTagUrl: pli,
    };

    player.ima(imaOptions);
  };

  const VideoPlayer = () => {
    return (
      <video
        id="content_video"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        width="640"
        height="360"
      >
        <source
          src="https://www.performics.com.tw/static/media/Performics_3M.mp4"
          type="video/mp4"
        ></source>
      </video>
    );
  };

  return (
    <div>
      <h3>Click to play the pre-roll interactive ad demo.</h3>
      <VideoPlayer />
    </div>
  );
};

export default Player;
