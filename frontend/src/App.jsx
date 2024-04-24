// import { useState } from 'react'
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Landing from "./components/Landing";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";

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
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
