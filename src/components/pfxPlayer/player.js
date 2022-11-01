import useScript from "../../hooks/useScript";
import useStylesheet from "../../hooks/useStylesheet";

const Player = ({ pli }) => {
  useStylesheet("https://www.performics.com.tw/static/js/video-js.css");
  useStylesheet(
    "https://www.performics.com.tw/static/js/videojs.vast.vpaid.min.css"
  );
  useScript("https://www.performics.com.tw/static/js/video.js");
  useScript("https://www.performics.com.tw/static/js/videojs_5.vast.vpaid.js");

  return (
    <div>
      <h3>Click to play the pre-roll interactive ad demo.</h3>
      <p>
        Kindly relaunch the Demo Preview box if the interactive ad demo not
        loading.
      </p>

      <video
        id="pfxPlayer"
        className="video-js vjs-default-skin vjs-big-play-centered"
        controls
        preload="auto"
        width="640"
        height="360"
        poster="https://www.performics.com.tw/static/media/poster-pfx.png"
        data-setup={`{
            "plugins": {
            "vastClient": {
              "adTagUrl": "${pli}"
              }
            }
          }`}
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
