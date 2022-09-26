import React, { useState, useEffect, useCallback } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import FilterBarComponent from "../../components/filterBar/filterBarComponent";
import Modal from "../../components/modal/Modal";
import "./gallery.scss";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");
  const [toggleModal, setToggleModal] = useState(false);
  // let [selectedDatas, setSelectedDatas] = useState([]);

  const tidyDescription = (data) => {
    setGallery(data);
    setLoading(true);

    setTimeout(() => {
      const describes = document.querySelectorAll(".card-body ul");

      describes.forEach((d) => {
        if (d.textContent !== "undefined" || d.textContent !== "") {
          if (d.textContent.includes("~")) {
            const newContent = d.textContent.replace(/~/g, "<li>");
            d.innerHTML = newContent;
          }
        }
      });
    }, 500);
  };

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
    const alertBox = document.getElementById("no-result-alert");

    if (v.length <= 0 || v.length === "") {
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
            alertBox.style.display = "none";
          } else {
            currentTarget.style.display = "none";
          }
        }
      }
    }
    setLoading(true);
  }

  const getAPI = useCallback(() => {
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/dev_gallery?alt=json&key=" +
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

  // function handleToggleModal(e) {
  //   setToggleModal(true);
  //   var selectedTemplate = e.currentTarget.getAttribute("data");

  //   gallery.forEach((v) => {
  //     if (v.tempid === selectedTemplate) {
  //       setSelectedDatas(v);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   const getAPI = function () {
  //     fetch(
  //       "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/dev_gallery?alt=json&key=" +
  //         process.env.REACT_APP_API_KEY
  //     )
  //       .then((res) => res.json())
  //       .then((res) => {
  //         filterDataGallery(res);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         setTimeout(() => {
  //           getAPI();
  //         }, 1000);
  //       });
  //   };

  //   getAPI();
  // }, []);

  return (
    <div>
      <FilterBarComponent handleSorting={sorting} />
      {/* {console.log(gallery)} */}
      <div className="content-bottom">
        {toggleModal && (
          // <Modal toggleModal={setToggleModal} data={selectedDatas} />
          <Modal toggleModal={setToggleModal} />
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
                    <video
                      src={value.adthumb}
                      muted
                      playsInline
                      autoPlay
                    ></video>
                    {/* <img
                      src={value.previmg}
                      alt="pfxrichmedia"
                      className={value.tempid + " card-img-top rmThumb"}
                      loading="lazy"
                    /> */}
                  </a>

                  <div className="card-body text-start ps-3 pe-3">
                    <h5 className="card-title">{value.tempname}</h5>
                    <ul className="ps-3">{value.desc}</ul>
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
                      <button className="btn btn-primary">
                        View and interact with Ad
                      </button>
                    </a>

                    {/* <button
                      className="ms-3 btn btn-secondary"
                      onClick={handleToggleModal}
                      data={value.tempid}
                    >
                      More Info
                    </button> */}
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
