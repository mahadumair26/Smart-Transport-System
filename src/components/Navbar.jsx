import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);

    // Fetch categories (if needed for Timings or Routes)
    // useEffect(() => {
    //     // axios.get('http://localhost:9091/category/get')
    //         .then(response => {
    //             setCategories(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching categories:', error);
    //         });
    // }, []);

    // User role (e.g., Student, Driver, Admin)
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role && user.role.some(role => role.name === "Admin");
    const isDriver = user && user.role && user.role.some(role => role.name === "Driver");
    const isStudent = user && user.role && user.role.some(role => role.name === "Student");

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
                    <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Smart Transport</NavLink>
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
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/routes">Routes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/timings">Timings</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
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
                                            <NavLink to="/manage-students" className="btn btn-outline-dark m-2">
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
