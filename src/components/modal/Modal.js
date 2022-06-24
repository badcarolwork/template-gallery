import "./modal.scss";

const Modal = ({ toggleModal, tempId }) => {
  console.log(tempId);
  return (
    <div className="modal-container">
      <div className="modal-body">
        <div className="modal-title">
          <div className="title">dsadsadsad</div>
          <div
            onClick={() => {
              toggleModal(false);
            }}
            className="close-modal"
          >
            <i className="fa fa-times "></i>
          </div>
        </div>
        <div className="modal-content mt-4">
          <div className="grid-layout row">
            <div className="col-md-6">img</div>
            <div className="col-md-6">img</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
