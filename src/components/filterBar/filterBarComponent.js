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

  const container = document.querySelector(".filter-container");
  const Expandicon = document.getElementById("toggle-icon");
  const collaseIcon = document.querySelector("[data-icon=filter-collapse]");

  function handleFilterClick(e) {
    const checkboxs = document.querySelectorAll(".filter-option");

    let selectedOptions = [];
    container.classList.remove("expand");
    Expandicon.classList.add("fa-angle-down");
    Expandicon.classList.remove("fa-angle-up");
    collaseIcon.classList.add("hide");
    collaseIcon.classList.remove("show");

    for (let i = 0; i < checkboxs.length; i++) {
      const selectedVal = checkboxs[i].getAttribute("value");
      if (checkboxs[i].classList.contains("checked")) {
        selectedOptions.push(selectedVal);
        props.handleSorting(selectedOptions);
      }
    }
  }

  function handleClearSelectedFilters() {
    const checkboxs = document.querySelectorAll(".filter-option");

    for (let i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].classList.contains("checked")) {
        checkboxs[i].classList.remove("checked");
      }
    }
  }

  function handleExpand(e) {
    const container = document.querySelector(".filter-container");
    container.classList.add("expand");
    Expandicon.classList.remove("fa-angle-down");
    Expandicon.classList.add("fa-angle-up");

    collaseIcon.classList.add("show");
    collaseIcon.classList.remove("hide");
  }

  function handleCollapse(e) {
    console.log(e);
    container.classList.remove("expand");
    Expandicon.classList.add("fa-angle-down");
    Expandicon.classList.remove("fa-angle-up");
    collaseIcon.classList.add("hide");
    collaseIcon.classList.remove("show");
  }

  return (
    <div className="filter-container">
      <div className="row">
        <div
          className="col-md-2"
          style={{ cursor: "pointer" }}
          onClick={handleExpand}
        >
          <i className="fas fa-filter pe-1"></i>
          進階選項 Filter by
          <i id="toggle-icon" className="fas fa-angle-down ps-3"></i>
        </div>
        <div className="col-md-2">
          <div onClick={handleExpand}>廣告格式: </div>
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

        <div className="col-md-2" onClick={handleExpand}>
          <div onClick={handleExpand}>廣告用途: </div>
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

        <div className="col-md-2" onClick={handleExpand}>
          <div onClick={handleExpand}>支援裝置: </div>
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

        <div className="col-md-2" onClick={handleExpand}>
          <div onClick={handleExpand}>支援平台: </div>
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
        <div className="col-md-2">
          <div
            className="hide text-lightGrey"
            onClick={handleCollapse}
            data-icon="filter-collapse"
          >
            <i className="fa fa-times large-icon"></i>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <button
          id="collapseFilter"
          type="button"
          onClick={() => handleFilterClick(this)}
        >
          顯示結果
        </button>

        <button
          type="button"
          className="btn btn-inactive"
          onClick={handleClearSelectedFilters}
        >
          取消篩選項目
        </button>
      </div>
    </div>
  );
};
export default FilterBarComponent;
