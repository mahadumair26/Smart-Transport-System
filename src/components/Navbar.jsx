import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./style/Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("user"));
  const user = storedData ? storedData : null;

  const isAdmin = user?.role === "Admin";
  const isDriver = user?.role === "Driver";
  const isStudent = user?.role === "Student";
  const isManager = user?.role === "Manager";

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Smart Transport
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/routes"
                activeClassName="active"
              >
                Routes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/timings"
                activeClassName="active"
              >
                Timings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                activeClassName="active"
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="navbar-buttons">
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className="btn btn-primary">
                  Profile
                </NavLink>
                <button
                  onClick={logoutHandler}
                  className="btn btn-secondary"
                >
                  Logout
                </button>

                {isAdmin && (
                  <>
                    <NavLink to="/add-route" className="btn btn-primary">
                      Add Route
                    </NavLink>
                    <NavLink to="/manage-students" className="btn btn-primary">
                      Manage Students
                    </NavLink>
                  </>
                )}

                {isDriver && (
                  <NavLink to="/my-routes" className="btn btn-primary">
                    My Routes
                  </NavLink>
                )}

                {isStudent && (
                  <NavLink to="/my-timings" className="btn btn-primary">
                    My Timings
                  </NavLink>
                )}

                {isManager && (
                  <NavLink to="/manage-team" className="btn btn-primary">
                    Manage Team
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-secondary">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-primary">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
