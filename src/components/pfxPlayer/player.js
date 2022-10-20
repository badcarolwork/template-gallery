import useScript from "../../hooks/useScript";
import useStylesheet from "../../hooks/useStylesheet";

const Player = ({ pli }) => {
  useStylesheet("https://www.performics.com.tw/static/js/video-js.css");
  useStylesheet(
    "https://www.performics.com.tw/static/js/videojs.vast.vpaid.min.css"
  );
  useScript("https://www.performics.com.tw/static/js/video.js");
  useScript(
    "https://www.performics.com.tw/static/js/videojs_5.vast.vpaid.min.js"
  );

  const setup = {
    plugins: {
      vastClient: {
        adTagUrl: pli,
        adsCancelTimeout: 5000,
        adsEnabled: true,
      },
    },
  };

  return (
    <div>
      <h3>Click to play the pre-roll interactive ad demo.</h3>
      <video
        id="example_video_1"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        width="640"
        height="360"
        poster="https://www.performics.com.tw/static/media//poster-pfx.png"
        data-setup={setup}
      >
        <source
          src="https://www.performics.com.tw/static/media/Performics_3M.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Player;
