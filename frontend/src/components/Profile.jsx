import AxiosInstance from "./tools/AxiosInstance";
import { useState, useEffect } from "react";

const Profile = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    showSaved();
  }, []);

  const showSaved = () => {
    // Fetch saved items for the current user
    AxiosInstance.get(`saved/`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data);
      })
      .then(() => {
        console.log(saved);
      })
      .catch((err) => alert(err));
  };

  const deleteSaved = (id) => {
    console.log("test");
    AxiosInstance.delete(`saved/${id}`).then(() => {
      const updatedSaved = saved.filter((item) => item.id !== id);
      setSaved(updatedSaved);
    });
    console.log(saved);
  };

  return (
    <div>
      <h2>Saved:</h2>
      {saved.length === 0 ? (
        <p>Looks like you need to generate some itineraries!</p>
      ) : (
        <div className="all-saved-container">
          {saved.map((saved) => (
            <div className="saved-container" key={saved.id}>
              <h1 className="saved-title">{saved.title}</h1>
              {/* <h2 className="saved-content">
          {Object.entries(saved.content).map(([category, items]) => (
            <div key={category} className="saved-items">
            <h1>{category}</h1>
            <p>{items}</p>
              </div>
            ))}
          </h2> */}
              <button
                onClick={() => {
                  deleteSaved(saved.id);
                }}
              >
                {" "}
                delete Saved
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
