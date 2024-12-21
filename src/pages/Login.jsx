import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar } from "../components";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate(); // for navigation after login
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9091/login/", formData);
      if (response.data) {
        console.log(response.data);
        
        // const user = response.data; // Assuming the response contains user data
        alert("Login Successful!");

        // Save user data to localStorage (or you could use a state management system)
        localStorage.setItem("email", formData.email);
        // localStorage.setItem("user", JSON.stringify(user));
        // console.log("user data here",user);
        

        // Update authentication state
        setIsAuthenticated(true);

        // Redirect to the profile page
        navigate("/");
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
