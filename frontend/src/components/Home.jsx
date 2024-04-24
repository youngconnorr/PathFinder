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

            <div>

              <p>Restaurants: </p>
              <p>{response.restaurants}</p>

              <p>Clothes to bring:</p>
              <p>{response.clothing}</p>

              <p>Places to visit:</p>
              <p>{response.visits}</p>

            </div>

          }

        </div>
        :

        null}

    </div>
  );
};

export default Home;
