import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./gallery.scss";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");

  const getData = async () => {
    const res = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/gallery?alt=json&key=" +
        process.env.REACT_APP_API_KEY
    );

    if (res.ok) {
      const data = await res.json();
      filterDataGallery(data);
      setLoading(true);
    } else {
      console.log("error handling thinking how to do");
      setLoading(false);
      setTimeout(getData, 1000);
    }
  };

  const filterDataGallery = (getdata) => {
    let keys = getdata.values[0];
    let newData = getdata.values.slice(1, getdata.values.length);

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
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className="content-bottom">
      {!loading ? (
        <ClipLoader color={color} size={180}></ClipLoader>
      ) : (
        <div className="row">
          <div className="ad-type-container">
            <span>互動廣告 Display/ Interactive Ad</span>
            <span> | </span>
            <span>互動影音 Interactive Video Ad</span>
          </div>
          <div className="filter-container">
            <label>廣告格式: </label>
            <select>
              {gallery.map((value, key) => {
                return (
                  <option key={key} value={value.tempname}>
                    {value.tempname}
                  </option>
                );
              })}
            </select>

            <label>類型類型: </label>
            <select>
              <option value="instream">Display</option>
              <option value="outstream">互動影音</option>
            </select>

            <label>支援裝置: </label>
            <select>
              <option value="pc">桌機.PC</option>
              <option value="mobile">行動裝置.手機</option>
            </select>
          </div>
          {gallery.map((value, key) => {
            return (
              <div
                className="col-xs-12 col-sm-6 col-md-3 text-center mb-5 align-items-stretch d-flex flex-column align-items-stretch"
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
