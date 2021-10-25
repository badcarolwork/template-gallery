import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Gallery from "./pages/gallery/Gallery";
import Showcase from "./pages/showcase/Showcase";
import "./App.scss";
import logo from "./img/performics_logo_white.svg";

const App = () => {
  const [showGallery, setshowGallery] = useState(true);
  const [showShowcase, setshowShowcase] = useState(false);

  const renderGallery = () => {
    setshowGallery(true);
    setshowShowcase(false);
  };

  const renderShowcase = () => {
    setshowShowcase(true);
    setshowGallery(false);
  };

  return (
    <main>
      <nav id="sidebar" className="sidebar">
        <div className="sidebar-content js-simplebar">
          <div className="navbar mb-4">
            <img src={logo} className="logo" width="170" alt="logo" />
          </div>
          <div className="home-title d-flex text-white">
            <div className="align-self-center">
              <div className="fs-3">創意數位廣告</div>
              <div className="fs-5">Rich Media Gallery</div>
            </div>
          </div>

          <div id="nav-group">
            <button onClick={renderGallery} className="active">
              互動廣告 <br />
              Intreactive Display Ad
            </button>
            <button onClick={renderShowcase} className="">
              互動影音廣告 <br />
              Interactive Video Ad
            </button>
            <button onClick={renderShowcase} className="">
              廣告案例演示 <br />
              Showcase
            </button>
            <a href="/adDemoPage/adhesion/ad.html">Sticky Ad Demo</a>
          </div>
          <footer>
            <span className="fw-light">© 2019 Performics | Privacy Policy</span>
          </footer>
        </div>
      </nav>

      <div className="main content-right">
        {showGallery ? <Gallery></Gallery> : null}
        {showShowcase ? <Showcase></Showcase> : null}
      </div>
    </main>
  );
};

export default App;
