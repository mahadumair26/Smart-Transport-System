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
        const { role, id, data } = response.data; // Get role and the driver data
        console.log(data); // Logs the driver details
  
        // Save the driver's ID (1) to localStorage
        localStorage.setItem("userId", JSON.stringify(data.id)); // Save driver's ID to localStorage
        localStorage.setItem("user", JSON.stringify(data)); // Save full user data (optional)
  
        setIsAuthenticated(true); // Update authentication state
  
        // Redirect user based on their role
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
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={formData.password}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>
                  <p>
                    Forgot password?{" "}
                    <Link to="/forgetpassword" className="text-decoration-underline text-info">
                      Forget Password
                    </Link>
                  </p>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
