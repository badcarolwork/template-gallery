import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./instream.scss";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  let [color] = useState("#1E9A4B");
  const [toggleModal, setToggleModal] = useState(false);
  let [selectedDatas, setSelectedDatas] = useState([]);
  const mainUrl = process.env.REACT_APP_MAINURL;

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

  function handleToggleModal(e) {
    setToggleModal(true);
    var selectedTemplate = e.currentTarget.getAttribute("data");

    gallery.forEach((v) => {
      if (v.tempid === selectedTemplate) {
        setSelectedDatas(v);
      }
    });
  }

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

  return (
    <div>
      {console.log(gallery)}
      <div className="content-bottom">
        {toggleModal && (
          <Modal toggleModal={setToggleModal} data={selectedDatas} />
        )}

        {!loading ? (
          <ClipLoader color={color} size={180}></ClipLoader>
        ) : (
          <div className="grid-layout row">
            <div id="no-result-alert" className="alert-box">
              無法查到符合篩選條件之格式, 請再選擇相關選項.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
