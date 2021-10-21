import React, { useState, useEffect } from 'react';
import './showcase.scss';

const Showcase = () => {
    const [showcaseList, setshowcaseList] = useState([])
    let isSet;
    let filter_dimension = [];
    let filter_platform = [];
    let filter_device = [];
    let filter_brand = [];

    let data_brand;
    let data_type;
    let data_dimension = [];
    let data_platform = [];
    let data_device = [];
    let data_h5_url;
    let data_prevImg;
    let data_prevVid;
    let showcaseItem;

    useEffect(() => {
        fetch("https://spreadsheets.google.com/feeds/list/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/1/public/values?alt=json")
            .then(res => res.json())
            .then(data => setshowcaseList(data.feed.entry))
    }, [])


    if (showcaseList !== '' || showcaseList !== null || showcaseList !== undefined || showcaseList.length !== 0) {
        isSet = true;
        showcaseList.forEach((value, index) => {
            data_brand = value.gsx$brand.$t;
            data_type = value.gsx$type.$t;
            data_h5_url = value.gsx$h5url.$t;
            data_prevImg = value.gsx$previewimg.$t;
            data_prevVid = value.gsx$previewvid.$t;

            let deviceArr = value.gsx$device.$t;
            data_device = deviceArr.replace(/,/g, ' ')

            let dimensionArr = value.gsx$dimension.$t;
            data_dimension = dimensionArr.replace(/,/g, ' ')

            let platformArr = value.gsx$platform.$t;
            // data_servethru = servedthruArr.split(",");
            data_platform = platformArr.replace(/,/g, ' ')

            //For filter section
            filter_brand.push(value.gsx$brand.$t);
            filter_dimension.push(value.gsx$filterdimension.$t);

            // filter device
            filter_device = deviceArr.split(",");
            filter_device = filter_device.filter((v, i, a) => a.indexOf(v) === i);

            // filter platform
            filter_platform = platformArr.split(",");
            filter_platform = filter_platform.filter((v, i, a) => a.inde2xOf(v) === i);

        })


    } else {
        isSet = false;
    }

    return (
        <div className="d-flex p-2 flex-wrap">
            <div className="btn-group shadow-0" role="group" aria-label="Basic example">
                <span>Filter by: </span>
                <div>支援行動設備:</div>
                {filter_device.map((item, key) => {
                    return <div key={key} className="form-check">
                        <input type="checkbox" className="form-check-input" value={item}></input>
                        <label key={key} className="form-check-label">{item}</label>
                    </div>
                })}

                <div>支援投遞平台:</div>
                {filter_platform.map((item, key) => {
                    return <div key={key} className="form-check">
                        <input type="checkbox" className="form-check-input" value={item}></input>
                        <label key={key} className="form-check-label">{item}</label>
                    </div>
                })}

                <div>品牌:</div>
                {filter_brand.map((item, key) => {
                    return <div key={key} className="form-check">
                        <input type="checkbox" className="form-check-input" value={item}></input>
                        <label key={key} className="form-check-label">{item}</label>
                    </div>
                })}

                <div>支援尺寸:</div>
                {filter_dimension.map((item, key) => {
                    if (item === '') {
                        return;
                    } else {
                        return (
                            <div key={key} className="form-check">
                                <input type="checkbox" className="form-check-input" value={item}></input>
                                <label key={key} className="form-check-label">{item}</label>
                            </div>
                        )
                    }

                })}
            </div>
            <div>
                {showcaseItem}
            </div>

        </div>

    );
}

export default Showcase;