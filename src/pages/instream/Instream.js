import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import "./instream.scss";

const InStream = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");

  const filterDataGallery = (resData) => {
    let keys = resData.values[0];
    let newData = resData.values.slice(1, resData.values.length);

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
    setGallery(formatted);

    setLoading(true);
  };

  useEffect(() => {
    const getAPI = function () {
      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/instream?alt=json&key=" +
          process.env.REACT_APP_API_KEY
      )
        .then((res) => res.json())
        .then((res) => {
          filterDataGallery(res);
        })
        .catch((error) => {
          console.error("Error:", error);
          setTimeout(() => {
            getAPI();
          }, 1000);
        });
    };
    getAPI();
  }, []);

  function sorting(v) {
    setLoading(false);
    const containers = document.querySelectorAll('div[name="data_container"]');
    document.getElementById("no-result-alert").style.display = "none";
    let noVisible = 0;

    setLoading(true);

    if (v.length <= 0) {
      for (let i = 0; i < containers.length; i++) {
        containers[i].style.display = "flex";
      }
    } else {
      for (let i = 0; i < v.length; i++) {
        const eachValue = v[i];

        for (let c = 0; c < containers.length; c++) {
          const currentTarget = containers[c];

          if (currentTarget.classList.contains(eachValue)) {
            currentTarget.style.display = "flex";
            document.getElementById("no-result-alert").style.display = "none";
          } else {
            currentTarget.style.display = "none";
            noVisible++;
            if (noVisible === v.length) {
              document.getElementById("no-result-alert").style.display =
                "block";
            }
          }
        }
      }
    }
  }

  return (
    <div>
      <FilterBarComponent parent="instream" handleSorting={sorting} />
      <div className="content-bottom instream">
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
                  className={v.brand + "col-12 col-md-6 d-flex mb-5"}
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
                      <span>{v.desc}</span>
                      <br />
                      <a href={v.demolink} target="_blank" rel="noreferrer">
                        <button className="btn btn-primary mt-3 demo-btn">
                          View and interact with Ad
                        </button>
                      </a>
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
