import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './gallery.scss';

const Gallery = () => {
    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(false)
    let [color] = useState("#1E9A4B");

    const getData = async () => {
        const res = await fetch("https://spreadsheets.google.com/feeds/list/1kJl_ioUAK1umhl9oCHF8Oo7u698QdngllHuwerOFpIo/2/public/values?alt=json")
        const data = await res.json()
        setGallery(data.feed.entry)

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

    return (
        <div>
            {!loading ?
                <ClipLoader color={color} size={180}></ClipLoader>
                :
                <div className="row">
                    {gallery.map((value, key) => {

                        return <div className="col-xs-12 col-sm-6 col-md-3 text-center mb-5 align-items-stretch d-flex flex-column align-items-stretch" key={key} >
                            <img src={value.gsx$previmg.$t} alt="pfxrichmedia" className="card-img-top rmThumb" />
                            <div className="card-body text-start">
                                <h5 className="card-title">{value.gsx$tempname.$t}</h5>
                                <div className="card-text">{value.gsx$desc.$t}</div>
                            </div>
                            <div className="card-text mt-auto align-self-start ps-3 pb-2">
                                {
                                    value.gsx$devicepc.$t === "TRUE" ? <i className="fas fa-desktop pc me-3 text-black-50 fs-4"></i> : null
                                }
                                {
                                    value.gsx$devicemobile.$t === "TRUE" ? <i className="fas fa-mobile-alt mobile text-black-50 fs-4"></i> : null
                                }

                            </div>
                            <div className="card-text mt-auto align-self-start ps-3">
                                <a href={value.gsx$demolink.$t} target="_blank" rel="noopener noreferrer">
                                    <button className="btn btn-primary text-white">嘗試範例</button>
                                </a>
                                <button className="btn btn-outline-primary ms-3" data-temp={value.gsx$tempid.$t}>案例參考</button>
                            </div>
                        </div>


                    })}
                </div>
            }
        </div>

    );
}

export default Gallery;