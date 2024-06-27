import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const token = localStorage.getItem("Token");
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const transparentNav = ["/", "/login", "/register", "/profile", "/generate"];
  const isNotLanding = !transparentNav.includes(location.pathname);
  const isProfile = location.pathname === "/profile";

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div
      className={`
      ${isNotLanding ? "navbar-not-landing" : "navbar-absolute"}
      ${isProfile ? "black" : ""}`}
    >
      <div
        className={`
        ${isNotLanding ? "navbar-not-landing" : "navbar-absolute"}
        ${isProfile ? "black" : ""} not-collapsed`}
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
      <section
        className={`
        ${isNotLanding ? "navbar-not-landing" : "navbar-absolute"}
        ${isProfile ? "black" : ""} collapsed`}
      >
        <div>
          <button>
            <Link to="/" className="navbar-black">
              PathFinder
            </Link>
          </button>
        </div>
        {drawerOpen ? (
          <>
            {token ? (
              <>
                <button>
                  <Link to="/generate" className="navbar-black">
                    Generate
                  </Link>
                </button>
                <button>
                  <Link to="/about" className="navbar-black">
                    About Us
                  </Link>
                </button>
                <button>
                  <Link to="/profile" className="navbar-black">
                    Profile
                  </Link>
                </button>
              </>
            ) : (
              <>
                <button>
                  <Link to="/about" className="navbar-black">
                    About Us
                  </Link>
                </button>
                <button>
                  <Link to="/login" className="navbar-black">
                    Log in
                  </Link>
                </button>
              </>
            )}
          </>
        ) : null}
        <button className="drawer-toggle navbar-black" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </section>
    </div>
  );
};

export default Navbar;
