import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Gallery from "./pages/gallery/Gallery";
import Sidebar from "./components/sideBar/sidebar";
import AdFilters from "./pages/adFilter/AdFilters";
import InStream from "./pages/instream/Instream";

const App = () => {
  const [isMobileWidth, setMobileWidth] = useState(false);

  const handleWindowSizeChange = () => {
    // console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      setMobileWidth(true);
      document.getElementById("sidebar").classList.add("collapse");
      document.getElementById("sidebar").classList.remove("expand");
    } else {
      setMobileWidth(false);
      document.getElementById("sidebar").classList.add("expand");
      document.getElementById("sidebar").classList.remove("collapse");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <main className={isMobileWidth ? "mobile-view" : ""}>
      <Sidebar />
      <div className="main content-right">
        <Routes>
          <Route path="" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/adfilter" element={<AdFilters />} />
          <Route path="/instream" element={<InStream />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
