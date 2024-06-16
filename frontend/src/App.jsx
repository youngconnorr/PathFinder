import ProtectedRoute from "./components/tools/ProtectedRoutes";
import { Routes, Route, useLocation, Link } from "react-router-dom";

import Generate from "./components/AI";
import Register from "./components/Auth/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import PickedSavedPage from "./components/Saved";
import About from "./components/About";

function App() {
  const location = useLocation();
  const noNavbar =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <>
      {noNavbar ? (
        <div>
          <div className="navbar-absolute">
            <button>
              <Link to="/">
                <b>PathFinder</b>
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-saved" element={<PickedSavedPage />} />
          <Route path="/generate" element={<Generate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
