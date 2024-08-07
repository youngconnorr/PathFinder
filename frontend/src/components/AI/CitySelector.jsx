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
      setCurrentCity(stateName.name);
    }
  };

  return (
    <div className="location">
      <label htmlFor="country">Location </label>
      <select
        onChange={(e) => handleCountryInput(e.target.value)}
        className="select-box"
      >
        <option value="">Type in Country:</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
      {states.length === 0 ? null : (
        <div>
          <label htmlFor="state">Region </label>
          <select onChange={(e) => handleStateInput(e.target.value)}>
            <option value="">Type in Region:</option>

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
          <label htmlFor="city">City </label>
          <select onChange={(e) => setCurrentCity(e.target.value)}>
            <option value="">Type in City:</option>
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
