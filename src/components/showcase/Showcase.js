import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

import './showcase.scss';



const Showcase = () => {
    const [showcaseList, setshowcaseList] = useState([])
    let [loading, setLoading] = useState(false)
    let [color] = useState("#1E9A4B")

    let filter_dimension = [];
    let filter_platform = [];
    let filter_device = [];
    let filter_brand = [];
    let filter_list = [];

    const getData = async () => {
        const res = await fetch("https://spreadsheets.google.com/feeds/list/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/2/public/values?alt=json")
        const data = await res.json()
        setshowcaseList(data.feed.entry)
    }

    const filterDataArr = () => {
        for (var i = 0; i < showcaseList.length; i++) {
            filter_platform.push(showcaseList[i].gsx$platform.$t)
            let arrPlatformString = filter_platform.toString()
            let arrPlatform = arrPlatformString.split(",");
            filter_platform = arrPlatform.filter((v, i, a) => a.indexOf(v) === i);

            filter_device.push(showcaseList[i].gsx$device.$t)
            let arrDeviceString = filter_device.toString()
            let arrDevice = arrDeviceString.split(",");
            filter_device = arrDevice.filter((v, i, a) => a.indexOf(v) === i);

            filter_brand.push(showcaseList[i].gsx$brand.$t);
            filter_brand = filter_brand.filter((v, i, a) => a.indexOf(v) === i);

            filter_dimension.push(showcaseList[i].gsx$dimension.$t)
            let arrDimenString = filter_dimension.toString()
            let arrDimen = arrDimenString.split(",");
            filter_dimension = arrDimen.filter((v, i, a) => a.indexOf(v) === i);
        }
    }

    useEffect(() => {
        let mounted = true
        if (mounted) {
            getData()
            setLoading(true)
        }
        return function cleanup() {
            mounted = false
        }

    }, [])

    filterDataArr()

    const displayRelatedContainer = () => {
        const containers = document.querySelectorAll('div[name="data_container"]');
        let classes = '\\b(' + filter_list.join('|') + ')\\b', dimenRegex = new RegExp(classes, 'i');
        containers.forEach(eContainer => {
            let elClasses = ' ' + eContainer.getAttribute('class').replace(/\s+/, ' ') + ' ';
            let iBrand = eContainer.getAttribute('banner-brand');
            if (filter_list.length > 0) {
                if (dimenRegex.test(elClasses) || filter_list.indexOf(iBrand) > -1) {
                    eContainer.style.display = "block";
                } else {
                    eContainer.style.display = "none";
                }
            } else {
                eContainer.style.display = "block";
            }

        })

    }

    const toggle = (e) => {
        const target = e.target;
        const value = e.target.value;
        if (target.checked) {
            filter_list.push(value);
            displayRelatedContainer()
        } else {
            for (var i = 0; i < filter_list.length; i++) {
                if (filter_list[i] === value) {
                    filter_list.splice(i, 1);
                }
            }
            displayRelatedContainer()
        }
    }

    return (
        <div>
            {!loading ?
                < ClipLoader color={color} size={180}></ClipLoader>
                :
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <span>Filter by: </span>
                            <div className="row filter_cat">
                                <div className="col-md-2">支援行動設備:</div>
                                <div className="col-md-10">
                                    {filter_device.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={toggle} type="checkbox" className="form-check-input" id={item} value={item}></input>
                                            <label htmlFor={item} className="form-check-label">{item}</label>
                                        </div>
                                    })}
                                </div>

                            </div>
                            <div className="row filter_cat">
                                <div className="col-md-2">支援投遞平台:</div>
                                <div className="col-md-10">
                                    {filter_platform.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={toggle} type="checkbox" className="form-check-input" id={item} value={item}></input>
                                            <label htmlFor={item} className="form-check-label">{item}</label>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="row filter_cat">
                                <div className="col-md-2">品牌:</div>
                                <div className="col-md-10">
                                    {filter_brand.map((item, key) => {
                                        return <div key={key} className="form-check">
                                            <input onChange={toggle} type="checkbox" className="form-check-input" id={item} value={item}></input>
                                            <label htmlFor={item} className="form-check-label">{item}</label>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="row filter_cat">
                                <div className="col-md-2">支援尺寸:</div>
                                <div className="col-md-10">
                                    {filter_dimension.map((item, key) => {
                                        if (item === '') {
                                            return null;
                                        } else {
                                            return (
                                                <div key={key} className="form-check">
                                                    <input type="checkbox" onChange={toggle} className="form-check-input" id={item} value={item}></input>
                                                    <label htmlFor={item} className="form-check-label">{item}</label>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {
                            showcaseList.map((item, key) => {
                                let dimension = item.gsx$dimension.$t.replace(/,/g, ' ');
                                let device = item.gsx$device.$t.replace(/,/g, ' ');
                                let platform = item.gsx$platform.$t.replace(/,/g, ' ');

                                return (
                                    <div key={key} name="data_container" className={dimension + " " + device + " " + platform + " " + item.gsx$tempid.$t + "col-xs-12 col-sm-6 col-md-3"} banner-brand={item.gsx$brand.$t}>
                                        <div className="card-body">
                                            <img src={item.gsx$previewimg.$t} alt={item.gsx$brand.$t} />
                                            <h5 className='template_name card-title'>{item.gsx$brand.$t}</h5>
                                            <div className="card-text">{item.gsx$desc.$t}</div >
                                            <button className="btn-outline-primary">閱讀更多</button>
                                        </div>

                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            }
        </div >

    );
}

export default Showcase;