import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import "./gallery.scss";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gifActive, setGifActive] = useState(false);
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

  function sorting(v) {
    setLoading(false);
    const containers = document.querySelectorAll('div[name="data_container"]');

    let classes = "\\b(" + v.join("|") + ")\\b",
      dimenRegex = new RegExp(classes, "i");
    console.log(dimenRegex);
    containers.forEach((eContainer) => {
      let elClasses =
        " " + eContainer.getAttribute("class").replace(/\s+/, " ") + " ";

      setTimeout(() => {
        setLoading(true);
        if (v.length > 0) {
          if (dimenRegex.test(elClasses)) {
            eContainer.style.display = "flex";
          } else {
            eContainer.style.display = "none";
            console.log("2222");
          }
        } else {
          eContainer.style.display = "flex";
        }
      }, 500);
    });
  }

  function handleShowGifDemo(e) {
    var parent = e.currentTarget.parentNode.id;
    var staticImg = document.querySelector("#" + parent + " .rmThumb");
    var playIcon = document.querySelector("#" + parent + " .show-gif");

    if (staticImg.classList.contains("active")) {
      setGifActive(false);
      staticImg.classList.remove("active");
      playIcon.style.display = "block";
    } else {
      setGifActive(true);
      staticImg.classList.add("active");
      playIcon.style.display = "none";
    }
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
      <FilterBarComponent handleSorting={sorting} />
      {!loading ? (
        <ClipLoader color={color} size={180}></ClipLoader>
      ) : (
        <div className="grid-layout row">
          {gallery.map((value, key) => {
            let filtercategory = value.filtercategory.replace(/,/g, " ");
            return (
              <div
                id={value.tempid}
                className={
                  value.tempid +
                  " " +
                  filtercategory +
                  " col-xs-12 col-sm-6 col-md-3 text-center mb-5 align-items-stretch flex-column align-items-stretch gallery-box"
                }
                name="data_container"
                key={value.tempid}
              >
                <img
                  src={gifActive ? value.prevgif : value.previmg}
                  alt="pfxrichmedia"
                  className="card-img-top rmThumb"
                  loading="lazy"
                />

                <div className="show-gif" onClick={handleShowGifDemo}>
                  <i
                    className={
                      gifActive ? "far fa-pause-circle" : "far fa-play-circle"
                    }
                  ></i>
                </div>
                <div className="card-body text-start">
                  <h5 className="card-title">{value.tempname}</h5>
                  <div className="card-text">{value.desc}</div>
                </div>
                <div className="card-text mt-auto align-self-start pb-2">
                  {value.devicepc === "TRUE" ? (
                    <i className="fas fa-desktop pc me-3 text-black-50 fs-4"></i>
                  ) : null}
                  {value.devicemobile === "TRUE" ? (
                    <i className="fas fa-mobile-alt mobile text-black-50 fs-4"></i>
                  ) : null}
                </div>
                <div className="card-text mt-auto align-self-start">
                  <a
                    href={value.demolink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary">嘗試範例</button>
                  </a>
                  <button
                    className="btn btn-secondary ms-3"
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
