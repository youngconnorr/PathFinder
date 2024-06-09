import { useState } from "react";
import { main } from "./tools/AILogic";
import { Link } from "react-router-dom";
import AxiosInstance from "./tools/AxiosInstance";
import CitySelector from "./tools/CitySelector";
import DateSelector from "./tools/DateSelector";
import GuestsNumber from "./tools/GuestsNumber";
import BudgetNumber from "./tools/BudgetNumber";
// import MapsTool from "./tools/GoogleMaps";

const Generate = () => {
  const token = localStorage.getItem("Token");
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
  const [content, setContent] = useState({
    restaurants: [],
    lodging: [],
    malls: [],
    places: [],
  });
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedCity === "" ||
      (petNum == 0 && childNum === 0 && adultNum === 0 && infantNum === 0) ||
      (petNum != 0 && childNum === 0 && adultNum === 0 && infantNum === 0)
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
    console.log(month);
    setSelectedMonth(month);
  };

  const handleGuestNumber = (adults, children, infants, pets) => {
    console.log(adults, children, infants, pets);
    setAdultNum(adults);
    setChildNum(children);
    setInfantNum(infants);
    setPetNum(pets);
  };

  const jsonChecker = async (json) => {
    try {
      const parsedJson = await JSON.parse(json);
      console.log("It's a good parse!");
      setContent(parsedJson); // Call setContent only after successful parsing
    } catch (e) {
      setLoading(false);
      alert("There was a generation error, please retry"); // Optional alert
      console.log("GENERATION ERROR!! PLEASE TRY AGAIN");
    }
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
    jsonChecker(JSONresponse);
    setContent(jsonChecker(JSONresponse));
    console.log(content);
    setLoading(false);
  };

  const restaurantList = content.restaurants;
  const lodgingList = content.lodging;
  const mallList = content.malls;
  const placesList = content.places;

  const formatAIOutput = (jsonList) => {
    if (jsonList) {
      return jsonList.map((list, index) => (
        <div key={index}>
          <strong>{list[0]}</strong>
          <div>{list[1]}</div>
        </div>
      ));
    } else {
      console.log(jsonList, "was empty!!!!");
    }
  };

  return (
    <>
      <div className="generate-section">
        <form onSubmit={handleSubmit} className="AI-form">
          <CitySelector onInputChange={handleCityChange} />
          <div className="calendar form-item">
            <DateSelector datePicked={handleMonthChange} />
          </div>
          <div className="guest-picker form-item">
            <GuestsNumber guestsNumber={handleGuestNumber} />
          </div>
          <div className="budget-chooser form-item">
            <BudgetNumber chosenBudget={handleBudget} />
          </div>

          {token ? (
            <button type="submit" className="submit-ai">
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="submit-ai form-item"
              style={{ border: "none" }}
            >
              <Link to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                >
                  <path d="M 7 4 C 5.3545455 4 4 5.3545455 4 7 L 4 43 C 4 44.645455 5.3545455 46 7 46 L 43 46 C 44.645455 46 46 44.645455 46 43 L 46 7 C 46 5.3545455 44.645455 4 43 4 L 7 4 z M 7 6 L 43 6 C 43.554545 6 44 6.4454545 44 7 L 44 43 C 44 43.554545 43.554545 44 43 44 L 7 44 C 6.4454545 44 6 43.554545 6 43 L 6 7 C 6 6.4454545 6.4454545 6 7 6 z M 22.5 13 C 17.26514 13 13 17.26514 13 22.5 C 13 27.73486 17.26514 32 22.5 32 C 24.758219 32 26.832076 31.201761 28.464844 29.878906 L 36.292969 37.707031 L 37.707031 36.292969 L 29.878906 28.464844 C 31.201761 26.832076 32 24.758219 32 22.5 C 32 17.26514 27.73486 13 22.5 13 z M 22.5 15 C 26.65398 15 30 18.34602 30 22.5 C 30 26.65398 26.65398 30 22.5 30 C 18.34602 30 15 26.65398 15 22.5 C 15 18.34602 18.34602 15 22.5 15 z"></path>
                </svg>
              </Link>
            </button>
          )}
        </form>

        {submitted ? (
          <section>
            {loading && content ? (
              <p>loading...</p>
            ) : (
              <div>
                <button onClick={createSaved}>Save note!</button>
                <div className="ai-response">
                  <span className="ai-cards">
                    <div>Lodging: </div>
                    <div>{formatAIOutput(lodgingList)}</div>
                  </span>

                  <span className="ai-cards">
                    <div>Restaurants: </div>
                    <div>{formatAIOutput(restaurantList)}</div>
                  </span>

                  <span className="ai-cards">
                    <div>Malls:</div>
                    <div>{formatAIOutput(mallList)}</div>
                  </span>

                  <span className="ai-cards">
                    <div>Places to visit:</div>
                    <div>{formatAIOutput(placesList)}</div>
                  </span>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </div>
      {/* <div className="results-section">
        <MapsTool />
      </div> */}
    </>
  );
};

export default Generate;

// import { useState } from "react";
// import { main } from "./tools/AILogic";
// import AxiosInstance from "./tools/AxiosInstance";
// import CitySelector from "./tools/CitySelector";
// import DateSelector from "./tools/DateSelector";
// import GuestsNumber from "./tools/GuestsNumber";
// import BudgetNumber from "./tools/BudgetNumber";
// import MapsTool from "./tools/MapsTool";
// import Geocoder from "./tools/Geocoder";

// const Generate = () => {
//   //dynamic states of page
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [mapLoad, setMapLoad] = useState(false);
//   // const [showChosenCity, setShowChosenCity] = useState(false);
//   const [allPlaceNames, setAllPlaceNames] = useState([]);

//   //user inputs to give to AI
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [adultNum, setAdultNum] = useState(0);
//   const [childNum, setChildNum] = useState(0);
//   const [infantNum, setInfantNum] = useState(0);
//   const [petNum, setPetNum] = useState(0);
//   const [dollarNum, setDollarNum] = useState("");
//   const [budget, setBudget] = useState("");

//   //data stored
//   const [content, setContent] = useState("");
//   const [title, setTitle] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       selectedCity === "" ||
//       (petNum == 0 && childNum === 0 && adultNum === 0 && infantNum === 0) ||
//       (petNum != 0 && childNum === 0 && adultNum === 0 && infantNum === 0)
//     ) {
//       console.log("fill out human categories or missing chosen city");
//     } else {
//       setMapLoad(false);
//       setSubmitted(true);
//       setLoading(true);
//       fetchData(
//         selectedCity,
//         selectedMonth,
//         adultNum,
//         childNum,
//         infantNum,
//         petNum,
//         budget,
//         dollarNum
//       );
//     }
//   };

//   const createSaved = (e) => {
//     e.preventDefault();
//     AxiosInstance.post(`saved/`, { content, title }).then(() =>
//       alert("saved!")
//     );
//   };

//   const handleCityChange = (city) => {
//     console.log(city);
//     setSelectedCity(city);
//   };

//   const handleMonthChange = (month) => {
//     console.log(month.getMonth() + 1);
//     setSelectedMonth(month.getMonth() + 1);
//   };

//   const handleGuestNumber = (adults, children, infants, pets) => {
//     console.log(adults, children, infants, pets);
//     setAdultNum(adults);
//     setChildNum(children);
//     setInfantNum(infants);
//     setPetNum(pets);
//   };

//   const handleBudget = (budget) => {
//     if (budget === "0-20$") {
//       setDollarNum("$");
//     } else if (budget === "20-40$") {
//       setDollarNum("$$");
//     } else if (budget === "40$+") {
//       setDollarNum("$$$");
//     }
//     setBudget(budget);
//   };

//   const fetchData = async (
//     city,
//     month,
//     adults,
//     children,
//     infants,
//     pets,
//     budget,
//     dollar
//   ) => {
//     const JSONresponse = await main(
//       city,
//       month,
//       adults,
//       children,
//       infants,
//       pets,
//       budget,
//       dollar
//     );
//     setTitle(city);
//     console.log(JSONresponse);
//     setContent(JSON.parse(JSONresponse));
//     setLoading(false);
//     setMapLoad(true);
//   };

//   const restaurantList = content.restaurants;
//   const lodgingList = content.lodging;
//   const mallList = content.malls;
//   const placesList = content.places;

//   const formatCategories = () => {
//     const restaurantPlaceList = [];
//     restaurantList.map((thing) => {
//       restaurantPlaceList.push({ thing: thing[0], city: selectedCity });
//     });

//     const lodgingPlaceList = [];
//     lodgingList.map((thing) => {
//       lodgingPlaceList.push({ thing: thing[0], city: selectedCity });
//     });

//     const mallPlaceList = [];
//     mallList.map((thing) => {
//       mallPlaceList.push({ thing: thing[0], city: selectedCity });
//     });

//     const placesPlaceList = [];
//     placesList.map((thing) => {
//       placesPlaceList.push({ thing: thing[0], city: selectedCity });
//     });

//     const all = [
//       restaurantPlaceList,
//       lodgingPlaceList,
//       mallPlaceList,
//       placesPlaceList,
//     ];

//     return <>{createMapMarkers(all)}</>;
//   };

//   const createMapMarkers = (list) => {
//     return <Geocoder location={list} />; // set to specific thing
//   };

//   return (
//     <>
//       <div className="generate-section">
//         <form onSubmit={handleSubmit} className="AI-form">
//           <CitySelector onInputChange={handleCityChange} />
//           <div className="calendar">
//             <DateSelector datePicked={handleMonthChange} />
//           </div>
//           <div className="guest-picker">
//             <GuestsNumber guestsNumber={handleGuestNumber} />
//           </div>
//           <div className="budget-chooser">
//             <BudgetNumber chosenBudget={handleBudget} />
//           </div>

//           <button type="submit" className="submit-ai">
//             Submit
//           </button>
//         </form>

//         {submitted ? (
//           <section>
//             {loading ? (
//               <p>loading...</p>
//             ) : (
//               <div>
//                 <button onClick={createSaved}>Save note!</button>
//               </div>
//             )}
//           </section>
//         ) : null}
//       </div>
//       {mapLoad ? (
//         <div className="results-section">{formatCategories()}</div>
//       ) : null}
//     </>
//   );
// };

// export default Generate;
