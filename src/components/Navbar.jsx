import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const state = useSelector(state => state.handleCart);

    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);  // State to hold category products

    // Fetch categories from the API
    useEffect(() => {
        axios.get('http://localhost:9091/category/get')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Fetch products based on selected category
    useEffect(() => {
        if (selectedCategory) {
            axios.get(`http://localhost:9091/product/get/category/${selectedCategory}`)
                .then(response => {
                    setCategoryProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products by category:', error);
                });
        }
    }, [selectedCategory]);

    // Check user role from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const isSeller = user && user.role && user.role.some(role => role.name === "Seller");

    // Logout handler
    const logoutHandler = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        navigate("/");
    };

    // Handle search by name
    const handleSearch = () => {
        let url = `http://localhost:9091/product/get/search/${searchName}`;
        if (selectedCategory) {
            url += `?category=${selectedCategory}`;
        }

        // Make the GET request to fetch products based on search criteria
        axios.get(url)
            .then(response => {
                setSearchResults(response.data);  // Store search results in state
                console.log('Search Results:', response.data);  // Optionally log the results
                navigate(`/search?name=${searchName}&category=${selectedCategory}`);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    return (
        <div>
            {/* Original Navbar */}
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

            {/* Search Header */}
            <div className="search-header bg-light py-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-control"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 d-flex justify-content-md-end">
                            <button
                                className="btn btn-outline-dark"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Products by Category */}
            {categoryProducts.length > 0 && (
                <div className="category-products">
                    <h3>Products in {selectedCategory} category</h3>
                    <ul>
                        {categoryProducts.map((product) => (
                            <li key={product.id}>
                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Optionally display search results */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    <h3>Search Results</h3>
                    <ul>
                        {searchResults.map((product) => (
                            <li key={product.id}>
                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
