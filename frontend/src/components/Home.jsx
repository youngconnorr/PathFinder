// Home.jsx
import { useState, useEffect } from "react";
import { main } from "./AILogic";
import AxiosInstance from "./AxiosInstance";

const Home = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [saved, setSaved] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getSaved();
  }, []);

  const getSaved = () => {
    setTitle(city);
    setContent(response);
    AxiosInstance.get(`saved/`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteSaved = (id) => {
    AxiosInstance.delete(`saved/${id}/delete`)
      .then((res) => {
        if (res.status === 204) {
          alert("Saved deleted!");
        } else {
          alert("Failed to delete");
        }
        getSaved();
      })
      .catch((error) => alert(error));
  };

  const createSaved = (e) => {
    e.preventDefault();
    AxiosInstance.post(`saved/`, { content, title }).then((res) => {
      if (res.status === 201) {
        alert("Saved!");
      } else {
        alert("Failed to save");
      }
      getSaved(); // Move getSaved() inside .then() to ensure it's called after the post request is successful
    });
  };

  const fetchData = async (city, month) => {
    const response = await main(city, month);
    const parsedResponse = JSON.parse(response);
    setLoading(false);
    setResponse(parsedResponse);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    fetchData(city, month);
  };

  const restaurantList = response.restaurants;
  const clothingList = response.clothing;
  const visitsList = response.visits;

  const formatAIOutput = (jsonList) => {
    return jsonList.map((e, index) => <li key={index}>{e}</li>);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
              <button onClick={createSaved}> Save note!</button>
              <div className="ai-response">
                <span className="ai-cards">
                  <p>Restaurants: </p>
                  <p className>{formatAIOutput(restaurantList)}</p>
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
