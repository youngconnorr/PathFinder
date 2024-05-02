import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
/* eslint-disable react/prop-types */

const CitySelector = ({ onInputChange }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    onInputChange(currentCity);
  }, [currentCity, onInputChange]);

  const handleCountryInput = (inputtedCountry) => {
    setCurrentCountry(inputtedCountry);

    const filteredStates = State.getStatesOfCountry(inputtedCountry);
    setStates(filteredStates);
  };

  const handleStateInput = (inputtedState) => {
    const filteredCities = City.getCitiesOfState(currentCountry, inputtedState);
    setCities(filteredCities);

    if (filteredCities.length === 0) {
      const stateName = State.getStateByCodeAndCountry(
        inputtedState,
        currentCountry
      );
      console.log(stateName.name);
      console.log("this is the state name:" + stateName.name);
      setCurrentCity(stateName.name);
    }
  };

  return (
    <div>
      <label htmlFor="country">Country:</label>
      <select onChange={(e) => handleCountryInput(e.target.value)}>
        <option value="">Select a Country:</option>

        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
      {states.length === 0 ? null : (
        <div>
          <label htmlFor="state">State:</label>
          <select onChange={(e) => handleStateInput(e.target.value)}>
            <option value="">Select a State:</option>

            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {cities.length === 0 ? null : (
        <div>
          <label htmlFor="city">city:</label>
          <select onChange={(e) => setCurrentCity(e.target.value)}>
            <option value="">Select a city:</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
