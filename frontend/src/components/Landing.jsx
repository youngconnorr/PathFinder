import { Link } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const [value, setValue] = useState("fruit");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
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
