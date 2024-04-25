import AxiosInstance from "./tools/AxiosInstance";
import { useState, useEffect } from "react";

const Profile = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    showSaved();
  }, []);

  const showSaved = () => {
    AxiosInstance.get(`saved/`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getSaved();
  }, []);

  const getSaved = () => {
    AxiosInstance.get(`saved/`)
      .then((res) => res.data)
      .then((data) => {
        setSaved(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  // const deleteSaved = (id) => {
  //   AxiosInstance.delete(`saved/delete/${id}/`)
  //     .then((res) => {
  //       if (res.status === 204) {
  //         alert("Saved deleted!");
  //       } else {
  //         alert("Failed to delete");
  //       }
  //       getSaved();
  //     })
  //     .catch((error) => alert(error));
  // };

  return (
    <div>
      <h2>Saved:</h2>
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
            {/* <button onClick={deleteSaved(saved.id)}></button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
