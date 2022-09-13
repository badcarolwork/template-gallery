import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import "./adFilters.scss";

const AdFilters = () => {
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
        "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/adFilter?alt=json&key=" +
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

  return (
    <div>
      <FilterBarComponent parent="adfilter" />
      <div className="content-bottom ad-filter">
        {!loading ? (
          <ClipLoader color={color} size={180}></ClipLoader>
        ) : (
          <div className="grid-layout row">
            <div className="title col-12 col-md-12">
              <div className="heading">
                PM Ad filter
                <span>
                  為靜態圖廣告添加動感,達到增加廣告的吸睛力進而鼓勵user和廣告banner的互動.
                  以下效果搭配Video in banner格式, 也可搭配其他Template一起使用.
                </span>
              </div>
            </div>
            {gallery.map((v, k) => {
              return (
                <div className="col-12 col-md-6 d-flex mb-5" key={k}>
                  <div className="row">
                    <div className="col-12 col-md-6 thumbs text-center">
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

export default AdFilters;
