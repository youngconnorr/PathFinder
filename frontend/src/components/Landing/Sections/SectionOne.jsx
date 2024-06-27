import { Link } from "react-router-dom";
import Generate from "../../AI/Generate";
import { useNavigate } from "react-router-dom";

export const SectionOne = () => {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  return (
    <section className="section-1">
      <div className="website-tagline">
        <h1>CHART YOUR COURSE FROM</h1>
        <h1>DREAMS TO DESTINATIONS</h1>
        <p style={{ marginTop: "10px" }}>
          Personalized travel itinerary made easy
        </p>
      </div>
      {token ? (
        <button
          className="create-now-btn"
          onClick={() => navigate("/generate")}
        >
          <Link to="/generate">Create now</Link>
          <p>&gt;</p>
        </button>
      ) : (
        <div className="landing-page-generate">
          <Generate />
        </div>
      )}
    </section>
  );
};
