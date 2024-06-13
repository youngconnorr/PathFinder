import { useState } from "react";
import { main } from "./tools/AILogic";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
  const [itineraryName, setItineraryName] = useState("");

  //data stored
  const [content, setContent] = useState({
    restaurants: [],
    lodging: [],
    malls: [],
    places: [],
  });
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [itinName, setItinName] = useState("");

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
    AxiosInstance.post(`saved/`, { content, title, month, itinName });
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

  const handleItineraryName = (event) => {
    setItineraryName(event.target.value);
    console.log(itineraryName);
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
    setMonth(month);
    setItinName(itineraryName);
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
      <div className={token ? "generate-section" : ""}>
        <div>
          <label>Itinerary Name: </label>
          <input type="text" onChange={handleItineraryName} />
        </div>
        <form onSubmit={handleSubmit} className="AI-form">
          <CitySelector onInputChange={handleCityChange} />
          <div className="calendar">
            <DateSelector datePicked={handleMonthChange} />
          </div>
          <div className="guest-picker form-item">
            <GuestsNumber guestsNumber={handleGuestNumber} />
          </div>
          <div className="budget-chooser">
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
              style={{ backgroundColor: "none", border: "none" }}
            >
              <Link to="/login">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
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
