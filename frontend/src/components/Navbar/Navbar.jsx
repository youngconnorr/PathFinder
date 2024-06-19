import { Link } from "react-router-dom";
// import AxiosInstance from "./tools/AxiosInstance";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("Token");
  // const navigate = useNavigate();
  const location = useLocation();

  const transparentNav = ["/", "/login", "/register", "/profile", "/generate"];
  const isNotLanding = !transparentNav.includes(location.pathname);
  const isProfile = location.pathname === "/profile";

  return (
    <div
      className={`
        ${isNotLanding ? "navbar-not-landing" : "navbar-absolute"}
        ${isProfile ? "black" : ""}`}
    >
      {token ? (
        <>
          <div>
            <button>
              <Link to="/">PathFinder</Link>
            </button>
          </div>
          <div>
            <button>
              <Link to="/generate">Generate</Link>
            </button>
            <button>
              <Link to="/about">About Us</Link>
            </button>
            <button>
              <Link to="/profile">Profile</Link>
            </button>
          </div>
        </>
      ) : (
        <div className="nav-no-account-buttons">
          <div>
            <button>
              <Link to="/">
                <b>PathFinder</b>
              </Link>
            </button>
          </div>
          <div>
            <button>
              <Link to="/about">About Us</Link>
            </button>
            <button>
              <Link to="/login">Log in</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
