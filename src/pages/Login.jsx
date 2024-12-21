import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar } from "../components";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate(); // for navigation after login
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to login
      const response = await axios.post("http://localhost:9091/login/", formData);
      if (response.data) {
        console.log(response.data);
        
        // After successful login, make a GET request to fetch user details by email
        const userResponse = await axios.get(`http://localhost:9091/user/get/${formData.email}`);
        
        if (userResponse.data) {
          // Store the entire user object in localStorage
          localStorage.setItem("user", JSON.stringify(userResponse.data)); // Store the user data in localStorage
          
          alert("Login Successful!");

          // Update authentication state
          setIsAuthenticated(true);

          // Redirect to the profile page (or any other page you want)
          navigate("/");
        } else {
          alert("User data not found.");
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
      <Navbar />
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
