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
    // console.log(formatted);
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
    handleHideEmptyFilterOption();
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
    // reset all selected filters
    selectedOptions = [];
    const checkboxs = document.querySelectorAll(".filter-option");

    container.classList.remove("expand");
    Expandicon.classList.add("fa-angle-down");
    Expandicon.classList.remove("fa-angle-up");
    // collaseIcon.classList.add("hide");
    // collaseIcon.classList.remove("show");

    for (let i = 0; i < checkboxs.length; i++) {
      const selectedVal = checkboxs[i].getAttribute("value");
      // console.log(checkboxs[i].classList.contains("checked"));
      if (checkboxs[i].classList.contains("checked")) {
        selectedOptions.push(selectedVal);
        props.handleSorting(selectedOptions);
      }
    }
  }

  function handleHideEmptyFilterOption() {
    const elements = document.querySelectorAll(".filter-option");

    for (let i = 0; i < elements.length; i++) {
      const ele = elements[i];
      let checlVal = ele.getAttribute("value");
      console.log(checlVal);
      // if (checlVal === "" || checlVal === "undefined" || checlVal === null) {
      //   ele.styel.display = "none";
      // }
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
          <div>廣告格式: </div>
          <div className="filter-option-box">
            {filterdata.map((v, k) => {
              if (v.ad_type === "" || v.ad_type === "undefined") {
                return null;
              } else {
                return (
                  <div
                    className="filter-option"
                    key={k}
                    value={v.ad_type}
                    onClick={handleCheckedOption}
                  >
                    {v.ad_type_label}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="col-md-2 col-12">
          <div>廣告用途: </div>
          <div className="filter-option-box">
            {filterdata.map((v, k) => {
              if (v.ad_purpose === "" || v.ad_purpose === "undefined") {
                return null;
              } else {
                return (
                  <div
                    className="filter-option"
                    key={k}
                    value={v.ad_purpose}
                    onClick={handleCheckedOption}
                  >
                    {v.ad_purpose_label}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="col-md-2 col-12">
          <div>支援裝置: </div>
          <div className="filter-option-box">
            {filterdata.map((v, k) => {
              if (
                v.device === "null" ||
                v.device === "" ||
                v.device === "undefined"
              ) {
                return null;
              } else {
                return (
                  <div
                    className="filter-option"
                    key={k}
                    value={v.device}
                    onClick={handleCheckedOption}
                  >
                    {v.device_label}
                  </div>
                );
              }
            })}
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
