import AxiosInstance from "../Tools/AxiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
    Sepetember: "#577590",
    October: "#277da1",
    November: "#5e6472",
    December: "#184e77",
  };

  useEffect(() => {
    showSaved();
  }, []);

  const filteredSaved = saved.filter((s) =>
    s.itinName.toLowerCase().includes(search.toLowerCase())
  );

  const showSaved = () => {
    // Fetch saved items for the current user
    AxiosInstance.get(`saved/`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data);
        setLoading(false);
      })
      .then(() => {
        console.log(saved);
      })
      .catch((err) => alert(err));
  };

  // const deleteSaved = (id) => {
  //   console.log("test");
  //   AxiosInstance.delete(`saved/${id}`).then(() => {
  //     const updatedSaved = saved.filter((item) => item.id !== id);
  //     setSaved(updatedSaved);
  //   });
  //   console.log(saved);
  // };

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
    <section className="profile-parent">
      <div className="profile-upper-photo">
        <div className="profile-header">
          <h1>My Trips</h1>
        </div>
      </div>
      <div className="profile-content">
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search saved trips..."
            />
            <button onClick={() => navigate("/generate")}> + New Trip </button>
            {saved.length === 0 ? (
              <p>Looks like you need to generate some itineraries!</p>
            ) : (
              <div className="profile-all-saved-container">
                {filteredSaved.map((saved) => (
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
                    {/* <div className="profile-saved-buttons">
                  <button
                  onClick={() => {
                    deleteSaved(saved.id);
                    }}
                    className="profile-saved-btn"
                    >
                    {" "}
                    Delete
                    </button>
                    <button
                    onClick={() => viewSaved(saved.id)}
                    className="profile-saved-btn"
                    >
                    View
                    </button>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <button onClick={logoutUser} className="profile-logout-btn">
          Log out
        </button>
      </div>
    </section>
  );
};

export default Profile;
