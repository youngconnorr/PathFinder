import { Link } from "react-router-dom";

const Landing = () => {
  // const token = localStorage.getItem("Token");

  return (
    <div>
      <h1>Path Finder</h1>
      <span className="landing-card">
        <h2>Choose</h2>
      </span>
      <span className="landing-card">
        <h2>Generate</h2>
      </span>
      <span className="landing-card">
        <h2>Travel</h2>
      </span>
      {/* {token ? null : (
        <span>
          <button>Create account</button>
        </span>
      )} */}
      <span>
        <button>
          <Link to="/register">Start planning</Link>
        </button>
      </span>
    </div>
  );
};

export default Landing;
