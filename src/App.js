import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Gallery from "./pages/gallery/Gallery";
import Showcase from "./pages/showcase/Showcase";
import About from "./pages/About";
import Sidebar from "./components/sideBar/sidebar";
import "./App.scss";
import ComingSoon from "./pages/comingSoon";

const App = () => {
  const [isMobileWidth, setMobileWidth] = useState(false);

  const handleWindowSizeChange = () => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      setMobileWidth(true);
      document.getElementById("sidebar").classList.add("collapse");
    } else {
      setMobileWidth(false);
      document.getElementById("sidebar").classList.add("expand");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <main className={isMobileWidth ? "mobile-view" : ""}>
      <Sidebar />
      <div className="main content-right">
        <Routes>
          <Route path="/" className="active" element={<Gallery />} />
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
