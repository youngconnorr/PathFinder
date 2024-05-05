import { Link } from "react-router-dom";
import { itineraryList } from "./tools/ItineraryList";
import { reviewList } from "./tools/ReviewList";

const Landing = () => {
  return (
    <div>
      <section className="landing-sections section-1">
        <h1 className="website-name">Path Finder</h1>
        <div className="landing-cards">
          <span className="card-landing">
            <h2>Choose</h2>
          </span>
          <span className="card-landing">
            <h2>Generate</h2>
          </span>
          <span className="card-landing">
            <h2>Travel</h2>
          </span>
        </div>
        <span className="register-btn">
          <button>
            <Link to="/register">Start planning</Link>
          </button>
        </span>
      </section>
      <section className="landing-sections section-2">
        <div className="carousel">
          {itineraryList.map((card) => (
            <div key={card.id} className="carousel-cards">
              <img
                src={card.photo}
                alt="photo"
                className="carousel-card-photo"
              />
              <h1>{card.city}</h1>
              <p>{card.country}</p>
              <p>{card.name}</p>
              <p>{card.stars} stars</p>
            </div>
          ))}
        </div>
      </section>
      <section className="landing-sections section-3">
        <div className="reviews">
          {reviewList.map((review) => (
            <div key={review.id} className="review-card">
              <h1 className="review-name">{review.name}</h1>
              <h2 className="review-city">{review.city}</h2>
              <h3 className="review-country">{review.country}</h3>
              <p className="review-content">{review.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
