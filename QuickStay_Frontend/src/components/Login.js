import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import react-router-dom for redirection

const LoginPage = () => {
  // State to store form values
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook to redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        localStorage.setItem("username", data.username);
        localStorage.setItem("name", data.name);
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("userRole", data.userRole); 

        if (data.userRole === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/"); 
        }
      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <div className="text-center text-black mb-4">
        <h1 className="text-4xl font-bold">Welcome to QUICK-STAY</h1>
      </div>
      <div
        className="card p-4"
        style={{
          width: "350px",
          borderRadius: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.02)", // Semi-transparent background
          backdropFilter: "blur(10px)", // Glass effect
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 custom-button">
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          {/* <a href="#" className="text-decoration-none">
            Forgot Password?
          </a> */}
          <p className="mt-2">
            Don’t have an account?{" "}
            <a href="/SignUp" className="text-decoration-none">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
