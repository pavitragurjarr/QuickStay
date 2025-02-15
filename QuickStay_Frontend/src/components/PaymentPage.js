import React, { startTransition, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Access the state passed from previous page

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }

    const state = location.state;
    if (state && state.bookingDetails) {
      setBookingDetails(state.bookingDetails);  // Set the booking details from state
    } else {
      setError("Booking details are missing.");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleConfirmPayment = async () => {
    try {
      const paymentUrl = `http://localhost:8080/api/payments/${bookingDetails.paymentDto.paymentId}/status/SUCCESS`;
  
      const response = await axios.put(paymentUrl, null, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
  
      if (response.status === 200 ) {
        setPaymentStatus("Payment successful!");
        bookingDetails.paymentDto.paymentStatus = "SUCCESS";
        console.log("success -> ", bookingDetails);
        navigate("/booking-confirmed", {
            state: {
              bookingDetails,  
              message: `Hello ${name}, your booking is now complete.`
            },
          });
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Error completing payment:", err);
      setPaymentStatus("Error processing payment. Please try again.");
    }
  };

  if (!bookingDetails) {
    return <div>Loading...</div>;  // Show loading until data is available
  }

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
        <h2 className="mb-4">Booking Summary</h2>

        {/* Display Booking Details */}
        <table className="table table-bordered table-hover mb-4">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room ID</th>
              <th>Username</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bookingDetails.bookingId}</td>
              <td>{bookingDetails.roomId}</td>
              <td>{bookingDetails.username}</td>
              <td>{bookingDetails.checkInDate}</td>
              <td>{bookingDetails.checkOutDate}</td>
              <td>${bookingDetails.price}</td>
            </tr>
          </tbody>
        </table>

        {/* Display Payment Details */}
        <h3>Payment Details</h3>
        <table className="table table-bordered table-hover mb-4">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bookingDetails.paymentDto.paymentId}</td>
              <td>${bookingDetails.paymentDto.amount}</td>
              <td>{bookingDetails.paymentDto.paymentMethod}</td>
              <td>{bookingDetails.paymentDto.paymentStatus}</td>
            </tr>
          </tbody>
        </table>

        {/* Display Payment Status */}
        {paymentStatus && <div className="alert alert-info">{paymentStatus}</div>}

        {/* Confirm Payment Button */}
        <button onClick={handleConfirmPayment} className="btn btn-success">
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
