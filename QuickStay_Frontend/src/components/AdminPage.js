import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state for adding room
  const [showHotelModal, setShowHotelModal] = useState(false); // Modal visibility state for adding hotel
  const [selectedHotelId, setSelectedHotelId] = useState(null); // To track the hotel the room is being added to
  const [newRoom, setNewRoom] = useState({
    roomType: "",
    price: "",
    available: false,
  });
  const [newHotel, setNewHotel] = useState({
    name: "",
    location: "",
    contactNumber: "",
    address: "",
  });

  // Fetch hotels data
  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        if (!token) {
          navigate("/login")
        }

        const response = await fetch("http://localhost:8080/api/hotels/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!response.ok) {
            navigate("/login")
          throw new Error("Failed to fetch hotels data");
          
        }

        const data = await response.json();
        setHotels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("userRole");
    navigate("/login"); // Redirect to login page
  };

  // Handle modal form data change (for adding room)
  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle modal form data change (for adding hotel)
  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle availability checkbox (for room)
  const handleAvailabilityChange = () => {
    setNewRoom((prevState) => ({
      ...prevState,
      available: !prevState.available,
    }));
  };

  // Open the modal to add room to the selected hotel
  const openRoomModal = (hotelId) => {
    setSelectedHotelId(hotelId);
    setShowModal(true);
  };

  // Open the modal to add a new hotel
  const openHotelModal = () => {
    setShowHotelModal(true);
  };

  // Close the room modal
  const closeRoomModal = () => {
    setShowModal(false);
    setNewRoom({
      roomType: "",
      price: "",
      available: false,
    });
  };

  // Close the hotel modal
  const closeHotelModal = () => {
    setShowHotelModal(false);
    setNewHotel({
      name: "",
      location: "",
      contactNumber: "",
      address: "",
    });
  };

  // Handle form submission for adding a new room
  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        navigate("/login")
      }

      // Send POST request to add room
      const response = await fetch(
        `http://localhost:8080/api/hotels/${selectedHotelId}/rooms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(newRoom),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add room");
      }

      // Get the newly added room and append it to the selected hotel's rooms
      const addedRoom = await response.json();
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === selectedHotelId
          ? {
              ...hotel,
              rooms: [...hotel.rooms, addedRoom], // Add the new room to the rooms array
            }
          : hotel
      );

      setHotels(updatedHotels); // Update state with the new room

      closeRoomModal(); // Close the modal after adding the room
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle form submission for adding a new hotel
  const handleAddHotel = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Send POST request to create a hotel
      const response = await fetch("http://localhost:8080/api/hotels/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(newHotel),
      });

      if (!response.ok) {
        throw new Error("Failed to create hotel");
      }

      // Get the newly created hotel and add it to the hotels list
      const createdHotel = await response.json();
      setHotels((prevHotels) => [...prevHotels, createdHotel]);

      closeHotelModal(); // Close the modal after adding the hotel
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle room deletion
  const handleDeleteRoom = async (hotelId, roomId) => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Send DELETE request to remove the room
      const response = await fetch(
        `http://localhost:8080/api/hotels/${hotelId}/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      // Remove the deleted room from the state
      const updatedHotels = hotels.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: hotel.rooms.filter((room) => room.id !== roomId),
            }
          : hotel
      );

      setHotels(updatedHotels); // Update state after deleting the room
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Send DELETE request to remove the room
      const response = await fetch(
        `http://localhost:8080/api/hotels/${hotelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      const updatedHotels = hotels.filter((hotel) => hotel.id !== hotelId);
        setHotels(updatedHotels);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading hotels data...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-grey shadow sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            QUICK-STAY ADMIN
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link text-black">
                  <b>Welcome, Admin</b>
                </span>
              </li>
              <li className="nav-item">
              <a className="nav-link btn btn-danger text-black " onClick={openHotelModal}>
                  Add Hotel
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-danger text-black " onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">

        {/* Display Hotels and Rooms */}
        <h4 className="mb-3 modal-title-black" style={{ fontSize: "1.4rem" , color:"#000"}}>
          All Hotels and Rooms:
        </h4>
        <div>
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="mb-3 p-3"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "8px",
                padding: "15px",
              }}
            >
              <table className="table table-sm table-bordered text-white mb-3" style={{ fontSize: "0.9rem" }}>
                <thead className="table-dark">
                  <tr>
                    <th colSpan="2">Hotel Details</th>
                    <th>
                      <button
                        onClick={() => openRoomModal(hotel.id)}
                        className="btn btn-success btn-sm"
                      >
                        Add Room
                      </button>
                      <button
                        onClick={() => handleDeleteHotel(hotel.id)}
                        className="btn btn-danger btn-sm">
                        Delete Hotel
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Hotel Name</th>
                    <td>{hotel.name}</td>
                  </tr>
                  <tr>
                    <th>Location</th>
                    <td>{hotel.location}</td>
                  </tr>
                  <tr>
                    <th>Contact Number</th>
                    <td>{hotel.contactNumber}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{hotel.address}</td>
                  </tr>
                </tbody>
              </table>

              {/* Rooms List */}
              {hotel.rooms && hotel.rooms.length > 0 ? (
                <table className="table table-sm table-bordered text-white">
                  <thead className="table-dark">
                    <tr>
                      <th>Room Type</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel.rooms.map((room) => (
                      <tr key={room.id}>
                        <td>{room.roomType}</td>
                        <td>{room.price}</td>
                        <td>{room.available ? "Available" : "Not Available"}</td>
                        <td>{room.available ?
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteRoom(hotel.id, room.id)}
                          >
                            Delete Room
                          </button>
                          : "" }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h6 className="modal-title-white">No rooms available for this hotel.</h6>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal to Add Hotel */}
      {showHotelModal && (
        <div
          className="modal d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title modal-title-black">Add New Hotel</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeHotelModal}
                ></button>
              </div>
              <form onSubmit={handleAddHotel}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label modal-title-black">Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newHotel.name}
                      onChange={handleHotelInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label modal-title-black">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={newHotel.location}
                      onChange={handleHotelInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label modal-title-black">Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contactNumber"
                      value={newHotel.contactNumber}
                      onChange={handleHotelInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label modal-title-black">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={newHotel.address}
                      onChange={handleHotelInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeHotelModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Hotel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding room */}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title modal-title-black">
                Add Room to Hotel
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeRoomModal}
                ></button>
              </div>
              <form onSubmit={handleAddRoom}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label modal-title-black">Room Type</label>
                    <input
                      type="text"
                      className="form-control"
                      name="roomType"
                      value={newRoom.roomType}
                      onChange={handleRoomInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label modal-title-black">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={newRoom.price}
                      onChange={handleRoomInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-check-label modal-title-black">
                      Available
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={newRoom.available}
                      onChange={handleAvailabilityChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeRoomModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
