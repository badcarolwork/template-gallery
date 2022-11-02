import {  useRef} from "react";
import "./modal.scss";
import Player from "../pfxPlayer/player";

const Modal = ({ toggleModal, data }) => {

  const playerRef = useRef(null);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://www.performics.com.tw/static/media/Performics_3M.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };


  return (
    <div className="modal-container">
      <div
        onClick={() => {
          toggleModal(false);
        }}
        className="close-modal"
      >
        <i className="fa fa-times "></i>
      </div>
      <div className="modal-body">
        <div className="modal-content mt-3">
          <Player pli={data} options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      </div>
    </div>
  );
};
export default Modal;
