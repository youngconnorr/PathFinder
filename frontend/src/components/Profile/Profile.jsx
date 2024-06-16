import AxiosInstance from "../tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const logoutUser = () => {
    AxiosInstance.post(`logoutall/`, {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
    });
  };

  //format of profile page with multiple saved items
  return (
    <div>
      <h2>Your Itineraries:</h2>
      {saved.length === 0 ? (
        <p>Looks like you need to generate some itineraries!</p>
      ) : (
        <div className="all-saved-container">
          {saved.map((saved) => (
            <div key={saved.id}>
              <p className="saved-name">{saved.itinName}</p>
              <div className="saved-container">
                <div>
                  <h2 className="saved-title">{saved.title}</h2>
                  <h3>{saved.month}</h3>
                </div>
                <div className="saved-buttons">
                  <button
                    onClick={() => {
                      deleteSaved(saved.id);
                    }}
                    className="saved-btn"
                  >
                    {" "}
                    Delete saved
                  </button>
                  <button
                    onClick={() => viewSaved(saved.id)}
                    className="saved-btn"
                  >
                    View saved
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={logoutUser}>Log out</button>
    </div>
  );
};

export default Profile;
