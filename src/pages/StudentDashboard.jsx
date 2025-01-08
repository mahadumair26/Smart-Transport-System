import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/StudentDashboard.css"; // Custom CSS for styling

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <div className="overlay">
        <div className="container text-center text-light">
          <h1 className="mb-4">Welcome to Your Dashboard</h1>
          <div className="button-group">
            <Link to="/profile" className="btn btn-primary btn-lg mb-3">
              View Profile
            </Link>
            <Link to="/update-timing" className="btn btn-warning btn-lg mb-3">
              Update Timing
            </Link>
            <Link to="/PaymentPage" className="btn btn-success btn-lg">
              View Fees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;