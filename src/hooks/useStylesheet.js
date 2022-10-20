import { useEffect } from "react";

const useStylesheet = (url) => {
  useEffect(() => {
    const csslink = document.createElement("link");
    csslink.setAttribute("rel", "stylesheet");
    csslink.setAttribute("type", "text/css");
    csslink.setAttribute("href", url);
    document.head.appendChild(csslink);
    return () => {
      document.head.removeChild(csslink);
    };
  }, [url]);
};

export default useStylesheet;
