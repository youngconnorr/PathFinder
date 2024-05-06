import AxiosInstance from "./tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import PickedSavedPage from "./PickedSavedPage";

const Profile = () => {
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();
  // const location = useLocation();

  // const isViewSaved = location.pathname === "/view-saved";

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

  const viewSaved = (id) => {
    console.log(id);
    navigate("/view-saved", { state: { id: id } });
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
              <button
                onClick={() => {
                  deleteSaved(saved.id);
                }}
              >
                {" "}
                delete Saved
              </button>
              <button onClick={() => viewSaved(saved.id)}>View saved</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
