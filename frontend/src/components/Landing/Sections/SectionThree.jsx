import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { reviewList } from "../Json/ReviewList";

export const SectionThree = () => {
  const [currRatingIndex, setCurrRatingIndex] = useState(0);

  const nextRating = () => {
    setCurrRatingIndex((currIndex) =>
      currIndex === reviewList.length - 1 ? 0 : currIndex + 1
    );
  };

  const prevRating = () => {
    setCurrRatingIndex((currIndex) =>
      currIndex === 0 ? reviewList.length - 1 : currIndex - 1
    );
  };

  return (
    <section className="section-3">
      <div className="reviews-title-div">
        <h1 className="reviews-title">Hear from </h1>
        <h1 className="reviews-title">Our community</h1>
      </div>
      <div className="reviews">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={prevRating}
          className="review-back-btn"
        />
        <div>
          {reviewList.map((review, index) => (
            <div
              key={review.id}
              className={`review-card  img-fade ${
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
        <FontAwesomeIcon icon={faArrowRight} onClick={nextRating} size="lg" />
      </div>
    </section>
  );
};
