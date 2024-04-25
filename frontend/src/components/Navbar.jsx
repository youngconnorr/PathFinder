import { Link } from "react-router-dom";
import AxiosInstance from "./tools/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  const logoutUser = () => {
    AxiosInstance.post(`logoutall/`, {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
    });
  };

  return (
    <>
      {token ? (
        <button onClick={logoutUser}> Log out</button>
      ) : (
        <div>
          <button>
            {" "}
            <Link to="/login">Log in</Link>
          </button>
          <button>
            {" "}
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
      {/* <button> <Link to="/logout"> Log out</Link></button>
      <button> <Link to="/login">Log in</Link></button>
      <button> <Link to="/register">Register</Link></button> */}
    </>
  );
};

export default Navbar;
