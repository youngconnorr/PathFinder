import { itineraryList } from "../Json/ItineraryList";

export const SectionTwo = () => {
  const starCount = (stars) => {
    let starList = [];
    for (let i = 0; i < stars; i++) {
      starList.push(<p key={i}>⭐</p>);
    }

    return starList;
  };

  return (
    <section className="section-2">
      <section className="carousel-section">
        <div className="carousel-headline">
          <div className="carousel-title">
            <h1>Get</h1>
            <h1> Inspired</h1>
          </div>
          <h3>Trips from fellow travellers</h3>
        </div>
        <div className="carousel-div">
          <div className="carousel">
            {itineraryList.map((card) => (
              <div key={card.id} className="carousel-cards">
                {/* <img
                  src={card.photo}
                  alt="photo"
                  className="carousel-card-photo"
                /> */}
                <h2>{card.city}</h2>
                <p>{card.country}</p>
                <p>{card.name}</p>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>{starCount(card.stars)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel">
            {itineraryList.map((card) => (
              <div key={card.id} className="carousel-cards">
                {/* <img
                  src={card.photo}
                  alt="photo"
                  className="carousel-card-photo"
                /> */}
                <div className="carousel-writing">
                  <h2>{card.city}</h2>
                  <p>{card.country}</p>
                  <p>{card.name}</p>
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      {starCount(card.stars)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
