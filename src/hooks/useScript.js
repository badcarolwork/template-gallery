import { useEffect } from "react";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    // script.async = true;
    script.setAttribute("defer", "");
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [url]);
};

export default useScript;
