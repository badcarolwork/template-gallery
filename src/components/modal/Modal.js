import "./modal.scss";

const Modal = ({ toggleModal, templateData }) => {
  return templateData !== "" ? (
    <div className="modal-container">
      {templateData.map((v, k) => {
        return (
          <div className="modal-body" key={k}>
            <div className="modal-title">
              <div className="title">{v.templatename}</div>
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
                <div className="col-md-6 col-12">
                  <img src={v.previewGif} alt="demo" />
                </div>
                <div className="col-md-6 col-12">{v.description}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};
export default Modal;
