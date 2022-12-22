import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-contrib-ads";
import "videojs-ima";

const Player = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { pli, options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
      var imaOptions = {
        adTagUrl: pli,
      };

      player.ima(imaOptions);

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    }
  }, [options, videoRef, onReady, pli]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div>
      <h2>Interactive Video Ad Showcase</h2>
      <p>For better experience, kindly preview the showcase on desktop.</p>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
        />
      </div>
    </div>
  );
};

export default Player;
