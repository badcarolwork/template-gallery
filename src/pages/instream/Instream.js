import React, { useState, useEffect, useCallback } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import Modal from "../../components/modal/Modal";
import "./instream.scss";

const InStream = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");
  const [toggleModal, setToggleModal] = useState(false);
  let [pli, setPli] = useState([]);

  const tidyDescription = (data) => {
    setGallery(data);
    setLoading(true);

    setTimeout(() => {
      const describes = document.querySelectorAll(".desc-box ul");

      describes.forEach((d) => {
        if (d.textContent !== "undefined" || d.textContent !== "") {
          if (d.textContent.includes("-")) {
            const newContent = d.textContent.replace(/-/g, "<li>");
            d.innerHTML = newContent;
          }
        }
      });
    }, 500);
  };

  function sorting(v) {
    const containers = document.querySelectorAll('div[name="data_container"]');
    const alertBox = document.getElementById("no-result-alert");

    if (v.length <= 0 || v.length === "") {
      for (let i = 0; i < containers.length; i++) {
        containers[i].style.display = "flex";
      }
    } else {
      for (let i = 0; i < v.length; i++) {
        let eachValue = v[i];
        for (let c = 0; c < containers.length; c++) {
          const currentTarget = containers[c];
          currentTarget.style.display = "none";
          alertBox.style.display = "block";
          alertBox.innerHTML = "Searching, please wait...";
          if (currentTarget.classList.contains(eachValue)) {
            setLoading(false);
            setTimeout(() => {
              currentTarget.style.display = "flex";
              alertBox.style.display = "none";
            }, 500);
            setLoading(true);
          } else {
            setTimeout(() => {
              alertBox.innerHTML = "No results found.";
            }, 500);
          }
        }
      }
    }
  }

  const getAPI = useCallback(() => {
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/instream?alt=json&key=" +
        process.env.REACT_APP_API_KEY
    )
      .then((res) => res.json())
      .then((res) => {
        let keys = res.values[0];
        let newData = res.values.slice(1, res.values.length);

        let formatted = [],
          data = newData,
          cols = keys,
          l = cols.length;

        for (var i = 0; i < data.length; i++) {
          var d = data[i],
            o = {};
          for (var j = 0; j < l; j++) o[cols[j]] = d[j];
          formatted.push(o);
        }

        tidyDescription(formatted);
      })
      .catch((error) => {
        console.error("Error:", error);
        setTimeout(() => {
          getAPI();
        }, 1000);
      });
  }, []);

  useEffect(() => {
    getAPI();
  }, [getAPI]);

  function handleToggleModal(e) {
    setToggleModal(true);
    setPli(e.currentTarget.getAttribute("pli"));
  }

  return (
    <div>
      <FilterBarComponent parent="instream" handleSorting={sorting} />
      <div className="content-bottom instream">
        {toggleModal && <Modal toggleModal={setToggleModal} data={pli} />}

        {!loading ? (
          <ClipLoader color={color} size={180}></ClipLoader>
        ) : (
          <div className="grid-layout row">
            <div id="no-result-alert" className="alert-box">
              無法查到符合篩選條件之格式, 請再選擇相關選項.
            </div>
            {/* <div className="title col-12 col-md-12">
              <div className="heading">
                互動影音 Interactive Video Ad
                <span>
                  在in-stream影音廣告加入互動元素, 讓用戶與品牌廣告進行互動,
                  增加對品牌的印象. Performics提供客製化互動廣告提案與製作.
                </span>
              </div>
            </div> */}
            {gallery.map((v, k) => {
              return (
                <div
                  className={v.brand + " col-12 col-md-6 dFlex mb-5"}
                  key={k}
                  name="data_container"
                >
                  <div className="row">
                    <div className="col-12 col-md-8 thumbs text-center">
                      <button className="btn play-btn">
                        <i className="fas fa-play pe-2"></i>播放Demo
                      </button>
                      {/* <img src={v.previmg} /> */}

                      <video muted autoPlay playsInline loop>
                        <source src={v.prevvid} type="video/mp4" />
                      </video>
                    </div>
                    <div className="col-12 col-md-4 desc-box">
                      <h5 className="card-title">{v.tempname}</h5>
                      <ul>{v.desc}</ul>
                      <br />

                      <button
                        className="btn btn-primary mt-3 demo-btn"
                        onClick={handleToggleModal}
                        pli={v.demotag}
                      >
                        View and interact with Ad
                      </button>
                      {/* <a href={v.demolink} target="_blank" rel="noreferrer">
                        <button className="btn btn-primary mt-3 demo-btn">
                          View and interact with Ad
                        </button>
                      </a> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InStream;
