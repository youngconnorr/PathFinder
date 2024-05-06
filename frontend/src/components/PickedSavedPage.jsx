import AxiosInstance from "./tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PickedSavedPage = () => {
  const [saved, setSaved] = useState(null);
  const location = useLocation();

  useEffect(() => {
    showSaved();
  }, [location.state.id]);

  const showSaved = () => {
    const savedID = location.state.id;
    console.log("this is id" + savedID);
    // setSavedID(location.state.id);
    // Fetch saved items for the current user
    AxiosInstance.get(`saved/${savedID}`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data);
      })
      .then(() => {
        console.log(saved);
      });
  };

  return (
    <div>
      {saved === null ? (
        <div>Loading...</div>
      ) : (
        <div className="saved-container" key={saved.id}>
          <h1 className="saved-title">{saved.title}</h1>
          <h2 className="saved-content">
            {Object.entries(saved.content).map(([category, items]) => (
              <div key={category} className="saved-items">
                <h1>{category}</h1>
                <p>{items}</p>
              </div>
            ))}
          </h2>
        </div>
      )}
    </div>
  );
};

export default PickedSavedPage;
