import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [name, setName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/booking/available-rooms-by-dates`, {
        params: {
          checkInDate,
          checkOutDate,
        },
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      setRooms(response.data);
      setError("");

      // Navigate to HotelListPage with rooms data, checkInDate, and checkOutDate passed via state
      navigate("/hotel-list", {
        state: {
          rooms: response.data,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        },
      });
    } catch (err) {
      setError("Error fetching rooms. Please try again.");
    }
  };

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-grey shadow sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            QUICK-STAY
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-black" href="HomePage">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-black" href="Profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-black" href="Services">
                  Services
                </a>
              </li>
              {name ? (
                <li className="nav-item">
                  <span className="nav-link text-black">
                    <b>Welcome, {name}</b>
                    <button onClick={handleLogout} className="btn btn-sm btn-danger ml-2">
                      Logout
                    </button>
                  </span>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link btn btn-primary text-black" href="Login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center text-black d-flex flex-column justify-content-center align-items-center h-100">
        <h1 className="display-4 fw-bold">
          Welcome to QUICK-STAY Hotel Booking!
        </h1>
        {name && (
          <p className="text-black font-bold mt-3">
            <h4>Hello, {name}!</h4>
            <h4>Explore luxury Hotels and rooms, manage your bookings, and enjoy premium services.</h4>
          </p>
        )}

        {/* Search Form */}
        <form onSubmit={handleSearch} className="my-4">
          <div className="mb-3">
            <label htmlFor="checkInDate" className="form-label">
              Check-In Date
            </label>
            <input
              type="date"
              className="form-control"
              id="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkOutDate" className="form-label">
              Check-Out Date
            </label>
            <input
              type="date"
              className="form-control"
              id="checkOutDate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {/* Display Error */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default HomePage;
