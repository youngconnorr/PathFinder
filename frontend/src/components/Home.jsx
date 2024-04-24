// Home.jsx
import { useState } from 'react';
import { main } from './AILogic';


const Home = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [month, setMonth] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fetchData = async (city, month) => {
    const response = await main(city, month);
    const parsedResponse = JSON.parse(response);
    setLoading(false)
    setResponse(parsedResponse);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setLoading(true)
    fetchData(city, month);
  }

  const handleChange1 = (input) => {
    setCity(input.target.value)
  }

  const handleChange2 = (input) => {
    setMonth(input.target.value)
  }

  const restaurantList = response.restaurants;
  const clothingList = response.clothing;
  const visitsList = response.visits;

  const formatAIOutput = (jsonList) => {
    return (
      jsonList.map((e, index) => <li key={index}>{e}</li>)
    )
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Location: </label>
        <input
          type="text"
          placeholder="Where are you travelling to"
          value={city}
          onChange={handleChange1}
        />
        <label>Month: </label>
        <input
          type="text"
          placeholder="Where are you travelling to"
          value={month}
          onChange={handleChange2}
        />
        <button type="submit">Submit</button>
      </form>

      {submitted ?

        <div>

          {loading ?

            <p>loading...</p>

            :

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

          }

        </div>
        :

        null}

    </div>
  );
};

export default Home;
