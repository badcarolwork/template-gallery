import React from "react";
import { Route, Routes } from "react-router-dom";
import Gallery from "./pages/gallery/Gallery";
import Showcase from "./pages/showcase/Showcase";
import About from "./pages/About";
import Sidebar from "./components/sideBar/sidebar";
import "./App.scss";
import ComingSoon from "./pages/comingSoon";

const App = () => {
  return (
    <main>
      <Sidebar />
      <div className="main content-right">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/about" element={<About />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
