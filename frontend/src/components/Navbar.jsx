import { Link, useRouteLoaderData } from "react-router-dom";
import AxiosInstance from "./tools/AxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const location = useLocation();

  const isProfile = location.pathname === "/profile";

  const logoutUser = () => {
    AxiosInstance.post(`logoutall/`, {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
    });
  };

  return (
    <div className="navbar">
      {token ? (
        <div>
          <button>
            <Link to="/">Path Finder</Link>
          </button>
          <button>
            <Link to="/generate">Generate</Link>
          </button>
          <button onClick={logoutUser}> Log out</button>
          {isProfile ? null : (
            <button>
              <Link to="/profile">Profile</Link>
            </button>
          )}
        </div>
      ) : (
        <div>
          <button>
            <Link to="/login">Log in</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
