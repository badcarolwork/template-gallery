import { useEffect,useState } from "react";
import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';

const Player = ({ pli }) => {
  useEffect(() => {
    var videoOptions = {
      controls: true,
      sources: [{
          src: 'https://www.performics.com.tw/static/media/Performics_3M.mp4',
          type: 'video/mp4',
      }]
    };
    
    var player = videojs('pfxPlayer', videoOptions);
    
    var imaOptions = {
      adTagUrl: pli
    };
    
    player.ima(imaOptions);
  });
  

  return (<video
    id="pfxPlayer"
    className="video-js vjs-default-skin vjs-big-play-centered"
    controls
    preload="auto"
    width="640"
    height="360"
    poster="https://www.performics.com.tw/static/media/poster-pfx.png"
  >
  </video>)
}

export default Player;
