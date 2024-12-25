import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const state = useSelector(state => state.handleCart);

    // Check user role from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const isSeller = user && user.role && user.role.some(role => role.name === "Seller");

    // Logout handler
    const logoutHandler = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false); // Ensure this function exists in props
    };
    console.log("isAuthenticated:", isAuthenticated);
    console.log("User data from localStorage:", localStorage.getItem("user"));

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">React Ecommerce</NavLink>
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
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
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
                                {/* Add product button visible only for sellers */}
                                {isSeller && (
                                    <>
                                        <NavLink to="/addproduct" className="btn btn-outline-dark m-2">
                                            <i className="fa fa-plus mr-1"></i> Add Product
                                        </NavLink>
                                        <NavLink to="/my-product" className="btn btn-outline-dark m-2">
                                            <i className="fa fa-cogs mr-1"></i> My Products
                                        </NavLink>
                                    </>
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
                        <NavLink to="/cart" className="btn btn-outline-dark m-2">
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
