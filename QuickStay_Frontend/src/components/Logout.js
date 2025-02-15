import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LogoutPage = () => {
  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="p-5 bg-light rounded shadow"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="fw-bold mb-4">You are logged out!</h1>
        <p className="lead mb-4">
          Thank you for using <strong>QUICK-STAY</strong>. We hope to see you again soon!
        </p>
        <div>
          <a href="/login" className="btn btn-primary btn-lg">
            Login Again
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
