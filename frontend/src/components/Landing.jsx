// import { Link } from "react-router-dom";
import { itineraryList } from "./tools/ItineraryList";
import { reviewList } from "./tools/ReviewList";
import Generate from "./Generate";
import { useState } from "react";

const Landing = () => {
  const token = localStorage.getItem("Token");
  const [currRatingIndex, setCurrRatingIndex] = useState(0);

  const nextRating = () => {
    setCurrRatingIndex((currIndex) =>
      currIndex === reviewList.length - 1 ? 0 : currIndex + 1
    );
    console.log("PLEASE");
  };

  const prevRating = () => {
    setCurrRatingIndex((currIndex) =>
      currIndex === 0 ? reviewList.length - 1 : currIndex - 1
    );
  };

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 1) {
      // Add sticky class after scrolling 50px
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });

  return (
    <div>
      <section className="landing-sections section-1">
        <div className="website-tagline">
          <h1 className="">CHART YOUR COURSE FROM</h1>
          <h1 className="">DREAMS TO DESTINATIONS</h1>
          {token ? null : (
            <div className="landing-page-generate">
              <Generate />
            </div>
          )}
        </div>
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
          {reviewList.map((review, index) => (
            <div
              key={review.id}
              className={`review-card ${
                currRatingIndex === index ? "active" : "hidden"
              }`}
            >
              <h1 className="review-name">{review.name}</h1>
              <h2 className="review-city">{review.city}</h2>
              <h3 className="review-country">{review.country}</h3>
              <p className="review-content">{review.content}</p>
            </div>
          ))}
        </div>
        <button onClick={prevRating}>back</button>
        <button onClick={nextRating}>forward</button>
      </section>
    </div>
  );
};

export default Landing;
