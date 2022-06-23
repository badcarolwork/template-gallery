import logo from "../../img/performics_logo_white.svg";
import "./sidebar.scss";
import { Link } from "react-router-dom";

function CustomLink({ to, children, ...props }) {
  var pathname = window.location.pathname;

  if (pathname === "/") {
    pathname = "/gallery";
  }

  return (
    <li className={pathname === to ? "active" : ""} onClick={handleSelected}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

function handleSelected(e) {
  //reset
  var menus = document.querySelectorAll("li");
  for (let i = 0; i < menus.length; i++) {
    menus[i].classList.remove("active");
  }

  //   console.log(e.target.parentNode);
  e.target.parentNode.classList.add("active");
}

const Siderbar = () => {
  return (
    <nav id="sidebar" className="sidebar">
      <div className="sidebar-content js-simplebar">
        <div className="navbar mb-4">
          <img src={logo} className="logo" width="170" alt="logo" />
        </div>

        <div className="home-title d-flex text-white">
          <div className="align-self-center">
            <div className="mb-4">Interactive Ad Gallery</div>
          </div>
        </div>

        <ul id="nav-group">
          <CustomLink to="/gallery">
            互動廣告 <br />
            Intreactive Display Ad
          </CustomLink>
          <CustomLink to="/comingsoon">
            互動影音廣告 <br />
            Interactive Video Ad
          </CustomLink>
          <CustomLink to="/comingsoon">
            廣告案例演示 <br />
            Showcase
          </CustomLink>

          <CustomLink to="/comingsoon">
            關於我們
            <br />
            Our Service
          </CustomLink>
        </ul>
        <footer>
          <span className="fw-light">© Performics Taiwan | Privacy Policy</span>
        </footer>
      </div>
    </nav>
  );
};

export default Siderbar;
