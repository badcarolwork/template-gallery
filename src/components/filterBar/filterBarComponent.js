import React from "react";
import "./filterBarComponent.scss";

const filterBarComponent = (data) => {
  return (
    <div className="filter-container">
      {/* <label>廣告格式: </label>
      <select>
        {data.data.map((value, key) => {
          return (
            <option key={key} value={value.tempname}>
              {value.tempname}
            </option>
          );
        })}
      </select> */}

      <label>廣告格式: </label>
      <select>
        <option value="image">圖檔</option>
        <option value="vib">圖檔+影音</option>
      </select>

      <label>支援裝置: </label>
      <select>
        <option value="pc">桌機</option>
        <option value="mobile">行動裝置</option>
      </select>

      <label>支援平台: </label>
      <select>
        <option value="pc">PMP</option>
        <option value="mobile">RTB</option>
      </select>

      <label>支援平台: </label>
      <select>
        <option value="pc">PMP</option>
        <option value="mobile">RTB</option>
      </select>
    </div>
  );
};
export default filterBarComponent;
