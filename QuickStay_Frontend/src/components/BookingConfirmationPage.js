import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";  // Import jsPDF

const BookingConfirmationPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
    const state = location.state;
    if (state && state.bookingDetails) {
      setMessage(state.message);  // Set the greeting and success message
      setBookingDetails(state.bookingDetails);  // Set the booking details
    } else {
      // Handle case where bookingDetails is not available in state
      console.error("Booking details not found.");
    }
  }, [location]);

  // If booking details are not yet loaded, show a loading message
  if (!bookingDetails) {
    return <div>Loading booking details...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login");
  };

  const handleProfileRedirect = () => {
    navigate('/profile');
  };

  // Function to generate and download the invoice as a PDF
  const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Booking Invoice", 14, 20);
    
    // Add user and booking details
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 14, 40);
    doc.text(`Booking ID: ${bookingDetails.bookingId}`, 14, 50);
    doc.text(`Room ID: ${bookingDetails.roomId}`, 14, 60);
    doc.text(`Check-in Date: ${bookingDetails.checkInDate}`, 14, 70);
    doc.text(`Check-out Date: ${bookingDetails.checkOutDate}`, 14, 80);
    doc.text(`Price: $${bookingDetails.paymentDto.amount}`, 14, 90);

    // Save the PDF file
    doc.save("invoice.pdf");
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
        <h2 className="mb-4">Booking Confirmation</h2>

        {/* Display Confirmation Message */}
        <div className="alert alert-success">
          <h3>{message}</h3>
        </div>

        {/* Display Booking Details */}
        <h4>Booking Details:</h4>
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
              <td>${bookingDetails.paymentDto.amount}</td>
            </tr>
          </tbody>
        </table>

        {/* Button to go to User Profile */}
        <button
          onClick={handleProfileRedirect}
          className="btn btn-primary mt-4"
        >
          Go to Profile to See All Bookings
        </button>

        {/* Button to download the invoice */}
        <button
          onClick={generateInvoice}
          className="btn btn-warning mt-4"
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
