const filterData = (getdata, callback) => {
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
  callback(formatted);
};
