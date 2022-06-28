import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import Modal from "../../components/modal/Modal";
import "./gallery.scss";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");
  const [toggleModal, setToggleModal] = useState(false);
  let [selectedTemp, setSelectedTemp] = useState([]);

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

  function handleShowGifDemo(e) {
    const parent = e.currentTarget.parentNode.id;
    const imgSrc = document.querySelector("div#" + parent + " > img.rmThumb");
    const playIcon = document.querySelector(
      "div#" + parent + " > .show-gif > i"
    );
    const staticImgSrc = e.currentTarget.getAttribute("data-staticsrc");
    const gifImgSrc = e.currentTarget.getAttribute("data-gifsrc");

    if (e.currentTarget.parentNode.classList.contains("active")) {
      e.currentTarget.parentNode.classList.remove("active");
      imgSrc.setAttribute("src", staticImgSrc);
      playIcon.classList.remove("fa-pause-circle");
      playIcon.classList.add("fa-play-circle");
    } else {
      e.currentTarget.parentNode.classList.add("active");
      imgSrc.setAttribute("src", gifImgSrc);
      playIcon.classList.add("fa-pause-circle");
      playIcon.classList.remove("fa-play-circle");
    }
  }

  function handleToggleModal(e) {
    setToggleModal(true);
    let arr = [];

    arr.push({
      templatename: e.currentTarget.getAttribute("data-name"),
      templateId: e.currentTarget.getAttribute("data-temp"),
      previewGif: e.currentTarget.getAttribute("data-src"),
      description: e.currentTarget.getAttribute("data-desc"),
    });
    setSelectedTemp(arr);
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
    <div>
      <FilterBarComponent handleSorting={sorting} />

      <div className="content-bottom">
        {toggleModal && (
          <Modal toggleModal={setToggleModal} templateData={selectedTemp} />
        )}

        {!loading ? (
          <ClipLoader color={color} size={180}></ClipLoader>
        ) : (
          <div className="grid-layout row">
            <div id="no-result-alert" className="alert-box">
              無法查到符合篩選條件之格式, 請再選擇相關選項.
            </div>

            {gallery.map((value, key) => {
              // let filtercategory = value.filtercategory.replace(/ /g, " ");
              return (
                <div
                  id={value.tempid}
                  className={
                    value.tempid +
                    " " +
                    value.filtercategory +
                    " col-12 col-sm-6 col-md-3 align-items-stretch flex-column align-items-stretch gallery-box"
                  }
                  name="data_container"
                  key={value.tempid}
                >
                  <div className="new-label"></div>
                  <a
                    className="text-center"
                    href={value.demolink}
                    data-temp={value.tempid}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={value.previmg}
                      alt="pfxrichmedia"
                      className={value.tempid + " card-img-top rmThumb"}
                      loading="lazy"
                    />
                  </a>

                  <div
                    className="show-gif"
                    onClick={handleShowGifDemo}
                    data-staticsrc={value.previmg}
                    data-gifsrc={value.prevgif}
                  >
                    <i
                      className="far fa-play-circle"
                      style={{ display: "none" }}
                    ></i>
                  </div>
                  <div className="card-body text-start ps-3 pe-3">
                    <h5 className="card-title">{value.tempname}</h5>
                    {/* <div className="card-text">{value.desc}</div> */}
                  </div>
                  <div className="card-text mt-auto pb-2 ps-3 pe-3">
                    {value.devicepc === "TRUE" ? (
                      <i className="fas fa-desktop pc me-3 icon-text-size fs-4"></i>
                    ) : null}
                    {value.devicemobile === "TRUE" ? (
                      <i className="fas fa-mobile-alt mobile icon-text-size fs-4"></i>
                    ) : null}
                  </div>
                  <div className="card-text mt-auto ps-3 pe-3">
                    <a
                      href={value.demolink}
                      data-temp={value.tempid}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-primary">Demo</button>
                    </a>
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

export default Gallery;
