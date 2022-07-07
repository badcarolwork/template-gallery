import "./modal.scss";

const Modal = ({ toggleModal, data }) => {
  var r = {};
  const mainUrl = process.env.REACT_APP_MAINURL;

  const cleanSupportFormat = () => {
    const ad300250 = data.ad300250.split(",");
    const ad300600 = data.ad300600.split(",");
    const ad320480 = data.ad320480.split(",");
    const ad336280 = data.ad336280.split(",");
    const ad970250 = data.ad970250.split(",");

    r = {
      ad300250: {
        display: ad300250[0],
        video: ad300250[1],
      },
      ad300600: {
        display: ad300600[0],
        video: ad300600[1],
      },
      ad320480: {
        display: ad320480[0],
        video: ad320480[1],
      },
      ad336280: {
        display: ad336280[0],
        video: ad336280[1],
      },
      ad970250: {
        display: ad970250[0],
        video: ad970250[1],
      },
    };
    console.log(r);
  };

  cleanSupportFormat();

  return data !== "" ? (
    <div className="modal-container">
      <div className="modal-body">
        <div
          onClick={() => {
            toggleModal(false);
          }}
          className="close-modal"
        >
          <i className="fa fa-times "></i>
        </div>
        <div className="modal-content mt-3">
          <div className="grid-layout row">
            <div className="col-md-6 col-12">
              <div className="title mb-3">{data.tempname}</div>

              {data.desc}

              <div className="support-table mt-3">
                {data.tempid === "stickyBanner" ? (
                  <div>
                    可能出現版位尺寸：414x260、375x200、320x170、411x258、360x226、280x176
                    <br />
                    <br />
                    可支援純圖檔以及影片格式.
                  </div>
                ) : (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Dimension</th>
                        <th scope="col">Display Supported</th>
                        <th scope="col">Video Supported</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>300x250</td>
                        <td>
                          {r.ad300250.display === "TRUE" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad336280.display === "FALSE" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {r.ad300250.video === "video" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad300250.video === "undefined" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>300x600</td>
                        <td>
                          {r.ad300600.display === "TRUE" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad336280.display === "FALSE" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {r.ad300600.video === "video" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad300250.video === "undefined" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>320x480</td>
                        <td>
                          {r.ad320480.display === "TRUE" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad336280.display === "FALSE" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {r.ad320480.video === "video" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad300250.video === "undefined" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>336x280</td>
                        <td>
                          {r.ad336280.display === "TRUE" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad336280.display === "FALSE" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {r.ad336280.video === "video" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad300250.video === "undefined" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>970x250</td>
                        <td>
                          {r.ad970250.display === "TRUE" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad336280.display === "FALSE" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {r.ad970250.video === "video" ? (
                            <i className="fas fa-check"></i>
                          ) : r.ad300250.video === "undefined" ? (
                            <i className="fas fa-times"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                <div className="text-center mt-3">
                  <a
                    href={mainUrl + data.demolink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary">Demo Preview</button>
                  </a>
                </div>
              </div>
            </div>

            <div className="demoBox col-md-6 col-12 text-center">
              <video muted autoPlay playsInline loop>
                <source src={data.prevvid} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Modal;
