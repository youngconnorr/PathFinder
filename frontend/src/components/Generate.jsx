import { useState } from "react";
import { main } from "./tools/AILogic";
import AxiosInstance from "./tools/AxiosInstance";
import CitySelector from "./tools/CitySelector";
import DateSelector from "./tools/DateSelector";
import GuestsNumber from "./tools/GuestsNumber";
import BudgetNumber from "./tools/BudgetNumber";

const Generate = () => {
  //dynamic states of page
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [showChosenCity, setShowChosenCity] = useState(false);

  //user inputs to give to AI
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [adultNum, setAdultNum] = useState(0);
  const [childNum, setChildNum] = useState(0);
  const [infantNum, setInfantNum] = useState(0);
  const [petNum, setPetNum] = useState(0);
  const [dollarNum, setDollarNum] = useState("");
  const [budget, setBudget] = useState("");

  //data stored
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedCity === "" ||
      (petNum !== 0 && childNum === 0 && adultNum === 0 && infantNum === 0)
    ) {
      console.log("fill out human categories or missing chosen city");
    } else {
      setSubmitted(true);
      setLoading(true);
      fetchData(
        selectedCity,
        selectedMonth,
        adultNum,
        childNum,
        infantNum,
        petNum,
        budget,
        dollarNum
      );
    }
  };

  const createSaved = (e) => {
    e.preventDefault();
    AxiosInstance.post(`saved/`, { content, title });
  };

  const handleCityChange = (city) => {
    console.log(city);
    setSelectedCity(city);
  };

  const handleMonthChange = (month) => {
    console.log(month.getMonth() + 1);
    setSelectedMonth(month.getMonth() + 1);
  };

  const handleGuestNumber = (adults, children, infants, pets) => {
    console.log(adults, children, infants, pets);
    setAdultNum(adults);
    setChildNum(children);
    setInfantNum(infants);
    setPetNum(pets);
  };

  const handleBudget = (budget) => {
    if (budget === "0-20$") {
      setDollarNum("$");
    } else if (budget === "20-40$") {
      setDollarNum("$$");
    } else if (budget === "40$+") {
      setDollarNum("$$$");
    }
    setBudget(budget);
  };

  const fetchData = async (
    city,
    month,
    adults,
    children,
    infants,
    pets,
    budget,
    dollar
  ) => {
    const JSONresponse = await main(
      city,
      month,
      adults,
      children,
      infants,
      pets,
      budget,
      dollar
    );
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
      <form onSubmit={handleSubmit} className="AI-form">
        <CitySelector onInputChange={handleCityChange} />
        <div className="calendar">
          <DateSelector datePicked={handleMonthChange} />
        </div>
        <div className="guest-picker">
          <GuestsNumber guestsNumber={handleGuestNumber} />
        </div>
        <div className="budget-chooser">
          <BudgetNumber chosenBudget={handleBudget} />
        </div>

        <button type="submit" className="submit-ai">
          Submit
        </button>
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
