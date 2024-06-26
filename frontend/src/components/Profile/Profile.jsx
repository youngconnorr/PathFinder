import AxiosInstance from "../Tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

const Profile = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false); // New state for toggling visibility
  const navigate = useNavigate();
  const bgColors = {
    January: "#f94144",
    February: "#f3722c",
    March: "#f8961e",
    April: "#f9844a",
    May: "#f9c74f",
    June: "#90be6d",
    July: "#43aa8b",
    August: "#4d908e",
    September: "#577590",
    October: "#277da1",
    November: "#5e6472",
    December: "#184e77",
  };

  useEffect(() => {
    showSaved();
  }, []);

  const filteredSaved = saved.filter(
    (s) =>
      s.itinName.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.month.toLowerCase().includes(search.toLowerCase())
  );

  const showSaved = () => {
    // Fetch saved items for the current user
    AxiosInstance.get(`saved/`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data);
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  const deleteSaved = (id) => {
    swal("Deleted Itinerary", "", "success");
    AxiosInstance.delete(`saved/${id}`).then(() => {
      navigate("/profile");
    });
  };

  const viewSaved = (id) => {
    navigate("/view-saved", { state: { id: id } });
  };

  const logoutUser = () => {
    AxiosInstance.post(`logoutall/`, {}).then(() => {
      localStorage.removeItem("Token");
      navigate("/");
    });
  };

  return (
    <section className="profile-parent">
      <div className="profile-upper-photo">
        <div className="profile-header">
          <h1>My Trips</h1>
        </div>
        <div
          className={`profile-content ${
            showAll ? null : "profile-transluscent"
          }`}
        >
          {loading ? (
            <p>loading...</p>
          ) : (
            <>
              <div className="profile-interact-bar">
                <input
                  type="text"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search Trips... "
                  className="profile-searcher"
                />
                <button
                  onClick={() => navigate("/generate")}
                  className="profile-create-btn"
                >
                  + New Trip
                </button>
                <button
                  onClick={() => setShowAll(!showAll)} // Toggle showAll state
                  className="profile-toggle-btn"
                >
                  {showAll ? "Hide Trips" : "Show All Trips"}
                </button>
              </div>
              {saved.length === 0 ? (
                <p>Looks like you need to generate some itineraries!</p>
              ) : (
                <div
                  className={`profile-all-saved-container ${
                    showAll ? "show" : "hide"
                  }`}
                >
                  {filteredSaved.reverse().map((saved) => (
                    <div
                      key={saved.id}
                      className="each-profile-saved-container"
                      onClick={() => viewSaved(saved.id)}
                    >
                      <div
                        className="profile-saved-bg-color"
                        style={{ backgroundColor: `${bgColors[saved.month]}` }}
                      >
                        <h2 className="profile-saved-name">{saved.itinName}</h2>
                      </div>
                      <div className="profile-saved-text">
                        <h2 className="profile-saved-title">
                          {saved.title}
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            size="md"
                            style={{ marginLeft: "10px" }}
                          />
                        </h2>
                        <h3>{saved.month}</h3>
                      </div>
                      <div className="delete-btn-placement">
                        <button
                          onClick={() => {
                            deleteSaved(saved.id);
                          }}
                          className="delete-btn"
                        >
                          {" "}
                          remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          <button onClick={() => logoutUser()} className="profile-logout-btn">
            Log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
