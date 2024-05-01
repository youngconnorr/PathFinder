// Home.jsx
import { useState } from "react";
import { main } from "./tools/AILogic";
import AxiosInstance from "./tools/AxiosInstance";
import cities from "cities.json";

const Home = () => {
  // const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // const [saved, setSaved] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredCities, setFilteredCities] = useState([]);

  const citySet = new Set(cities.map((city) => city.name.toLowerCase()));

  // Update filteredCities based on search term
  // const handleCitySearch = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   setSearchTerm(searchValue);

  //   const filtered = citySet.filter((city) =>
  //     city.name.toLowerCase().includes(searchValue)
  //   );
  //   setFilteredCities(filtered);
  // };

  const createSaved = (e) => {
    e.preventDefault();
    AxiosInstance.post(`saved/`, { content, title });
  };

  const fetchData = async (city, month) => {
    const JSONresponse = await main(city, month);
    setTitle(city);
    setContent(JSON.parse(JSONresponse));
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (citySet.has(city.toLowerCase())) {
      setSubmitted(true);
      setLoading(true);
      fetchData(city, month);
    } else {
      console.log("invalid city");
    }
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
        {/* <div>
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={handleCitySearch}
          />
          <select>
            {filteredCities.map((city) => (
              <option key={city.name}>{city.name}</option>
            ))}
          </select>
        </div> */}
        <label>Location: </label>
        <input
          type="text"
          placeholder="Where are you travelling to"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
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

export default Home;
