import "./modal.scss";
import Player from "../pfxPlayer/player";

const Modal = ({ toggleModal, data }) => {
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
          <Player pli={data} />
        </div>
      </div>
    </div>
  );
};
export default Modal;
