import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Retrieve user from localStorage
  const storedData = JSON.parse(localStorage.getItem("user"));
  const user = storedData ? storedData : null;

  // Determine user roles
  const isAdmin = user?.role === "Admin";
  const isDriver = user?.role === "Driver";
  const isStudent = user?.role === "Student";
  const isManager = user?.role === "Manager"; // Add Manager role if needed

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            Smart Transport
          </NavLink>
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto my-2 text-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/routes">
                  Routes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/timings">
                  Timings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="buttons text-center">
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="btn btn-outline-dark m-2">
                    <i className="fa fa-user mr-1"></i> Profile
                  </NavLink>
                  <button
                    onClick={logoutHandler}
                    className="btn btn-outline-dark m-2"
                  >
                    <i className="fa fa-sign-out-alt mr-1"></i> Logout
                  </button>

                  {isAdmin && (
                    <>
                      <NavLink to="/add-route" className="btn btn-outline-dark m-2">
                        <i className="fa fa-plus mr-1"></i> Add Route
                      </NavLink>
                      <NavLink
                        to="/manage-students"
                        className="btn btn-outline-dark m-2"
                      >
                        <i className="fa fa-cogs mr-1"></i> Manage Students
                      </NavLink>
                    </>
                  )}

                  {isDriver && (
                    <NavLink to="/my-routes" className="btn btn-outline-dark m-2">
                      <i className="fa fa-road mr-1"></i> My Routes
                    </NavLink>
                  )}

                  {isStudent && (
                    <NavLink to="/my-timings" className="btn btn-outline-dark m-2">
                      <i className="fa fa-clock mr-1"></i> My Timings
                    </NavLink>
                  )}

                  {isManager && (
                    <NavLink to="/manage-team" className="btn btn-outline-dark m-2">
                      <i className="fa fa-users mr-1"></i> Manage Team
                    </NavLink>
                  )}
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline-dark m-2">
                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-outline-dark m-2">
                    <i className="fa fa-user-plus mr-1"></i> Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
