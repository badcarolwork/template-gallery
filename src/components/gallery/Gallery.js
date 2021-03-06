import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './gallery.scss';

const Gallery = () => {
    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(false)
    let [color] = useState("#1E9A4B");

    const getData = async () => {
        const res = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/values/gallery?alt=json&key=AIzaSyC6riffq-yddKscOzVdDN1ZcCztvm5xUI0")

        if (res.ok) {
            const data = await res.json()
            filterDataGallery(data)
            setLoading(true)
        } else {
            console.log("error handling thinking how to do")
            setLoading(false)
            setTimeout(getData, 1000);
        }
    }

    const filterDataGallery = (getdata) => {
        let keys = getdata.values[0]
        let newData = getdata.values.slice(1, getdata.values.length);

        let formatted = [],
            data = newData,
            cols = keys,
            l = cols.length;
        for (var i = 0; i < data.length; i++) {
            var d = data[i],
                o = {};
            for (var j = 0; j < l; j++)
                o[cols[j]] = d[j];
            formatted.push(o);
        }
        setGallery(formatted)

    }

    useEffect(() => {
        let mounted = true
        if (mounted) {
            getData()
        }
        return function cleanup() {
            mounted = false
        }

    }, [])

    return (
        <div>
            {!loading ?
                <ClipLoader color={color} size={180}></ClipLoader>
                :
                <div className="row">
                    {gallery.map((value, key) => {

                        return <div className="col-xs-12 col-sm-6 col-md-3 text-center mb-5 align-items-stretch d-flex flex-column align-items-stretch" key={key} >
                            <img src={value.previmg} alt="pfxrichmedia" className="card-img-top rmThumb" loading="lazy" />
                            <div className="card-body text-start">
                                <h5 className="card-title">{value.tempname}</h5>
                                <div className="card-text">{value.desc}</div>
                            </div>
                            <div className="card-text mt-auto align-self-start ps-3 pb-2">
                                {
                                    value.devicepc === "TRUE" ? <i className="fas fa-desktop pc me-3 text-black-50 fs-4"></i> : null
                                }
                                {
                                    value.devicemobile === "TRUE" ? <i className="fas fa-mobile-alt mobile text-black-50 fs-4"></i> : null
                                }

                            </div>
                            <div className="card-text mt-auto align-self-start ps-3">
                                <a href={value.demolink} target="_blank" rel="noopener noreferrer">
                                    <button className="btn btn-primary text-white">????????????</button>
                                </a>
                                <button className="btn btn-outline-primary ms-3" data-temp={value.tempid}>????????????</button>
                            </div>
                        </div>


                    })}
                </div>
            }
        </div>

    );
}

export default Gallery;