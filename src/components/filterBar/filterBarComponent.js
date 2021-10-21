import React from "react";

const filterBarComponent = () => {
  return (
    <div className="filter-container">
      <label>廣告格式: </label>
      <select>
        {gallery.map((value, key) => {
          return (
            <option key={key} value={value.tempname}>
              {value.tempname}
            </option>
          );
        })}
      </select>

      <label>類型類型: </label>
      <select>
        <option value="instream">Display</option>
        <option value="outstream">互動影音</option>
      </select>

      <label>支援裝置: </label>
      <select>
        <option value="pc">桌機.PC</option>
        <option value="mobile">行動裝置.手機</option>
      </select>
    </div>
  );
};
export default filterBarComponent;
