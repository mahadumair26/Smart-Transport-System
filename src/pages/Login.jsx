import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar } from "../components";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/authenticate/", formData);
      if (response.status === 200 && response.data) {
        const { role, data } = response.data;

        if (!role || !data) {
          alert("Invalid response structure. Missing role or data.");
          return;
        }

        let userData = data;
        if (role === "Driver" && data.user) {
          userData = data.user;
        }

        localStorage.setItem("userId", JSON.stringify(userData.id));
        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);

        if (role === "Student") {
          navigate("/StudentDashboard");
        } else if (role === "Driver") {
          navigate("/DriverDashboard");
        } else if (role === "Manager") {
          navigate("/ManagerDashboard");
        } else {
          alert("Unknown role, unable to redirect.");
        }
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="container my-5 py-5 d-flex justify-content-center align-items-center">
        <div
          className="login-card shadow-lg p-4 rounded"
          style={{
            maxWidth: "450px",
            width: "100%",
            background: "linear-gradient(135deg, #007bff, #6610f2)",
            color: "#fff",
          }}
        >
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <p className="text-center mb-4">Smart Transport Management System</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleInputChange}
                value={formData.email}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={handleInputChange}
                value={formData.password}
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="mb-4">
              <p className="small">
                New Here?{" "}
                <Link to="/register" className="text-decoration-underline text-light">
                  Register
                </Link>
              </p>
              <p className="small">
                Forgot Password?{" "}
                <Link to="/forgetpassword" className="text-decoration-underline text-light">
                  Reset Password
                </Link>
              </p>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-light btn-lg"
                type="submit"
                style={{
                  backgroundColor: "#fff",
                  color: "#007bff",
                  borderRadius: "30px",
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
