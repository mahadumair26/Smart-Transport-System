import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    weight: '',
    dimension: '',
    quantity: '',
    status: 'active',
    user_id: 1,
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null); // State to handle image file

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:9091/category/get");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure category_id is an integer
    const dataToSend = {
      ...productData,
      category_id: parseInt(productData.category, 10), // Convert category to integer
    };
  
    try {
      console.log("Sending data to backend:", dataToSend);
  
      // Send the data as a JSON object
      const response = await axios.post("http://localhost:9091/product/add", dataToSend, {
        headers: {
          "Content-Type": "application/json", // Ensure the header is set for JSON
        },
      });
  
      alert("Product Added Successfully");
      console.log(response.data);
  
      // Reset the form after successful submission
      setProductData({
        name: '',
        price: '',
        description: '',
        weight: '',
        dimension: '',
        quantity: '',
        status: 'available',
        user_id: 1,
        category: '',
      });
    } catch (error) {
      alert("Error adding product");
      console.error(error);
    }
  };
  
  
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add Product</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">Weight</label>
              <input
                type="text"
                className="form-control"
                id="weight"
                name="weight"
                value={productData.weight}
                onChange={handleInputChange}
                placeholder="Enter product weight"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dimension" className="form-label">Dimension</label>
              <input
                type="text"
                className="form-control"
                id="dimension"
                name="dimension"
                value={productData.dimension}
                onChange={handleInputChange}
                placeholder="Enter product dimensions"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                placeholder="Enter product quantity"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={productData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
