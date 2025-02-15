import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SignUpPage = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    userRole: "",
  });

  // State for handling success/error messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // State for storing validation errors
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    userRole: "",
  });

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newValidationErrors = {};
    let isValid = true;

    if (!formData.name) {
      newValidationErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.username) {
      newValidationErrors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.mobile) {
      newValidationErrors.mobile = "Mobile number is required.";
      isValid = false;
    }

    if (formData.mobile.length != 10) {
      newValidationErrors.mobile = "Mobile number is not valid.";
      isValid = false;
    }


    if (!formData.password) {
      newValidationErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 8) {
      newValidationErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newValidationErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!formData.userRole) {
      newValidationErrors.userRole = "User role is required.";
      isValid = false;
    }

    if (!isValid) {
      setValidationErrors(newValidationErrors);
      return; // If validation fails, don't submit the form
    }

    // Clear previous error messages
    setError(null);
    setSuccess(null);

    try {
      // Send POST request to backend API
      const response = await axios.post("http://localhost:8080/api/user/register", formData);
      setSuccess("User successfully created!");
      setError(null); // Clear any existing errors
      setFormData({
        name: "",
        username: "",
        dob:"",
        mobile: "",
        password: "",
        confirmPassword: "",
        userRole: "",
      });
    } catch (error) {
      setError("Error creating user. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="card p-4 text-center"
        style={{
          width: "450px",
          maxWidth: "90%",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          overflowY: "auto",
          maxHeight: "90vh",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 className="text-4xl font-bold mb-4 modal-title-black" style={{ fontWeight: "bold" }}>
          Sign Up
        </h1>

        {/* Display error or success messages */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${validationErrors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
            {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${validationErrors.username ? "is-invalid" : ""}`}
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            {validationErrors.username && <div className="invalid-feedback">{validationErrors.username}</div>}
          </div>

          <div className="mb-3">
         <input
         type="date"
         className={`form-control ${validationErrors.dob ? "is-invalid" : ""}`}
         id="dob"
          name="dob"
         value={formData.dob}
         onChange={handleChange}
       />
  {validationErrors.dob && <div className="invalid-feedback">{validationErrors.dob}</div>}
</div>


          <div className="mb-3">
            <input
              type="tel"
              className={`form-control ${validationErrors.mobile ? "is-invalid" : ""}`}
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {validationErrors.mobile && <div className="invalid-feedback">{validationErrors.mobile}</div>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${validationErrors.address ? "is-invalid" : ""}`}
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
            {validationErrors.address && <div className="invalid-feedback">{validationErrors.address}</div>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${validationErrors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {validationErrors.password && <div className="invalid-feedback">{validationErrors.password}</div>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${validationErrors.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {validationErrors.confirmPassword && <div className="invalid-feedback">{validationErrors.confirmPassword}</div>}
          </div>

          <div className="mb-3">
            <select
              className={`form-select ${validationErrors.userRole ? "is-invalid" : ""}`}
              id="userRole"
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
            >
              <option value="">Select userRole</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            {validationErrors.userRole && <div className="invalid-feedback">{validationErrors.userRole}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <div className="mt-3">
          <p>
            Already have an account?{" "}
            <a href="/Login" className="text-decoration-none">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;