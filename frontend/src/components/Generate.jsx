import { useState } from "react";
import { main } from "./tools/AILogic";
import AxiosInstance from "./tools/AxiosInstance";
import CitySelector from "./tools/CitySelector";

const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    fetchData(selectedCity, month);
  };

  const createSaved = (e) => {
    e.preventDefault();
    AxiosInstance.post(`saved/`, { content, title });
  };

  const handleCityChange = (city) => {
    console.log(city);
    setSelectedCity(city);
  };

  const fetchData = async (city, month) => {
    const JSONresponse = await main(city, month);
    setTitle(city);
    setContent(JSON.parse(JSONresponse));
    setLoading(false);
  };

  const restaurantList = content.restaurants;
  const clothingList = content.clothing;
  const visitsList = content.visits;

  const formatAIOutput = (jsonList) => {
    return jsonList.map((e, index) => <li key={index}>{e}</li>);
  };

  return (
    <div className="home-page">
      <form onSubmit={handleSubmit}>
        <CitySelector onInputChange={handleCityChange} />
        <label>Month: </label>
        <input
          type="text"
          placeholder="What month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {submitted ? (
        <div>
          {loading ? (
            <p>loading...</p>
          ) : (
            <div>
              <button onClick={createSaved}>Save note!</button>
              <div className="ai-response">
                <span className="ai-cards">
                  <p>Restaurants: </p>
                  <p>{formatAIOutput(restaurantList)}</p>
                </span>

                <span className="ai-cards">
                  <p>Clothes to bring:</p>
                  <p>{formatAIOutput(clothingList)}</p>
                </span>

                <span className="ai-cards">
                  <p>Places to visit:</p>
                  <p>{formatAIOutput(visitsList)}</p>
                </span>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Generate;
