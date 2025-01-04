import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setSearchResults, categories, setSelectedCategory }) => {
    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setCategory] = useState('');

    // Handle search by name
    const handleSearch = () => {
        let url = `http://localhost:9091/product/get/search/${searchName}`;
        if (selectedCategory) {
            url += `?category=${selectedCategory}`;
        }

        // Make the GET request to fetch products based on search criteria
        axios.get(url)
            .then(response => {
                setSearchResults(response.data);  // Store search results in parent state
                console.log('Search Results:', response.data);  // Optionally log the results
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    return (
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
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSelectedCategory(e.target.value);
                            }}
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
    );
};

export default SearchBar;
