import AxiosInstance from "../tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PickedSavedPage = () => {
  const [saved, setSaved] = useState(null);
  const [showItems, setShowItems] = useState({});
  const location = useLocation();

  useEffect(() => {
    showSaved();
  }, [location.state.id]);

  const showSaved = () => {
    const savedID = location.state.id;
    console.log("this is id: " + savedID);

    AxiosInstance.get(`saved/${savedID}`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching saved data", error);
      });
  };

  const toggleShowItems = (category) => {
    setShowItems((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div>
      {saved === null ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="category-title">{saved.title}</h1>
          <div className="category-container" key={saved.id}>
            <div className="category-content">
              {Object.entries(saved.content).map(([category, items]) => (
                <div key={category} className="saved-category">
                  <h1>{category}</h1>
                  <div className="category-dropdown">
                    <button onClick={() => toggleShowItems(category)}>
                      {showItems[category] ? "Hide Places" : "Show Places"}
                    </button>
                    <div
                      className={`category-items ${
                        showItems[category] ? "show-category" : ""
                      }`}
                    >
                      {items.map((item, index) => (
                        <div key={index}>
                          <h3>{item[0]}</h3>
                          <p>{item[1]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PickedSavedPage;
