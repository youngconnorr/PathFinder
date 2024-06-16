import { Link } from "react-router-dom";
import Generate from "../../AI/Generate";

export const LandSectOne = () => {
  const token = localStorage.getItem("Token");
  return (
    <section className="landing-sections section-1">
      <div className="website-tagline">
        <h1>CHART YOUR COURSE FROM</h1>
        <h1>DREAMS TO DESTINATIONS</h1>
        <p style={{ marginTop: "10px" }}>
          Personalized travel itinerary made easy
        </p>
        {token ? (
          <button className="create-now-btn">
            <Link to="/generate">Create now</Link>
          </button>
        ) : (
          <div className="landing-page-generate">
            <Generate />
          </div>
        )}
      </div>
    </section>
  );
};
