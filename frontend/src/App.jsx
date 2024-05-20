import Generate from "./components/Generate";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import PickedSavedPage from "./components/PickedSavedPage";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
// import Geocoder from "./components/tools/Geocoder";

function App() {
  const location = useLocation();
  const noNavbar =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <>
      {noNavbar ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/view-saved" element={<PickedSavedPage />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/test" element={<Geocoder location={[""]} />} /> */}
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
