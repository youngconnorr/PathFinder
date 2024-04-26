import { Link } from "react-router-dom";
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
    <navbar className="navbar">
      {token ? (
        <div>
          <button>
            <Link to="/home">Home</Link>
          </button>
          <button onClick={logoutUser}> Log out</button>
          {isProfile ? (
            <div></div>
          ) : (
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
          <button>
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
    </navbar>
  );
};

export default Navbar;
