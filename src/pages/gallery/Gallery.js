import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import "./gallery.scss";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");
  const [selectedValue, setSelectedValue] = useState([]);

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

  function sorting(v) {
    let values = [];

    values.push(v);
    setSelectedValue(values);
    setTimeout(() => {
      console.log(selectedValue);
    }, 1000);

    const containers = document.querySelectorAll(
      'div[ data-filter="data_container"]'
    );
  }

  useEffect(() => {
    const getAPI = function () {
      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/gallery?alt=json&key=" +
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
    <div className="content-bottom">
      {!loading ? (
        <ClipLoader color={color} size={180}></ClipLoader>
      ) : (
        <div className="row">
          <FilterBarComponent handleSorting={sorting} />

          {gallery.map((value, key) => {
            return (
              <div
                className={
                  value.tempid +
                  " col-xs-12 col-sm-6 col-md-3 text-center mb-5 align-items-stretch d-flex flex-column align-items-stretch"
                }
                data-filter={value.filtercategory}
                key={key}
              >
                <img
                  src={value.previmg}
                  alt="pfxrichmedia"
                  className="card-img-top rmThumb"
                  loading="lazy"
                />
                <div className="card-body text-start">
                  <h5 className="card-title">{value.tempname}</h5>
                  <div className="card-text">{value.desc}</div>
                </div>
                <div className="card-text mt-auto align-self-start ps-3 pb-2">
                  {value.devicepc === "TRUE" ? (
                    <i className="fas fa-desktop pc me-3 text-black-50 fs-4"></i>
                  ) : null}
                  {value.devicemobile === "TRUE" ? (
                    <i className="fas fa-mobile-alt mobile text-black-50 fs-4"></i>
                  ) : null}
                </div>
                <div className="card-text mt-auto align-self-start ps-3">
                  <a
                    href={value.demolink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary text-white">
                      嘗試範例
                    </button>
                  </a>
                  <button
                    className="btn btn-outline-primary ms-3"
                    data-temp={value.tempid}
                  >
                    案例參考
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;
