import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch bookings on component mount
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    } else {
        navigate("/login");
    }

    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUsername(storedUserName);
    }

    const fetchBookings = async () => {
      try {
        // Get the auth token from localStorage or context
        const token = localStorage.getItem("auth-token");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await fetch(`http://localhost:8080/api/booking/user/${storedUserName}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data); // Store the bookings in state
      } catch (error) {
        setError(error.message); // Set error if the API call fails
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };

    fetchBookings();
  }, [username]); // Re-fetch bookings if username changes

  // Loading and Error States
  if (loading) {
    return <div>Loading your bookings...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark shadow sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-white" href="#">
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
                <a className="nav-link text-white" href="./HomePage">
                  Home
                </a>
              </li>
              <li className="nav-item">
              <a className="nav-link text-black" href="Profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="Services">
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

      {/* Main Content (Exclusive styling for bookings section) */}
      <div className="container mt-5 bookings-container">
        <h2 className="mb-3 text-center text-white">Profile: {name}</h2>

        {/* If no bookings found */}
        {bookings.length === 0 ? (
          <div className="alert alert-warning">
            <h5 className="mb-0">You have no bookings yet.</h5>
          </div>
        ) : (
          <div>
            <h5>Your Bookings:</h5>
            {/* Display compact booking cards */}
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="booking-card mb-3 p-3 border rounded shadow-sm"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#efffeb", 
                  border: "1px solid #efffeb", // Specific style for the booking card
                }}
              >
                <div className="d-flex justify-content-between">
                  <h6 className="m-0">Booking ID: {booking.bookingId}</h6>
                  <h6 >{booking.bookingStatus}</h6>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1"><strong>Room ID:</strong> {booking.roomId}</h6>
                  <h6 className="mb-1"><strong>Check-in:</strong> {booking.checkInDate}</h6>
                  <h6 className="mb-1"><strong>Check-out:</strong> {booking.checkOutDate}</h6>
                  <h6 className="mb-2"><strong>Price:</strong> ${booking.price}</h6>
                </div>

                {/* Collapsible Payment Details */}
                <div
                  className="payment-details mb-2"
                  style={{
                    fontSize: "0.9rem", 
                    padding: "10px", 
                    borderRadius: "5px",
                  }}
                >
                  <h6 className="mb-1">Payment Info</h6>
                  <h6 className="mb-1"><strong>Payment ID:</strong> {booking.paymentDto.paymentId}</h6>
                  <h6 className="mb-1"><strong>Payment Method:</strong> {booking.paymentDto.paymentMethod}</h6>
                  <h6><strong>Status:</strong> {booking.paymentDto.paymentStatus}</h6>
                  <h6><strong>Amount:</strong> ${booking.paymentDto.amount}</h6>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
