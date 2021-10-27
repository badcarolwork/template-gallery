import React, { useState, useEffect } from "react";
import "./filterBarComponent.scss";

const FilterBarComponent = (props) => {
  // clean the database
  const [filterdata, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const getfilterdata = async () => {
    const res = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/filterbar?alt=json&key=" +
        process.env.REACT_APP_API_KEY
    );

    if (res.ok) {
      const data = await res.json();
      sortFilterData(data);
      setLoading(true);
    } else {
      console.log("if error will retrive the API");
      setLoading(false);
      setTimeout(getfilterdata, 1000);
    }
  };

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
    let mounted = true;
    if (mounted) {
      getfilterdata();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  function handleFilterClick(e) {
    const checkboxs = document.querySelectorAll(".form-check-input");
    let selectedOptions = [];
    for (let i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].checked) {
        selectedOptions.push(checkboxs[i].value);

        if (selectedOptions.length > 0) {
          handleSorting(selectedOptions);
        } else {
          alert("請選擇欲瀏覽的分類");
          return;
        }
      }
    }
  }

  function handleSorting(value) {
    console.log(value);
  }

  return (
    <div className="filter-container row">
      <div className="col-md-2">
        <label>廣告格式: </label>
        <div className="filter-option-box">
          {filterdata.map((value, key) => {
            return value.ad_type !== "" ? (
              <div className="filter-option" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value.ad_type}
                ></input>
                {value.ad_type}
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
              <div className="filter-option" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value.ad_purpose}
                ></input>
                {value.ad_purpose}
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
              <div className="filter-option" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value.supported_device}
                ></input>
                {value.supported_device}
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
              <div className="filter-option" key={key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={value.supported_platform}
                ></input>
                {value.supported_platform}
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div className="col-md-2">
        <button type="button" onClick={() => handleFilterClick(this)}>
          顯示更多
        </button>
      </div>
    </div>
  );
};
export default FilterBarComponent;
