import React, { useState } from 'react';
import Gallery from './components/gallery/Gallery';
import Showcase from './components/showcase/Showcase';
import './App.scss';
import logo from './img/performics_logo_white.svg';

const App = () => {
  const [showGallery, setshowGallery] = useState(true)
  const [showShowcase, setshowShowcase] = useState(false)

  const renderGallery = () => {
    setshowGallery(true)
    setshowShowcase(false)
  }

  const renderShowcase = () => {
    setshowShowcase(true)
    setshowGallery(false)
  }
  return (
    <div className="container-fluid">

      <header className="header">
        <div className="container-lg">
          <nav className="navbar">
            <img src={logo} className="logo" width="200" alt="logo" />
          </nav>
          <div className="home-title d-flex text-white">
            <div className="align-self-center">
              <div className="fs-3">Rich Media</div>
              <div className="fs-1">創意數位廣告</div>
            </div>

          </div>
        </div>
      </header>

      <div className="container-lg">
        <div>
          <button onClick={renderGallery} className="m-4 btn btn-outline-primary">Rich Media Template</button>
          <button onClick={renderShowcase} className="m-4 btn btn-outline-primary">Showcase</button>
        </div>

        {showGallery ? <Gallery></Gallery> : null}
        {showShowcase ? <Showcase></Showcase> : null}

      </div>

      <footer>
        <div className="container-lg mt-5 mb-3">
          <span className="fs-6 fw-light">© 2019 Performics | Privacy Policy</span>
        </div>
      </footer>
    </div>

  );
}

export default App;