import React, { useState, useEffect } from "react";
import "./filterBarComponent.scss";
import logo from "../../img/mobile-logo.png";

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
    console.log(formatted);
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
  // const collaseIcon = document.querySelector("[data-icon=filter-collapse]");
  let selectedOptions = [];

  function handleFilterClick(e) {
    const checkboxs = document.querySelectorAll(".filter-option");

    container.classList.remove("expand");
    Expandicon.classList.add("fa-angle-down");
    Expandicon.classList.remove("fa-angle-up");
    // collaseIcon.classList.add("hide");
    // collaseIcon.classList.remove("show");

    for (let i = 0; i < checkboxs.length; i++) {
      const selectedVal = checkboxs[i].getAttribute("value");
      console.log(checkboxs[i].classList.contains("checked"));
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
        selectedOptions = [];
        props.handleSorting(selectedOptions);
      }
    }
  }

  function handleToggleExpand(e) {
    const container = document.querySelector(".filter-container");

    if (container.classList.contains("expand")) {
      container.classList.remove("expand");
      Expandicon.classList.add("fa-angle-down");
      Expandicon.classList.remove("fa-angle-up");
      // collaseIcon.classList.add("hide");
      // collaseIcon.classList.remove("show");
    } else {
      container.classList.add("expand");
      Expandicon.classList.remove("fa-angle-down");
      Expandicon.classList.add("fa-angle-up");

      // collaseIcon.classList.add("show");
      // collaseIcon.classList.remove("hide");
    }
  }

  function handleToggleSidebar(e) {
    const sidebar = document.querySelector("#sidebar");
    const rightContent = document.querySelector("main .content-right");

    if (sidebar.classList.contains("expand")) {
      sidebar.classList.remove("expand");
      rightContent.classList.remove("expand");
      sidebar.classList.add("collapse");
      e.currentTarget.classList.remove("fa-times");
      e.currentTarget.classList.add("fa-bars");
    } else {
      sidebar.classList.add("expand");
      rightContent.classList.add("expand");
      sidebar.classList.remove("collapse");
      e.currentTarget.classList.add("fa-times");
      e.currentTarget.classList.remove("fa-bars");
    }
  }

  return (
    <div className="filter-container">
      <div className="row">
        <div className="col-3 mobile-menu">
          <i className="fas fa-bars" onClick={handleToggleSidebar}></i>
        </div>
        <div className="col-5 mobile-logo">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div
          className="col-md-2 col-4 mobile-filter"
          style={{ cursor: "pointer" }}
          onClick={handleToggleExpand}
        >
          <i className="fas fa-filter pe-1"></i>
          進階選項<span className="mobile-hide">Filter by</span>
          <i id="toggle-icon" className="fas fa-angle-down ps-2"></i>
        </div>
        <div className="col-md-2 col-12">
          <div onClick={handleToggleExpand}>廣告格式: </div>
          <div className="filter-option-box">
            {filterdata.map((value, key) => {
              return value.ad_type !== "" ||
                value.ad_type !== "undefined" ||
                value.ad_type !== null ? (
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

        <div className="col-md-2 col-12" onClick={handleToggleExpand}>
          <div onClick={handleToggleExpand}>廣告用途: </div>
          <div className="filter-option-box">
            {filterdata.map((value, key) => {
              return value.ad_purpose !== "" ||
                value.ad_purpose !== "undefined" ||
                value.ad_purpose !== null ? (
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

        <div className="col-md-2 col-12" onClick={handleToggleExpand}>
          <div onClick={handleToggleExpand}>支援裝置: </div>
          <div className="filter-option-box">
            {filterdata.map((value, key) => {
              return value.supported_device !== "" ||
                value.supported_device !== "undefined" ||
                value.supported_device !== null ? (
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

        <div className="col-md-2 col-12" onClick={handleToggleExpand}>
          <div onClick={handleToggleExpand}>支援平台: </div>
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
        {/* <div className="col-md-2 col-12">
          <div
            className="hide text-lightGrey"
            onClick={handleToggleExpand}
            data-icon="filter-collapse"
          >
            <i className="fa fa-times large-icon"></i>
          </div>
        </div> */}
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
