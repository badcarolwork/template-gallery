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
    // console.log(v);
    const containers = document.querySelectorAll('div[name="data_container"]');
    let selectedV = v.join(" ");
    let noVisible = 0;

    containers.forEach((eContainer) => {
      const className = eContainer.getAttribute("class");
      eContainer.style.display = "flex";
      document.getElementById("no-result-alert").style.display = "none";

      setLoading(true);
      if (className.indexOf(selectedV) !== -1) {
        eContainer.style.display = "flex";
      } else {
        eContainer.style.display = "none";
        noVisible++;
        if (noVisible === gallery.length) {
          document.getElementById("no-result-alert").style.display = "block";
        }
      }
    });
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

    // setSelectedTempId;

    arr.push(
      e.currentTarget.getAttribute("data-temp"),
      e.currentTarget.getAttribute("data-src"),
      e.currentTarget.getAttribute("data-desc"),
      e.currentTarget.getAttribute("data-name")
    );
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
          <Modal toggleModal={setToggleModal} tempId={selectedTemp} />
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
                    " col-12 col-sm-6 col-md-3 mb-5 align-items-stretch flex-column align-items-stretch gallery-box"
                  }
                  name="data_container"
                  key={value.tempid}
                >
                  <div className="new-label"></div>
                  <img
                    src={value.previmg}
                    alt="pfxrichmedia"
                    className={value.tempid + " card-img-top rmThumb"}
                    loading="lazy"
                  />

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
                  <div className="card-text mt-auto align-self-start pb-2 ps-3 pe-3">
                    {value.devicepc === "TRUE" ? (
                      <i className="fas fa-desktop pc me-3 text-black-50 fs-4"></i>
                    ) : null}
                    {value.devicemobile === "TRUE" ? (
                      <i className="fas fa-mobile-alt mobile text-black-50 fs-4"></i>
                    ) : null}
                  </div>
                  <div className="card-text mt-auto align-self-start ps-3 pe-3">
                    <a
                      href={value.demolink}
                      data-temp={value.tempid}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn btn-primary">Demo</button>
                    </a>
                    <button
                      className="btn btn-secondary ms-3"
                      onClick={handleToggleModal}
                      data-temp={value.tempid}
                      data-src={value.previmg}
                      data-desc={value.desc}
                      data-name={value.tempname}
                    >
                      更多詳情
                    </button>
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
