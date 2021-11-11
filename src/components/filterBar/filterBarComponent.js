import React, { useState, useEffect } from "react";
import "./filterBarComponent.scss";

const FilterBarComponent = (props) => {
  // clean the database
  const [filterdata, setFilterdata] = useState([]);

  const sortFilterData = (getdata) => {
    // console.log(data);
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
    setFilterdata(formatted);
  };

  useEffect(() => {
    const getAPI = function () {
      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/filterbar?alt=json&key=" +
          process.env.REACT_APP_API_KEY
      )
        .then((res) => res.json())
        .then((res) => {
          sortFilterData(res);
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

  function handleCheckedOption(e) {
    if (e.currentTarget.classList.contains("checked")) {
      e.currentTarget.classList.remove("checked");
    } else {
      e.currentTarget.classList.add("checked");
    }
  }

  function handleFilterClick(e) {
    const checkboxs = document.querySelectorAll(".filter-option");
    let selectedOptions = [];

    for (let i = 0; i < checkboxs.length; i++) {
      const selectedVal = checkboxs[i].getAttribute("value");
      if (checkboxs[i].classList.contains("checked")) {
        selectedOptions.push(selectedVal);

        if (selectedOptions.length > 0) {
          props.handleSorting(selectedOptions);
        } else {
          alert("請選擇欲瀏覽的分類");
          return;
        }
      }
    }
  }

  function handleExpand(e) {
    const container = document.querySelector(".filter-container");
    const optionBoxes = document.querySelectorAll(".filter-option-box");
    const icon = document.getElementById("toggle-icon");

    if (container.classList.contains("expand")) {
      container.classList.remove("expand");
      icon.classList.add("fa-angle-down");
      icon.classList.remove("fa-angle-up");
    } else {
      container.classList.add("expand");
      icon.classList.remove("fa-angle-down");
      icon.classList.add("fa-angle-up");
    }
  }

  return (
    <div className="filter-container row">
      <div className="col-md-2" onClick={handleExpand}>
        <i className="fas fa-filter pe-1"></i>
        進階選項 Filter by
        <i id="toggle-icon" className="fas fa-angle-down ps-3"></i>
      </div>
      <div className="col-md-2">
        <label>廣告格式: </label>
        <div className="filter-option-box">
          {filterdata.map((value, key) => {
            return value.ad_type !== "" ? (
              <div
                className="filter-option"
                key={key}
                value={value.ad_type}
                onClick={handleCheckedOption}
              >
                {value.ad_type_label}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="col-md-2">
        <label>廣告用途: </label>
        <div className="filter-option-box">
          {filterdata.map((value, key) => {
            return value.ad_purpose !== "" ? (
              <div
                className="filter-option"
                key={key}
                value={value.ad_purpose}
                onClick={handleCheckedOption}
              >
                {value.ad_purpose_label}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="col-md-2">
        <label>支援裝置: </label>
        <div className="filter-option-box">
          {filterdata.map((value, key) => {
            return value.supported_device !== "" ? (
              <div
                className="filter-option"
                key={key}
                value={value.supported_device}
                onClick={handleCheckedOption}
              >
                {value.supported_device_label}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="col-md-2">
        <label>支援平台: </label>
        <div className="filter-option-box">
          {filterdata.map((value, key) => {
            return value.supported_platform !== "" ? (
              <div
                className="filter-option"
                key={key}
                value={value.supported_platform}
                onClick={handleCheckedOption}
              >
                {value.supported_platform}
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div className="col-md-2"></div>

      <button type="button" onClick={() => handleFilterClick(this)}>
        顯示更多
      </button>
    </div>
  );
};
export default FilterBarComponent;
