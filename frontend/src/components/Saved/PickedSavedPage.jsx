import AxiosInstance from "../Tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PickedSavedPage = () => {
  const [saved, setSaved] = useState(null);
  const [showItems, setShowItems] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    showSaved();
  }, [location.state.id]);

  const showSaved = () => {
    const savedID = location.state.id;

    AxiosInstance.get(`saved/${savedID}`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data);
      })
      .catch((error) => {
        console.error("Error fetching saved data", error);
      });
  };

  const deleteSaved = (id) => {
    console.log("test");
    AxiosInstance.delete(`saved/${id}`).then(() => {
      navigate("/profile");
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
          <h1>{saved.title}</h1>
          <div className="category-container" key={saved.id}>
            <div>
              {Object.entries(saved.content).map(([category, items]) => (
                <div key={category}>
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
            <div className="profile-saved-buttons">
              <button
                onClick={() => {
                  deleteSaved(saved.id);
                }}
                className="profile-saved-btn"
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PickedSavedPage;
