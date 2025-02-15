import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ServicesPage = () => {
  const services = [
    {
      title: "Room Booking",
      description: "Explore a wide variety of rooms from luxury suites to budget-friendly stays across multiple hotels.",
      icon: "🏨",
    },
    {
      title: "Multi-Hotel Options",
      description: "Compare rooms, services, and prices from multiple hotels in one convenient platform.",
      icon: "🌍",
    },
    {
      title: "24/7 Customer Support",
      description: "Our team is available around the clock to assist you with bookings and inquiries.",
      icon: "📞",
    },
    {
      title: "Exclusive Discounts",
      description: "Get access to special deals and discounts on hotel rooms and services.",
      icon: "💸",
    },
    {
      title: "Flexible Cancellations",
      description: "Enjoy hassle-free cancellations and modifications to your bookings.",
      icon: "✅",
    },
  ];

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-grey shadow ">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
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
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
              <a className="nav-link text-black" href="Profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="Services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center text-black d-flex flex-column justify-content-center align-items-center h-100">
        <h2 className="display-4 fw-bold text-black mb-4">
          Our Services
        </h2>
        <p className="text-bold text-black">
          Enjoy the best hotel booking services designed to make your stay comfortable and hassle-free.
        </p>

        <div className="row mt-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 mb-4"
              style={{ padding: "10px" }}
            >
              <div
                className="card shadow text-center"
                style={{
                  backgroundColor: "rgba(200, 183, 163, 0.85)",
                 // backgroundColor: "rgba(255, 255, 255, 0.02)", 
                  borderRadius: "12px",
                }}
              >
                <div className="card-body">
                  <h2 className="card-title">{service.icon}</h2>
                  <h5 className="card-title fw-bold">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
