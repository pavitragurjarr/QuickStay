import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const HotelListPage = () => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();  // Use useLocation hook to access location state

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    } else {
        navigate("/login");
    }

    // Access rooms from the location state
    const state = location.state;
    console.log("State in HotelListPage:", state); // To check if state is correctly passed

    if (state && state.rooms) {
      setRooms(state.rooms);
      setCheckInDate(state.checkInDate); 
      setCheckOutDate(state.checkOutDate);
    } else {
      // Handle the case where rooms aren't passed
      setError("No rooms available for the selected dates.");
    }
  }, [location]); // Watch for changes to location to re-run this useEffect

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleBookRoom = async (roomId) => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please log in to book a room");
      return;
    }

    const bookingDetails = {
      roomId,
      username,
      checkInDate,
      checkOutDate
    };

    console.log("###"+ location.state.checkInDate)
    try {
      // Make API call to book the room
      const response = await axios.post("http://localhost:8080/api/booking/create", bookingDetails, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      console.log("Booking successful:", response.data);
      
      // Redirect to the payment page (use the room details or booking ID)
      navigate("/payment", {
        state: {
          roomId,
          checkInDate,
          checkOutDate,
          bookingDetails: response.data
        },
      });
    } catch (error) {
      console.error("Error booking room:", error);
      setError("Booking failed. Please try again.");
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
      <div className="container mt-5">
        <h2 className="mb-4">Available Rooms</h2>

        {/* Display Error if rooms are not available */}
        {error && <div className="alert alert-danger">{error}</div>}

        {rooms.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Hotel Name</th>
                <th scope="col">Room Type</th>
                <th scope="col">Price</th>
                <th scope="col">Book</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td><b>{room.hotel.name}</b> <br/>{room.hotel.location}, {room.hotel.contactNumber}</td>
                  <td>{room.roomType}</td>
                  <td>${room.price}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBookRoom(room.id)}
                    >
                      Book Room
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4>No rooms available for the selected dates.</h4>
        )}
      </div>
    </div>
  );
};

export default HotelListPage;
